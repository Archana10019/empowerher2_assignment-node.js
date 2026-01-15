
import fs from "fs/promises";

export const readFileData = async () => {
  const data = await fs.readFile("Data.txt", "utf-8");
  return data;
};
