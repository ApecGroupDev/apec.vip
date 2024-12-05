import { NextRequest, NextResponse } from 'next/server';

// Define allowed origins
const allowedOrigins = [
  'https://apec.vip',
  'https://www.apec.vip',
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apec-vip.vercel.app', // Production URL
  'http://localhost:3000', // Local development URL
];

export async function middleware(req: NextRequest) {
  const origin = req.headers.get('origin');

  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
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
