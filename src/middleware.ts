import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  // Get the pathname (excluding the base URL)
  const pathname = request.nextUrl.pathname;

  // Skip middleware for specific paths like API routes, error pages, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/invitation-error') ||
    pathname.startsWith('/videos/') ||  // Permitir acceso a videos
    pathname.startsWith('/public/') ||  // Permitir acceso a la carpeta public
    pathname.startsWith('/audio/') ||   // Permitir acceso a la carpeta audio
    pathname.includes('.svg') ||        // Permitir acceso a SVGs
    pathname.includes('.mp4') ||        // Permitir acceso a archivos MP4
    pathname.includes('.webm') ||       // Permitir acceso a archivos WebM
    pathname.includes('.mp3') ||        // Permitir acceso a archivos MP3
    pathname.includes('.ogg')           // Permitir acceso a archivos OGG
  ) {
    return NextResponse.next();
  }

  // Get the invitationCode parameter from the URL
  const searchParams = request.nextUrl.searchParams;
  const invitationCode = searchParams.get('code');
  console.log("invitationCode", invitationCode);

  // If there's no invitation code, redirect to error page
  if (!invitationCode) {
    return NextResponse.redirect(new URL('/invitation-error', request.url));
  }

  try {
    // Decode the base64 invitation code
    const decodedInvitationCode = Buffer.from(invitationCode, 'base64').toString('utf-8');
    console.log("decodedInvitationCode", decodedInvitationCode);
    
    // Validate UUID format using regex
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(decodedInvitationCode)) {
      return NextResponse.redirect(new URL('/invitation-error', request.url));
    }

    // Create Supabase client
    const supabase = await createClient();
    
    // Check if invitation exists in the database
    const { data, error } = await supabase
      .from('root_invitations')
      .select('id')
      .eq('id', decodedInvitationCode)
      .single();

    console.log("data", data);
    console.log("error", error);

    if (error || !data) {
      return NextResponse.redirect(new URL('/invitation-error', request.url));
    }

    // Valid invitation, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Error validating invitation:', error);
    return NextResponse.redirect(new URL('/invitation-error', request.url));
  }
}

export const config = {
  matcher: [
    // Aplica el middleware solo a las rutas específicas que requieren autenticación
    // Excluye archivos estáticos, API, imágenes y página de error
    '/((?!_next/static|_next/image|favicon.ico|invitation-error|videos|public|audio|.*\\.svg|.*\\.mp4|.*\\.webm|.*\\.mp3|.*\\.ogg).*)',
  ],
}; 