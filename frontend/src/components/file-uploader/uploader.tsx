import { useCallback, useEffect, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./render-state";
import { useUploadFileMutation } from "@/features/admin/adminApi";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image";
}

interface UploaderProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Uploader = ({ value, onChange }: UploaderProps) => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    key: value,
  });
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
        });

        uploadFileHandler(file);
      }
    },
    [fileState.objectUrl]
  );

  async function uploadFileHandler(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      const response = await uploadFile({
        fileName: file.name,
        contentType: file.type,
        size: file.size,
        isImage: true,
      }).unwrap();

      console.log("server ka response: ", response);

      console.log("file :", file);

      const { presignedUrl, key } = response.data;

      await axios.put(presignedUrl, file, {
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            console.log("running, progress: ", percent);
            setFileState((prev) => ({
              ...prev,
              progress: percent,
            }));
          }
        },
      });

      setFileState((prev) => ({
        ...prev,
        progress: 100,
        uploading: false,
        key,
      }));

      onChange?.(key);

      toast.success("File uploaded successfully");
    } catch (error) {
      console.log("error while upload: ", error);
      toast.error("Failed to upload file");

      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
      }));
    }
  }

  function rejectedFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileSizeTooBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error("Too many files selected, max is 1");
      }
      if (fileSizeTooBig) {
        toast.error("Max file size exceeded");
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          file={fileState.file as File}
          progress={fileState.progress}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          handleRemoveFile={handleRemoveFile}
          isDeleting={fileState.isDeleting}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: rejectedFiles,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.uploading) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });

      setFileState((prev) => ({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: "image",
        id: null,
        isDeleting: false,
      }));

      onChange?.("");

      toast.success("File removed successfully");
    } catch (error) {
      toast.error("Failed to remove file");
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  useEffect(() => {
    if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
      URL.revokeObjectURL(fileState.objectUrl);
    }
  }, [fileState.objectUrl]);

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default Uploader;
