import { readFile } from "fs/promises";

export async function customReadFile(path: string) {
  try {
    const file = await readFile(process.cwd() + path, "utf8");
    return file;
  } catch (e) {
    console.log("[CUSTOM-READ-FILE]", e);
    return "{}";
  }
}
