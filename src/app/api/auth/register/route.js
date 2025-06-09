import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'src', 'lib', 'usersDB.json');

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return NextResponse.json({ message: 'This email is already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
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
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}