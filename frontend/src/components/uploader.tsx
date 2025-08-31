import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import { CloudUpload, Loader2, XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useDeleteFileMutation } from "@/features/admin/adminApi";
import { useSnackbar } from "notistack";

type UploaderProps = {
  value: string | undefined;
  onChange: (val: string | undefined) => void;
};

interface UploaderState {
  file: File | null;
  key?: string;
  objectUrl?: string;
  uploading: boolean;
  progress: number;
}

export function Uploader({ value, onChange }: UploaderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteFile, { isLoading }] = useDeleteFileMutation();
  const [fileState, setFileState] = useState<UploaderState>({
    file: null,
    key: value,
    uploading: false,
    progress: 0,
  });

  const { startUpload } = useUploadThing("courseUploader", {
    onClientUploadComplete: (res) => {
      if (res.length > 0 && res[0]) {
        setFileState((prevState) => {
          const updatedState = { ...prevState };
          return {
            ...updatedState,
            progress: 100,
            uploading: false,
            key: res[0].key,
          };
        });

        onChange(res[0].ufsUrl);
        enqueueSnackbar("File uploaded successfully", { variant: "success" });
      }
    },

    onUploadError: (err) => {
      setFileState((prevState) => {
        const updatedState = { ...prevState };
        return {
          ...updatedState,
          progress: 0,
          uploading: false,
        };
      });

      enqueueSnackbar("Upload failed, Please try again.", { variant: "error" });
    },

    onUploadBegin: () => {
      setFileState((prevState) => {
        const updatedState = { ...prevState };
        return {
          ...updatedState,
          progress: 0,
          uploading: true,
        };
      });
    },
  });

  const startFakeProgress = () => {
    setFileState((prevState) => {
      const updatedState = { ...prevState };
      return {
        ...updatedState,
        progress: 0,
      };
    });
    const interval = setInterval(() => {
      setFileState((prevState) => {
        const updatedState = { ...prevState };
        if (prevState.progress >= 99) {
          clearInterval(interval);
          return updatedState;
        }
        return {
          ...updatedState,
          progress: prevState.progress + 5,
        };
      });
    }, 300);
    return interval;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      setFileState({
        file: file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
      });

      const interval = startFakeProgress();
      const res = await startUpload(acceptedFiles);

      if (!res) {
        setFileState((prevState) => {
          const updatedState = { ...prevState };
          return {
            ...updatedState,

            uploading: false,
          };
        });

        enqueueSnackbar("Something went wrong", { variant: "error" });
      }

      clearInterval(interval);
      setFileState((prevState) => {
        const updatedState = { ...prevState };
        return {
          ...updatedState,

          progress: 100,
        };
      });
    },

    [startUpload]
  );

  const deleteFileHandler = async () => {
    try {
      if (value) {
        await deleteFile({ key: fileState.key! }).unwrap();
        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
        setFileState({
          file: null,
          key: undefined,
          objectUrl: undefined,
          uploading: false,
          progress: 0,
        });

        onChange(undefined);

        enqueueSnackbar("File deleted successfully", { variant: "success" });
      }
    } catch (err) {
      enqueueSnackbar("Failed to delete file, Please try again.", {
        variant: "error",
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: fileState.uploading,
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
          enqueueSnackbar("Too many files selected, max is 1", {
            variant: "error",
          });
        } else if (fileSizeTooLarge) {
          enqueueSnackbar("Max file size exceeded", {
            variant: "error",
          });
        } else if (invalidFileType) {
          enqueueSnackbar("Only image files are allowed", {
            variant: "error",
          });
        } else {
          enqueueSnackbar(fileRejection[0].errors[0].message, {
            variant: "error",
          });
        }
      }
    },
  });

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

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
        {!fileState.file && !value && (
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
        {(fileState.file || value) && (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={fileState.objectUrl || value}
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
        {fileState.uploading && (
          <div className="w-full mt-4 max-w-xs mx-auto">
            <Progress
              value={fileState.progress}
              indicatorColor={
                fileState.progress === 100 ? "bg-green-600" : "bg-blue-600"
              }
              className="h-1 w-full bg-zinc-200"
            />
            {fileState.progress < 100 ? (
              <div className="flex gap-1 items-center justify-center text-sm text-muted-foreground pt-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Uploading {fileState.file?.name}...
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
