import { NextRequest, NextResponse } from 'next/server';

// Define allowed origins
const allowedOrigins = [
  'https://apec.vip',
  'https://www.apec.vip',
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apec-vip.vercel.app', // Production URL
  'http://localhost:3000', // Local development URL
];

export async function middleware(req: NextRequest) {
  console.log('Middleware running for:', req.nextUrl.pathname); // Add this line

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

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: res.headers,
      status: 204, // No Content
    });
  }

  return res;
}
