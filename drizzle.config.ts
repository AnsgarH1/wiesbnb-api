import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { Resource } from "sst";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/infrastructure/drizzle/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: Resource.CloudflareAccountId.value,
    databaseId: Resource.Wiesbnb_DatabaseId.value,
    token: Resource.CloudflareApiToken.value,
  },
});
