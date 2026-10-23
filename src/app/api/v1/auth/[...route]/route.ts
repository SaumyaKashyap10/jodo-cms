import { NextRequest, NextResponse } from 'next/server';

const DEMO_OWNER_USER = {
  id: 'usr-demo-owner',
  email: 'saumya@gmail.com',
  role: 'owner',
};

const DEMO_SESSION = {
  user: DEMO_OWNER_USER,
  csrf: 'demo-csrf-token-saumya',
};

async function handle(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  const path = route.join('/');
  const method = req.method;

  if (path === 'me') {
    const res = NextResponse.json(DEMO_SESSION);
    res.cookies.set('jodo_session', 'demo-session-token', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60,
    });
    return res;
  }

  if (path === 'login' && method === 'POST') {
    let body: any = {};
    try {
      body = await req.json();
    } catch {}

    const email = body.email || DEMO_OWNER_USER.email;
    const session = {
      ...DEMO_SESSION,
      user: { ...DEMO_OWNER_USER, email },
    };

    const res = NextResponse.json(session, { status: 200 });
    res.cookies.set('jodo_session', 'demo-session-token', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60,
    });
    return res;
  }

  if (path === 'logout' && method === 'POST') {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete('jodo_session');
    return res;
  }

  return NextResponse.json({ error: 'Auth route not found' }, { status: 404 });
}

export const GET = handle;
export const POST = handle;
