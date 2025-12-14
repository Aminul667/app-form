"use client";

import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormImageUploadProps, UploadZoneCtx } from "../app-form.types";

type ImageItem = { id: string; file: File; url: string };

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

  // Track active object URLs to avoid stale-cleanup problems
  const urlsRef = useRef<Set<string>>(new Set());

  const [items, setItems] = useState<ImageItem[]>([]);
  const dragIndexRef = useRef<number | null>(null);

  const remainingSlots = Math.max(0, maxImages - items.length);
  const makeId = () => crypto.randomUUID();

  const handleFiles = (
    files: FileList | null,
    onChange: (val: File[]) => void
  ) => {
    if (!files || remainingSlots === 0) return;

    const fileArray = Array.from(files).slice(0, remainingSlots);
    const validFiles = fileArray.filter(
      (f) => f.size <= maxFileSizeMB * 1024 * 1024
    );

    const newItems = validFiles.map((file) => {
      const url = URL.createObjectURL(file); // create
      urlsRef.current.add(url); // ✅ track
      return { id: makeId(), file, url };
    });

    const next = [...items, ...newItems];
    setItems(next);
    onChange(next.map((it) => it.file));
  };

  const removeImage = (
    index: number,
    value: File[],
    onChange: (val: File[]) => void
  ) => {
    setItems((prev) => {
      const target = prev[index];
      if (target) {
        URL.revokeObjectURL(target.url); // ✅ revoke
        urlsRef.current.delete(target.url); // ✅ untrack
      }
      const next = prev.filter((_, i) => i !== index);
      onChange(next.map((it) => it.file));
      return next;
    });
  };

  // Reorder helper
  const reorder = <T,>(arr: T[], from: number, to: number) => {
    const copy = arr.slice();
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  };

  // Native DnD handlers
  const onDragStart = (index: number) => () => {
    dragIndexRef.current = index;
  };

  const onDragOver: React.DragEventHandler = (e) => {
    e.preventDefault(); // allow drop
  };

  const onDrop =
    (dropIndex: number, onChange: (val: File[]) => void) =>
    (e: React.DragEvent) => {
      e.preventDefault();
      const from = dragIndexRef.current;
      if (from == null || from === dropIndex) return;

      setItems((prev) => {
        const next = reorder(prev, from, dropIndex);
        onChange(next.map((it) => it.file));
        return next;
      });

      dragIndexRef.current = null;
    };

  // Cleanup remaining object URLs on unmount (uses urlsRef, no stale deps)
  useEffect(() => {
    // snapshot the Set reference when the effect is set up
    const urls = urlsRef.current;

    return () => {
      // revoke everything still tracked
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

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

          {/* Preview grid with drag-and-drop */}
          {items.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((it, index) => (
                <div
                  key={it.id}
                  className="relative"
                  draggable
                  onDragStart={onDragStart(index)}
                  onDragOver={onDragOver}
                  onDrop={onDrop(index, onChange)}
                >
                  <img
                    src={it.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-[#B1AB86]/30"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index, value as File[], onChange)
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* (Optional) small drag handle indicator */}
                  <div className="absolute bottom-1 left-1 right-1 text-center text-[10px] bg-white/70 rounded px-1">
                    drag to reorder
                  </div>
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
