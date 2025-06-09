import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'src', 'lib', 'usersDB.json');

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    const user = users.find(user => user.email === email);
    if (!user) {
      return NextResponse.json({ message: 'No user found with this email' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}