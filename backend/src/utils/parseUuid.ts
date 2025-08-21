import { z } from "zod";
import { handleZodError } from "@/utils/handleZodError";

export const parseUuid = (id: unknown, name: string) => {
  const uuidSchema = z.uuid({ message: `Invalid ${name} ID` });
  handleZodError(uuidSchema.safeParse(id));
};
