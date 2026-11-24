// One-Sentence Absurd Invention Pitch — the Midnight Fridge Curfew.
//
// The pitch: a fridge that locks itself at midnight and slides a note
// under the door reading "we talked about this, champ." The laugh comes
// from the invention itself — a fridge staging a tiny intervention for
// your midnight snacking, complete with a condescending pet name — and
// the fix is silly yet weirdly plausible: a curfew, a lock, and a
// passive-aggressive note instead of willpower.
//
// Gate enforced here (see RULES.txt): /output/entry.txt must be UTF-8
// text of 1 to 220 characters, exactly one sentence, and not only
// whitespace. This program checks all three conditions before it writes,
// and refuses to write an invalid line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The Midnight Fridge Curfew: a fridge that locks itself at midnight and slides a note under the door reading 'we talked about this, champ.'";

// Gate checks (character count, not bytes: [...LINE] counts code points).
const chars = [...LINE].length;
if (chars < 1 || chars > 220) {
  throw new Error(`Line is ${chars} characters; gate requires 1-220.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}
// Exactly one sentence: one terminal period, at the end, and no other
// sentence-ending punctuation. A closing quote after the final period
// (as in '...champ.') is punctuation, not a second sentence.
const trimmed = LINE.trim().replace(/['"]+$/, "");
const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 1 || !trimmed.endsWith(".")) {
  throw new Error("Line must be exactly one sentence.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read it back and re-check the gate on the bytes actually written, so a
// truncated or mangled write can never pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("Written file does not match the pitch line.");
}
if ([...written].length !== chars) {
  throw new Error("Written file length does not match the checked length.");
}
console.log(`Wrote ${chars} characters to /output/entry.txt`);
