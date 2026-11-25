// The Absurd Clause Contest - make.fun bounty entry.
// One line, at most 200 characters: an absurd clause hidden deep inside a
// terms-of-service agreement. The program validates the line against the
// gate (UTF-8 text, 1 to 200 characters, a single line, not only whitespace)
// and writes it to entry.txt in the output directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Clause 17.8: all disputes arising under these terms shall be settled by a dance-off judged by the Company's intern, whose decision is final and non-appealable.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

writeFileSync(join(outputDir, "entry.txt"), LINE + "\n", "utf8");

// Read-back check: the file on disk must hold exactly the validated line.
const written = readFileSync(join(outputDir, "entry.txt"), "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt on disk does not match the validated line");
}
