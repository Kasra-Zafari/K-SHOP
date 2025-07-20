import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "db.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileData);

    return Response.json(data);
  } catch (error) {
    console.error("Failed to read local db.json:", error.message);
    return new Response("Internal server error", { status: 500 });
  }
}