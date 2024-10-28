import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/database/config";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { usename } = await request.json();

  if (!usename) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const promisePool = mysqlPool.promise();

    const [rows] = await promisePool.query(
      "SELECT ID FROM users WHERE USERNAME = ?",
      [usename]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    const token = jwt.sign({ id: user.ID }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Login successful", token });
    response.cookies.set("userAuth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, 
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
