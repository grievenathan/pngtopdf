"use client";

import { FileItem } from "./Converter";
import { formatFileSize, getJpgFilename } from "@/lib/convert";

interface FileCardProps {
  item: FileItem;
  onConvert: () => void;
  onDownload: () => void;
  onRemove: () => void;
}

export default function FileCard({ item, onConvert, onDownload, onRemove }: FileCardProps) {
  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.03]">
      {/* Thumbnail */}
      <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <img
          src={item.previewUrl}
          alt={item.file.name}
          className="h-full w-full object-cover"
        />
        {item.status === "converting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm text-white">
          {item.status === "done" ? getJpgFilename(item.file.name) : item.file.name}
        </p>
        <p className="text-xs text-muted">
          {formatFileSize(item.file.size)}
          {item.jpgSize && (
            <span> &rarr; {formatFileSize(item.jpgSize)}</span>
          )}
        </p>
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        {item.status === "pending" && (
          <span className="text-xs text-muted">Pending</span>
        )}
        {item.status === "converting" && (
          <span className="text-xs text-blue-400">Converting</span>
        )}
        {item.status === "done" && (
          <span className="text-xs text-emerald-400">Done</span>
        )}
        {item.status === "error" && (
          <span className="text-xs text-red-400">Error</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {item.status === "pending" && (
          <button
            onClick={(e) => { e.stopPropagation(); onConvert(); }}
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
            title="Convert"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
          </button>
        )}
        {item.status === "done" && (
          <button
            onClick={(e) => { e.stopPropagation(); onDownload(); }}
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-emerald-400"
            title="Download JPG"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="rounded-md p-1.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-red-400"
          title="Remove"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
