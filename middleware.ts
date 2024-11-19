import Cors from 'cors';
import { NextRequest, NextResponse } from 'next/server';

// Get the API base URL from environment variable or fallback to production API URL
const allowedOrigin = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apec-vip.vercel.app';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow GET, POST, and OPTIONS methods
  origin: allowedOrigin, // Dynamically set the allowed origin
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
