import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImpactSummary() {
  return (
    <Card className="rounded-[24px] shadow-none border-dashed border-2 border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">
          Belum Ada Aktivitas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Anda belum mencatat aktivitas apa pun. Mulailah memindai sampah Anda
          dan lihat seberapa besar dampak pengurangan jejak karbon Anda di sini!
        </p>
      </CardContent>
    </Card>
  );
}
