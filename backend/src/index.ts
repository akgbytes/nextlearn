import app from "@/app.js";
import { logger } from "@/configs/logger";
import { env } from "@/configs/env";

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
