import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUpload
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop you file here or{" "}
        <span className="text-primary font-bold cursor-pointer">
          click to upload
        </span>
      </p>
      <Button className="mt-4" type="button">
        Select File
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className="size-6 text-destructive" />
      </div>
      <p className="text-base font-semibold">Upload failed</p>
      <p className="text-xs mt-1 text-muted-foreground">Something went wrong</p>
      <Button className="mt-4" type="button">
        Try Again
      </Button>
    </div>
  );
};
