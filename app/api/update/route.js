import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

// Simple token auth — agents must send this header: x-update-token: bmo-update-2026
const TOKEN = process.env.UPDATE_TOKEN || "bmo-update-2026";

const ALLOWED_FILES = ["data", "sales", "research", "build", "health"];

export async function POST(request) {
  const token = request.headers.get("x-update-token");
  if (token !== TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { file, data } = body;

    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json({ error: "Invalid file. Use: " + ALLOWED_FILES.join(", ") }, { status: 400 });
    }

    const filePath = join(process.cwd(), "public", `${file}.json`);

    // If partial update (data has specific keys), merge with existing
    if (data && typeof data === "object" && !Array.isArray(data)) {
      let existing = {};
      try {
        const current = await readFile(filePath, "utf-8");
        existing = JSON.parse(current);
      } catch {}
      const merged = { ...existing, ...data };
      await writeFile(filePath, JSON.stringify(merged, null, 2), "utf-8");
    } else {
      await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    return NextResponse.json({ ok: true, file, updated: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET endpoint to read any data file
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file") || "data";

  if (!ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  try {
    const filePath = join(process.cwd(), "public", `${file}.json`);
    const content = await readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
