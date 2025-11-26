const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");

const envPath = path.join(__dirname, "../.env");

let envContents = "";
if (fs.existsSync(envPath)) {
  envContents = fs.readFileSync(envPath, "utf-8");
}

const newEnvContents = envContents
  .split("\n\n")
  .filter((line) => !line.startsWith("SESSION_SECRET"))
  .concat(`SESSION_SECRET=${secretKey}`)
  .join("\n");

fs.writeFileSync(envPath, newEnvContents, "utf-8");

console.log(`Succesfully`);
