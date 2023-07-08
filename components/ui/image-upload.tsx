"use client";

import React from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  imageUrls: string[];
  isDisabled?: boolean;
  onChange: (imageUrl: string) => void;
  onRemove: () => void;
}

export default function ImageUpload({
  imageUrls,
  isDisabled,
  onChange,
  onRemove,
}: ImageUploadProps) {
  function onUpload(result: any) {
    onChange(result.info.secure_url);
  }
  return (
    <div>
      <div className="flex mb-4 gap-4">
        {imageUrls.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded overflow-hidden"
          >
            <Button
              className="absolute top-2 right-2 z-10"
              variant="destructive"
              size="icon"
              onClick={() => onRemove()}
              type="button"
            >
              <span className="sr-only">Remove image</span>
              <Trash className="h-4 w-4" />
            </Button>
            <Image
              className="object-cover"
              src={url}
              alt="Preview of billboard image"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="swncsyrb">
        {({ open }) => {
          return (
            <Button
              variant="secondary"
              disabled={isDisabled}
              onClick={() => open()}
              type="button"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
