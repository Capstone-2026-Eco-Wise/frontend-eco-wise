import { useState, useRef } from "react";
import { createScanHistory, type ScanHistory } from "@/services/scanHistoryService";

export const useScanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanHistory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setScanResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsScanning(true);
      setError(null);
      const result = await createScanHistory(selectedFile);
      setScanResult(result);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Gagal memproses gambar. Pastikan file berupa gambar."
      );
    } finally {
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setScanResult(null);
    setError(null);
  };

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  return {
    selectedFile,
    previewUrl,
    isScanning,
    scanResult,
    error,
    fileInputRef,
    handleFileChange,
    handleUpload,
    resetScanner,
    openCamera
  };
};
