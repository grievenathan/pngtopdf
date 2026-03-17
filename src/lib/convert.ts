import { PDFDocument } from "pdf-lib";

function pdfBytesToBlob(pdfBytes: Uint8Array): Blob {
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}

export async function convertPngToPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.create();
  const pngImage = await pdfDoc.embedPng(arrayBuffer);

  const { width, height } = pngImage.scale(1);
  const page = pdfDoc.addPage([width, height]);
  page.drawImage(pngImage, { x: 0, y: 0, width, height });

  const pdfBytes = await pdfDoc.save();
  return pdfBytesToBlob(pdfBytes);
}

export async function convertMultiplePngsToPdf(files: File[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pngImage = await pdfDoc.embedPng(arrayBuffer);
    const { width, height } = pngImage.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(pngImage, { x: 0, y: 0, width, height });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytesToBlob(pdfBytes);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getPdfFilename(originalName: string): string {
  return originalName.replace(/\.png$/i, ".pdf");
}
