"use client";

import React from "react";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";
interface FileUploadProps {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}
const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} fill alt="Server Image" className="rounded-full" />
        <button
          className="absolute top-0 right-0 z-10 bg-rose-500 p-1 rounded-full"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0].url);
      }}
      onUploadError={(err) => console.log(err)}
    />
  );
};

export default FileUpload;
