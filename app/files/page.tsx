"use client";
import FilesTable from "@/components/filesTable";

export default function FilesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fichiers sur IPFS</h1>
      <FilesTable />
    </div>
  );
}
