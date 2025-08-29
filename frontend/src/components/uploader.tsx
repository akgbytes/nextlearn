import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import { CloudUpload, Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useDeleteFileMutation } from "@/features/admin/adminApi";

type UploaderProps = {
  value?: string;
  onChange?: (val: string | undefined) => void;
};

export function Uploader({ value, onChange }: UploaderProps) {
  const [deleteFile, { isLoading }] = useDeleteFileMutation();
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { startUpload } = useUploadThing("courseUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setProgress(100);

      const [file] = res || [];
      if (file?.key) {
        console.log("key is: ", file.key);
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

  const startFakeProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 99) {
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
      setFile(acceptedFiles[0]);
      setIsUploading(true);

      const interval = startFakeProgress();
      const res = await startUpload(acceptedFiles);

      if (!res) {
        setIsUploading(false);
        toast.error("Something went wrong!");
      }

      clearInterval(interval);
      setProgress(100);
    },

    [startUpload]
  );

  const deleteFileHandler = async () => {
    try {
      if (value) {
        await deleteFile({ key: value }).unwrap();
        setFile(undefined);
        setProgress(0);
        setIsUploading(false);
        onChange?.(undefined);

        toast.success("File deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete file, please try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: (fileRejection) => {
      if (fileRejection.length) {
        const tooManyFiles = fileRejection.find(
          (rejection) => rejection.errors[0].code === "too-many-files"
        );
        const fileSizeTooLarge = fileRejection.find(
          (rejection) => rejection.errors[0].code === "file-too-large"
        );
        const invalidFileType = fileRejection.find(
          (rejection) => rejection.errors[0].code === "file-invalid-type"
        );

        if (tooManyFiles) {
          toast.error("Too many files selected, max is 1");
        } else if (fileSizeTooLarge) {
          toast.error("Max file size exceeded");
        } else if (invalidFileType) {
          toast.error("Only image files are allowed");
        } else {
          toast.error(fileRejection[0].errors[0].message);
        }
      }
    },
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
        {!file && !value && (
          <div className="flex flex-col items-center justify-center h-40 text-foreground">
            <CloudUpload className="size-6 mb-2" />
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or drag &
              drop
            </p>
            <p className="text-xs text-muted-foreground">Image (up to 5MB)</p>
            <Button className="mt-4" type="button">
              Select File
            </Button>
          </div>
        )}

        {/* Selected file preview */}
        {(file || value) && (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={URL.createObjectURL(file!)}
              alt="preview"
              className="object-contain max-h-[200px] w-full rounded-md"
            />

            {/* Delete button */}
            <Button
              variant="destructive"
              size="icon"
              className={cn("absolute top-0 right-2")}
              onClick={(e) => {
                e.stopPropagation();
                deleteFileHandler();
              }}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? (
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
              indicatorColor={progress === 100 ? "bg-green-600" : "bg-blue-600"}
              className="h-1 w-full bg-zinc-200"
            />
            {progress < 100 ? (
              <div className="flex gap-1 items-center justify-center text-sm text-muted-foreground pt-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Uploading {file!.name}...
              </div>
            ) : (
              <div className="flex gap-1 items-center justify-center text-sm text-green-600 pt-2">
                Finalizing...
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
