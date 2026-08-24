import { NextRequest, NextResponse } from 'next/server';

// Admin panel is a separate Next.js app at localhost:3002 — no admin routes in the public site.
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = { matcher: [] };
