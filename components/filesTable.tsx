"use client";
import { IPFSFile } from "@/types";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useCallback, useEffect, useState } from "react";
import { ClipboardIcon } from "./icons";
import { addToast } from "@heroui/toast";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "cid",
    label: "CID",
  },
  {
    key: "size",
    label: "SIZE",
  },
];

export default function FilesTable() {
  const [files, setFiles] = useState<IPFSFile[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast({
        title: "CID copied",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
      });
    } catch (error) {
      console.error("Échec de la copie :", error);
    }
  };

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch("/api/files", {
          method: "GET",
        });
        const data = await res.json();
        setFiles(data["files"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  function translateFileSize(size: number | null) {
    if (size === null) {
      return "N/A";
    }
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  console.log("files", files);
  const renderCell = useCallback((file: IPFSFile, columnKey: React.Key) => {
    const cellValue = file[columnKey as keyof IPFSFile];

    switch (columnKey) {
      case "size":
        const size = translateFileSize(Number(cellValue));
        console.log("size", size);
        return size;
      case "cid":
        return (
          <div className="flex items-center gap-1">
            <span>{cellValue}</span>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleCopy(cellValue)}
            >
              <ClipboardIcon />
            </Button>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  if (loading) return <Spinner size="lg" />;
  return (
    <div className="flex flex-col ">
      <Table aria-label="Example static collection table" color={"default"}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={files} emptyContent={"No files to display."}>
          {(item) => (
            <TableRow key={item.cid}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
