import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcrypt";
import clientPromise from "@/lib/mongodb";


const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    console.log("[SignUp API] Received request");
    try {
        const data = await req.json();
        console.log("[SignUp API] Request JSON:", data);

        const { email, password } = SignUpSchema.parse(data);
        console.log("[SignUp API] Parsed data:", { email, password: "[HIDDEN]" });

        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");

        // Check if user already exists
        const existing = await usersCollection.findOne({ email });
        if (existing) {
            console.log("[SignUp API] User already exists:", email);
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashed = await hash(password, 10);
        console.log("[SignUp API] Hashed password");

        // Insert user
        const result = await usersCollection.insertOne({
            email,
            username : email.split("@")[0],
            password: hashed,
            createdAt: new Date(),
        });
        console.log("[SignUp API] User created with id:", result.insertedId);

        return NextResponse.json({ message: "User created", userId: result.insertedId }, { status: 201 });
    } catch (error: unknown) {
        console.error("[SignUp API] Error:", error);
        return NextResponse.json({ 
            message: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 400 });
    }
}
