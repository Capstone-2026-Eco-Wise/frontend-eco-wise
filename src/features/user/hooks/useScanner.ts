import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createScanHistory, type ScanResultResponse } from "@/services/scanHistoryService";
import { userTaskCompletionsService } from "@/services/userTaskCompletionsService";


export const useScanner = () => {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setScanResult(null);
      setError(null);
      stopCamera();
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsScanning(true);
      setError(null);
      
      let result: ScanResultResponse;
      if (taskId) {
        result = (await userTaskCompletionsService.completeTask(taskId, selectedFile)) as ScanResultResponse;
      } else {
        result = await createScanHistory(selectedFile);
      }
      
      setScanResult(result);
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.message ||
        "Gagal memproses gambar. Pastikan file berupa gambar."
      );
    } finally {
      setIsScanning(false);
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      setScanResult(null);
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Kamera belakang HP
        audio: false,
      });

      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (err) {
      console.error(err);
      setError("Kamera tidak dapat diakses. Pastikan izin kamera telah diberikan.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && stream) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            stopCamera();
          }
        }, "image/jpeg", 0.95);
      }
    }
  };

  // Hubungkan media stream ke elemen video saat kamera aktif
  useEffect(() => {
    if (isCameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  // Bersihkan stream dan URL objek saat unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [previewUrl, stream]);

  const resetScanner = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setScanResult(null);
    setError(null);
    stopCamera();
  };

  return {
    selectedFile,
    previewUrl,
    isScanning,
    scanResult,
    error,
    fileInputRef,
    videoRef,
    isCameraActive,
    handleFileChange,
    handleUpload,
    resetScanner,
    startCamera,
    stopCamera,
    capturePhoto,
  };
};
