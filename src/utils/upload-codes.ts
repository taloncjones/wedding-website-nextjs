const { execSync } = require("child_process");
const path = require("path");

const isLocal = process.argv.includes("--local");
const file = path.resolve(__dirname, "generated-invites.sql");
const localFlag = isLocal ? "--local" : "";

try {
  execSync(
    `npx wrangler d1 execute auth-js-d1-guest-codes-db ${localFlag} --file=${file}`,
    { stdio: "inherit" }
  );
  console.log(`✅ Invite codes uploaded to ${isLocal ? "LOCAL" : "CLOUD"} D1`);
} catch (err) {
  console.error(
    `⚠️ Error uploading to ${isLocal ? "LOCAL" : "CLOUD"} D1. Run manually:`
  );
  console.error(
    `npx wrangler d1 execute auth-js-d1-guest-codes-db ${localFlag} --file=${file}`
  );
}
