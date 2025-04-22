import { NextRequest, NextResponse } from 'next/server';

// Admin credentials - should match the ones in middleware.ts
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'aiml1234';

export async function GET(request: NextRequest) {
  // Check if the user is authenticated
  const authHeader = request.headers.get('authorization');
  
  if (authHeader) {
    // Basic authentication header format: "Basic base64(username:password)"
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Authentication successful
      return NextResponse.json({ authenticated: true });
    }
  }
  
  // Authentication failed
  return NextResponse.json(
    { error: 'Authentication failed' },
    { status: 401 }
  );
} 