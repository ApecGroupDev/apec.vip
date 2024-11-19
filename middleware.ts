import Cors from 'cors';
import { NextRequest, NextResponse } from 'next/server';

// Define a list of allowed origins (this could include local development, preview, and production URLs)
const allowedOrigins = [
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apec-vip.vercel.app', // Production URL
  'http://localhost:3000', // Local development URL
];

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow GET, POST, and OPTIONS methods
  origin: (origin: string | undefined, callback: Function) => {
    // If origin is not present (like when local testing), allow it
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'), false);
  },
});

// Helper function to run the middleware
function runMiddleware(req: NextRequest, res: NextResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Middleware function to handle CORS
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Run CORS middleware
  await runMiddleware(req, res, cors);

  return res;
}
