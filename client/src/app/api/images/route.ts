// src/app/api/images/route.ts
import { NextResponse } from "next/server";
import database from "../data/database";
export async function GET() {
  try {
    return NextResponse.json(database);
  } catch (error) {
    console.error("Error loading the database:", error);
    return NextResponse.json({ error: "Failed to load database" }, { status: 500 });
  }
}
