import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  if (!process.env.MONGODB_DB_NAME) {
    console.error('Registration error: MONGODB_DB_NAME environment variable not set.');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    // --- MODIFICATION 1: Get `verificationCode` from the request body ---
    const { username, password, verificationCode } = await req.json();

    // --- MODIFICATION 2: Add validation for the verification code ---
    if (!username || !password || !verificationCode) {
      return NextResponse.json({ message: 'Missing username, password, or verification code' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME); 
    const users = db.collection('users');
    const verificationCodes = db.collection('verificationCodes');

    // --- MODIFICATION 3: Find and validate the code from the database ---
    const codeDoc = await verificationCodes.findOne({ 
      code: verificationCode,
      expiresAt: { $gt: new Date() } // Check if the code has not expired
    });

    if (!codeDoc) {
      return NextResponse.json(
        { message: 'Invalid or expired verification code.' },
        { status: 403 }
      );
    }
    
    // --- The rest of your existing logic continues from here ---
    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      username,
      passwordHash: hashedPassword,
      createdAt: new Date(),
      isAdmin: true, // This makes every new user an administrator
    });

    // --- MODIFICATION 4: Clean up the used verification code ---
    await verificationCodes.deleteOne({ _id: codeDoc._id });

    return NextResponse.json({ 
      message: 'User registered successfully', 
      userId: result.insertedId.toString() 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration error:', error);
    if (error && typeof error === 'object' && 'code' in error && (error as { code: number }).code === 11000) {
      return NextResponse.json({ message: 'Username already exists (database constraint).' }, { status: 409 });
    }
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}