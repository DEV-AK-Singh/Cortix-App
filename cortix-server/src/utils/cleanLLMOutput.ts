export function cleanLLMOutput(input: string): string {
  return input
    // Remove Markdown code fences
    .replace(/```[a-zA-Z]*\n?/g, "")
    .replace(/```/g, "")
    
    // Remove weird unicode chars
    .replace(/\u200B/g, "")
    .replace(/\u00A0/g, " ")
    
    // Normalize line endings
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")

    // Remove trailing spaces per line
    .split("\n")
    .map(line => line.trimEnd())
    .join("\n")

    // Remove leading blank lines
    .replace(/^\s*\n/, "")

    // Deduplicate blank lines (but keep one)
    .replace(/\n{3,}/g, "\n\n")

    .trim(); // final trim
}
