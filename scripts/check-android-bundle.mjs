import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const indexPath = "dist/android/index.html";
assert.equal(existsSync(indexPath), true, "missing dist/android/index.html — run npm run build:android");
const html = readFileSync(indexPath, "utf8");
assert.match(html, /Wortreise/);
assert.match(html, /assets\//);

const config = readFileSync("capacitor.config.ts", "utf8");
assert.match(config, /app\.wortreise\.learn/);
assert.match(config, /dist\/android/);

console.log("android web bundle ok");
