import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import { Cloud, File, Loader2, X } from "lucide-react";
import { toast } from "sonner";

type UploaderProps = {
  value?: string;
  onChange?: (val: string | undefined) => void;
};

export function Uploader({ value, onChange }: UploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { startUpload } = useUploadThing("courseUploader", {
    onClientUploadComplete: (res) => {
      setUploading(false);
      setProgress(100);
      const [file] = res || [];
      if (file?.key) {
        onChange?.(file.key);
        toast.success("Uploaded successfully!");
      }
    },
    onUploadError: (err) => {
      setUploading(false);
      setProgress(0);
      toast.error(err.message || "Upload failed!");
    },
  });

  // fake progress bar animation
  const startFakeProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          clearInterval(interval);
          return p;
        }
        return p + 5;
      });
    }, 300);
    return interval;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      setFiles(acceptedFiles);
      setUploading(true);

      const interval = startFakeProgress();
      const res = await startUpload(acceptedFiles);

      clearInterval(interval);

      if (!res) {
        setUploading(false);
        toast.error("Something went wrong!");
      }
    },
    [startUpload]
  );

  const handleRemove = () => {
    setFiles([]);
    setProgress(0);
    setUploading(false);
    onChange?.(undefined);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 cursor-pointer 
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-zinc-300"}`}
    >
      <input {...getInputProps()} />

      {/* Default empty state */}
      {!files.length && !value && (
        <div className="flex flex-col items-center justify-center h-40 text-zinc-600">
          <Cloud className="h-6 w-6 mb-2" />
          <p className="text-sm">
            <span className="font-semibold">Click to upload</span> or drag &
            drop
          </p>
          <p className="text-xs text-zinc-500">Images, Videos, PDFs etc.</p>
        </div>
      )}

      {/* Selected file preview */}
      {(files[0] || value) && (
        <div className="relative max-w-xs w-full mt-2">
          {files[0]?.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(files[0])}
              alt="preview"
              className="w-full h-40 object-cover rounded-md border"
            />
          ) : files[0]?.type.startsWith("video/") ? (
            <video
              controls
              className="w-full h-40 rounded-md border object-cover"
              src={URL.createObjectURL(files[0])}
            />
          ) : (
            <div className="bg-white flex items-center rounded-md overflow-hidden outline-1 outline-zinc-200 divide-x divide-zinc-200">
              <div className="px-3 py-2 h-full grid place-items-center">
                <File className="h-4 w-4 text-blue-500" />
              </div>
              <div className="px-3 py-2 h-full text-sm truncate">
                {files[0]?.name || "Uploaded file"}
              </div>
            </div>
          )}

          {/* remove button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-white/80 hover:bg-red-100 rounded-full p-1 text-red-500 shadow"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Progress bar */}
      {uploading && (
        <div className="w-full mt-4 max-w-xs mx-auto">
          <Progress
            value={progress}
            indicatorColor={progress === 100 ? "bg-green-500" : ""}
            className="h-1 w-full bg-zinc-200"
          />
          {progress < 100 ? (
            <div className="flex gap-1 items-center justify-center text-sm text-zinc-600 pt-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Uploading...
            </div>
          ) : (
            <div className="flex gap-1 items-center justify-center text-sm text-green-600 pt-2">
              Done!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
