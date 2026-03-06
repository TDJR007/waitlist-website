import Airtable from "airtable";
import { NextRequest, NextResponse } from "next/server";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID!
);

const table = base(process.env.AIRTABLE_TABLE_NAME!);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalised = email.toLowerCase().trim();

    // Duplicate check
    const existing = await table
      .select({
        filterByFormula: `{Email} = "${normalised}"`,
        maxRecords: 1,
      })
      .firstPage();

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "You're already on the waitlist." },
        { status: 409 }
      );
    }

    // Insert
    await table.create([
      {
        fields: {
          Email: normalised,
          "Signed Up At": new Date().toISOString(),
        },
      },
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}