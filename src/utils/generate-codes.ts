const { randomBytes } = require("crypto");
const { writeFileSync } = require("fs");

const charset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateCode(length = 12) {
  const bytes = randomBytes(length);
  return [...bytes].map((byte) => charset[byte % charset.length]).join("");
}

const TOTAL_CODES = 200;
const codes = [];

for (let i = 0; i < TOTAL_CODES; i++) {
  codes.push(generateCode());
}

// Output to CSV for labels/QR printing
writeFileSync("scripts/generated-invites.csv", codes.join("\n"));

const sql = `
${codes
  .map(
    (code) => `INSERT INTO invites (code, name) VALUES ('${code}', 'Guest');`
  )
  .join("\n")}
`;

writeFileSync("scripts/generated-invites.sql", sql);

console.log("✅ 200 invite codes written to scripts/generated-invites.sql");
