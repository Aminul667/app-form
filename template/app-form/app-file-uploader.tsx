"use client";

import { Label } from "../ui/label";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormImageUploadProps, UploadZoneCtx } from "./app-form.types";

const AppFileUploader = <T extends FieldValues>({
  name,
  control,
  errors,
  label = "Upload Images",
  maxImages = 10,
  maxFileSizeMB = 10,
  uploadZoneInner,
  labelClass,
  containerClass,
}: FormImageUploadProps<T>) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (
    files: FileList | null,
    onChange: (val: File[]) => void
  ) => {
    if (!files) return;
    const fileArray = Array.from(files).slice(0, maxImages);
    const validFiles = fileArray.filter(
      (file) => file.size <= maxFileSizeMB * 1024 * 1024
    );
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    onChange(validFiles);
  };

  const removeImage = (
    index: number,
    images: File[],
    onChange: (val: File[]) => void
  ) => {
    const updated = images.filter((_, i) => i !== index);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    onChange(updated);
  };

  const renderUploadZoneInner = () => {
    const ctx: UploadZoneCtx = { maxFileSizeMB };

    if (typeof uploadZoneInner === "function") return uploadZoneInner(ctx);
    if (uploadZoneInner) return uploadZoneInner;

    // default content
    return (
      <div className="flex flex-col items-center gap-2">
        <Upload className="w-10 h-10" />
        <span className="font-medium">Drop files or click to browse test</span>
        <span className="text-sm">
          Supported: PNG/JPG · up to {maxFileSizeMB}MB each test
        </span>
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange } }) => (
        <div className="space-y-4">
          <Label className={labelClass ? labelClass : "text-sm font-medium"}>
            {label} (Max {maxImages})
          </Label>

          {/* Upload Zone */}
          <div
            className={
              containerClass
                ? containerClass
                : "border-2 border-dashed border-black/30 rounded-lg p-6 text-center"
            }
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files, onChange)}
              id={name}
            />
            <label htmlFor={name} className="cursor-pointer">
              {renderUploadZoneInner()}
            </label>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index, value, onChange)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors[name]?.message)}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default AppFileUploader;
