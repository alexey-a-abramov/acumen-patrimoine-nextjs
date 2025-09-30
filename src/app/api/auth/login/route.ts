import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Simple password check (matching PHP logic)
    if (password === 'Success2025') {
      // Set authentication cookie
      (await cookies()).set('authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Connexion réussie',
        redirect: '/partenaires' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Mot de passe incorrect.' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur de connexion' 
    }, { status: 500 });
  }
}