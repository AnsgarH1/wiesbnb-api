/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "WiesBnB-Api",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
    };
  },
  async run() {
    const db = new sst.cloudflare.D1("Wiesbnb_Database");

    const databaseId = db.id.apply(
      (id) => new sst.Secret("Wiesbnb_DatabaseId", id)
    );

    const cloudflareAccountId = new sst.Secret(
      "CloudflareAccountId",
      sst.cloudflare.DEFAULT_ACCOUNT_ID
    );

    const cloudflareApiToken = new sst.Secret(
      "CloudflareApiToken",
      process.env.CLOUDFLARE_API_TOKEN
    );

    const worker = new sst.cloudflare.Worker("Wiesbnb_Server", {
      handler: "./src/server.ts",
      url: true,
      link: [databaseId, cloudflareAccountId, cloudflareApiToken, db],
    });

    new sst.x.DevCommand("Drizzle Studio", {
      link: [db, databaseId, cloudflareAccountId, cloudflareApiToken],
      dev: {
        autostart: true,
        command: "pnpm drizzle-kit studio",
      },
    });

    return {
      api: worker.url,
    };
  },
});
