// filename: exportSourceYAML.js
// Recursively export readable source files into pure YAML → export.yaml

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, "export.yaml");

// directory names to ignore fully
const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "out",
  "build",
  ".git",
  ".vercel",
]);

// file names to ignore fully
const IGNORE_FILES = new Set([
  ".DS_Store",
  "Thumbs.db",
  "package-lock.json",   // ✅ IGNORE
]);

// ignore extension patterns
const IGNORE_EXT = [
  ".log",
  ".env",
];

// allowed readable file extensions
const ALLOWED_EXT = [
  ".js", ".jsx",
  ".ts", ".tsx",
  ".json",
  ".css",
  ".md",
  ".txt",
];

function isAllowedFile(filename) {
  return ALLOWED_EXT.some(ext => filename.endsWith(ext));
}

function shouldIgnore(fullPath, relPath, entry) {
  const base = path.basename(fullPath);

  // ignore directories by name
  if (entry.isDirectory() && IGNORE_DIRS.has(base)) return true;

  // ignore if any part of path is ignored dir
  if (relPath.split(path.sep).some(p => IGNORE_DIRS.has(p))) return true;

  // ignore targeted filenames
  if (IGNORE_FILES.has(base)) return true;

  // ignore extensions
  if (IGNORE_EXT.some(ext => fullPath.endsWith(ext))) return true;

  return false;
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT, fullPath);

    if (shouldIgnore(fullPath, relPath, entry)) continue;

    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      if (isAllowedFile(entry.name)) {
        yield relPath;
      }
    }
  }
}

function yamlBlock(text) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map(line => "  " + line)
    .join("\n");
}

function main() {
  const outLines = [];

  for (const relPath of walk(ROOT)) {
    const fullPath = path.join(ROOT, relPath);
    const contents = fs.readFileSync(fullPath, "utf8");

    outLines.push(`${relPath}: |`);
    outLines.push(yamlBlock(contents));
    outLines.push("");
  }

  fs.writeFileSync(OUTPUT_FILE, outLines.join("\n"), "utf8");
  console.log(`✅ Export complete → ${OUTPUT_FILE}`);
}

main();
