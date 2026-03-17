"use client";

import { useState, useCallback, useRef } from "react";
import { convertPngToJpg, formatFileSize, getJpgFilename } from "@/lib/convert";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FileCard from "./FileCard";

export interface FileItem {
  id: string;
  file: File;
  status: "pending" | "converting" | "done" | "error";
  jpgBlob?: Blob;
  jpgSize?: number;
  previewUrl: string;
  error?: string;
}

const MAX_FILES = 20;
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export default function Converter() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const incoming = Array.from(newFiles).filter(
        (f) => /\.png$/i.test(f.name) && f.size <= MAX_FILE_SIZE,
      );

      setFiles((prev) => {
        const remaining = MAX_FILES - prev.length;
        const toAdd = incoming.slice(0, remaining);

        return [
          ...prev,
          ...toAdd.map((file) => ({
            id: crypto.randomUUID(),
            file,
            status: "pending" as const,
            previewUrl: URL.createObjectURL(file),
          })),
        ];
      });
    },
    [],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const convertOne = async (item: FileItem): Promise<FileItem> => {
    try {
      const jpgBlob = await convertPngToJpg(item.file);
      return { ...item, status: "done", jpgBlob, jpgSize: jpgBlob.size };
    } catch {
      return { ...item, status: "error", error: "Conversion failed" };
    }
  };

  const convertAll = async () => {
    setIsConverting(true);
    const pending = files.filter((f) => f.status === "pending");

    for (const item of pending) {
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: "converting" } : f)),
      );
      const result = await convertOne(item);
      setFiles((prev) =>
        prev.map((f) => (f.id === result.id ? result : f)),
      );
    }
    setIsConverting(false);
  };

  const convertSingle = async (id: string) => {
    const item = files.find((f) => f.id === id);
    if (!item) return;

    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "converting" } : f)),
    );
    const result = await convertOne(item);
    setFiles((prev) =>
      prev.map((f) => (f.id === result.id ? result : f)),
    );
  };

  const downloadOne = (item: FileItem) => {
    if (!item.jpgBlob) return;
    saveAs(item.jpgBlob, getJpgFilename(item.file.name));
  };

  const downloadAll = async () => {
    const doneFiles = files.filter((f) => f.status === "done" && f.jpgBlob);
    if (doneFiles.length === 0) return;

    setIsZipping(true);
    const zip = new JSZip();
    for (const item of doneFiles) {
      zip.file(getJpgFilename(item.file.name), item.jpgBlob!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "converted-images.zip");
    setIsZipping(false);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const doneCount = files.filter((f) => f.status === "done").length;
  const hasFiles = files.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-xl border border-border bg-surface">
        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`
            cursor-pointer transition-all m-4 rounded-xl border-2 border-dashed
            ${isDragging ? "border-white/40 bg-white/[0.04]" : "border-white/[0.12] hover:border-white/25 hover:bg-white/[0.02]"}
            ${hasFiles ? "p-6" : "p-10 sm:p-14"}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".png"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-lg border border-border bg-[#1a1a1a] p-3">
              <svg
                className="h-5 w-5 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {isDragging ? "Drop your images here" : "Drop PNG files here, or click to browse"}
              </p>
              <p className="mt-1 text-xs text-muted">
                Up to {MAX_FILES} files &middot; 25MB max per file
              </p>
            </div>
          </div>
        </div>

        {/* File list */}
        {hasFiles && (
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-muted">
                {files.length} {files.length === 1 ? "file" : "files"} &middot;{" "}
                {doneCount} converted
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-muted hover:text-white transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="max-h-[360px] space-y-1 overflow-y-auto">
              {files.map((item) => (
                <FileCard
                  key={item.id}
                  item={item}
                  onConvert={() => convertSingle(item.id)}
                  onDownload={() => downloadOne(item)}
                  onRemove={() => removeFile(item.id)}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex gap-2">
              {pendingCount > 0 && (
                <button
                  onClick={convertAll}
                  disabled={isConverting}
                  className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent disabled:opacity-50"
                >
                  {isConverting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner /> Converting...
                    </span>
                  ) : (
                    `Convert all (${pendingCount})`
                  )}
                </button>
              )}

              {doneCount > 0 && (
                <button
                  onClick={downloadAll}
                  disabled={isZipping}
                  className="flex-1 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-surface-hover disabled:opacity-50"
                >
                  {isZipping ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner /> Zipping...
                    </span>
                  ) : (
                    `Download ZIP (${doneCount})`
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
