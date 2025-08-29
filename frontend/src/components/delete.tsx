import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import { CloudUpload, File, Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type UploaderProps = {
  value?: string;
  onChange?: (val: string | undefined) => void;
};

export function Uploader({ value, onChange }: UploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { startUpload } = useUploadThing("courseUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setProgress(100);

      const [file] = res || [];
      if (file?.key) {
        onChange?.(file.key);
        toast.success("Uploaded successfully!");
      }
    },

    onUploadError: (err) => {
      setIsUploading(false);
      setProgress(0);
      toast.error(err.message || "Upload failed, please try again.");
    },

    onUploadBegin: () => {
      setIsUploading(true);
      setProgress(0);
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
      setIsUploading(true);

      const interval = startFakeProgress();
      const res = await startUpload(acceptedFiles);

      clearInterval(interval);

      if (!res) {
        setIsUploading(false);
        toast.error("Something went wrong!");
      }
    },

    [startUpload]
  );

  const handleRemove = () => {
    setFiles([]);
    setProgress(0);
    setIsUploading(false);
    onChange?.(undefined);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-72 mt-0.5",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />

        {/* Default empty state */}
        {!files.length && !value && (
          <div className="flex flex-col items-center justify-center h-40 text-foreground">
            <CloudUpload className="size-6 mb-2" />
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or drag &
              drop
            </p>
            {/* <p className="text-xs text-zinc-500">Images, Videos, PDFs etc.</p> */}
            <Button className="mt-4" type="button">
              Select File
            </Button>
          </div>
        )}

        {/* Selected file preview */}
        {(files[0] || value) && (
          <div className="relative w-full h-full flex items-center justify-center">
            {files[0]?.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(files[0])}
                alt="preview"
                className="object-contain max-h-[200px] w-full rounded-md"
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
            {/* isDeleting */}
            <Button
              variant="destructive"
              size="icon"
              className={cn("absolute top-0 right-2")}
              onClick={handleRemove}
              disabled={true}
            >
              {false ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <XIcon className="size-4" />
              )}
            </Button>
          </div>
        )}

        {/* Progress bar */}
        {isUploading && (
          <div className="w-full mt-4 max-w-xs mx-auto">
            <Progress
              value={progress}
              indicatorColor={progress === 100 ? "bg-green-500" : "bg-blue-500"}
              className="h-1 w-full bg-zinc-200"
            />
            {progress < 100 ? (
              <div className="flex gap-1 items-center justify-center text-sm text-zinc-600 pt-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Uploading {files[0].name}...
              </div>
            ) : (
              <div className="flex gap-1 items-center justify-center text-sm text-green-600 pt-2">
                Done!
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
