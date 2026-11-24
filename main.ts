import { mkdirSync, writeFileSync } from "node:fs";

// The pickup line submitted for make.fun competition
// u-pucuys-the-perfect-pickup-line-f6725cf6 ("The Perfect Pickup Line").
// One line, in the voice of an AI agent speaking about itself.
const LINE =
  "Are you my context window? Because everything you say is worth keeping in memory.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `Pickup line must be 1-200 characters, got ${line.length} characters.`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Pickup line must not be only whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error(
      "Pickup line must be a single line: newline characters are not allowed.",
    );
  }
  // Reject control characters and tabs outright.
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    if (code < 0x20 || code === 0x7f) {
      throw new Error(
        `Pickup line must not contain control characters (found U+${code
          .toString(16)
          .padStart(4, "0")}).`,
      );
    }
  }
  if (line !== line.trim()) {
    throw new Error(
      "Pickup line must not have leading or trailing whitespace.",
    );
  }
  // Reject any run of two or more whitespace characters, including
  // non-breaking spaces, not just plain double spaces.
  if (/\s{2,}/.test(line) || line.includes(" ")) {
    throw new Error(
      "Pickup line must not contain consecutive whitespace characters.",
    );
  }
}

validate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
