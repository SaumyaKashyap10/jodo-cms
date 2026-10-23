import { NextRequest, NextResponse } from 'next/server';
import { handleOwnerRoute } from '@/lib/owner-backend-service';

async function handle(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  const path = 'owner/' + route.join('/');
  const method = req.method;

  const res = await handleOwnerRoute(path, method, req);
  if (res) return res;

  return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
