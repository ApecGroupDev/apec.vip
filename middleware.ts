import { NextRequest, NextResponse } from 'next/server';

// Define allowed origins
const allowedOrigins = [
  'https://apec.vip',
  'https://www.apec.vip',
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apec-vip.vercel.app', // Production URL
  'http://localhost:3000', // Local development URL
];

export async function middleware(req: NextRequest) {
  console.log('Middleware running for:', req.nextUrl.pathname); // Log the requested path

  const origin = req.headers.get('origin');

  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
    console.log(`Blocked origin: ${origin}`); // Debug blocked origins
    return new NextResponse(null, {
      status: 403, // Forbidden
      statusText: 'CORS policy: Origin not allowed',
    });
  }

  // Set CORS headers
  const res = NextResponse.next();
  res.headers.set('Access-Control-Allow-Origin', origin || '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: res.headers,
      status: 204, // No Content
    });
  }

  return res;
}

// Apply middleware to API routes only
export const config = {
  matcher: [
    '/api/admin/login',
    '/api/admin/projects',
    '/api/admin/quotes',
    '/api/admin/users',  
    '/api/auth/validate-token',
    '/api/users/projects',
    '/api/users/quotes',
    '/api/verify-master-key',
    '/api/verify-special-code',
  ],
};
