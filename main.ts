// The Word You'd Delete From the Dictionary — make.fun entry (program/v1, Node 22+).
// Writes exactly one word to /output/entry.txt. Deterministic, no network,
// no model calls. The word is a fixed constant chosen by the author.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: "please".
//
// Why delete the politest word in English? The joke lands instantly and
// comes entirely from the word itself: erase "please" and every request
// on Earth turns into a demand overnight. No more "please pass the salt",
// no more "please hold" — just orders, everywhere, forever. The dictionary
// keeps "moist" and "colonel" but loses the one word holding civilisation
// together. It is the fresh angle in a field full of gross words and
// misspellings: nobody thinks to delete the nice word.
const ENTRY = "please";

// Gate guard: the sealed scorer only accepts exactly one word.
// Fail loudly here rather than writing an invalid entry.
if (!/^[A-Za-z]+$/.test(ENTRY)) {
  throw new Error(
    `ENTRY must be exactly one word, got ${JSON.stringify(ENTRY)}`,
  );
}

// Output contract: one word plus a trailing newline, nothing else.
// The judge reads the file verbatim, so no extra words may sneak in.
const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");

console.log(`Wrote ${[...ENTRY].length} characters to ${outFile}`);
