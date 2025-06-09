import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log('Register API called', { name, email });

    // بررسی وجود کاربر
    const { data: existingUsers, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    // console.log('existingUsers:', existingUsers, 'selectError:', selectError);

    if (selectError) throw selectError;

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ message: 'This email is already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // درج کاربر جدید
    const { data: newUserArr, error: insertError } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    // console.log('newUserArr:', newUserArr, 'insertError:', insertError);

    if (insertError) throw insertError;

    const newUser = newUserArr[0];

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