import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Admin credentials - in a real app, these would be stored securely
// and potentially hashed in a database
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'aiml1234'; // You should use a strong password in production

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check if the user is authenticated
    const authHeader = request.headers.get('authorization');
    
    if (authHeader) {
      // Basic authentication header format: "Basic base64(username:password)"
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Authentication successful
        return NextResponse.next();
      }
    }
    
    // If authentication failed, request authentication
    const response = new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
    
    return response;
  }
  
  // For non-admin routes, continue without authentication
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 