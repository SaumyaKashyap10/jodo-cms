import { NextRequest, NextResponse } from 'next/server';
import { loginOwner, validateSession, revokeSession } from '@/lib/server-auth';

async function handle(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  const path = route.join('/');
  const method = req.method;

  if (path === 'me') {
    const session = validateSession(req);
    if (!session) {
      return NextResponse.json({ message: 'Sign in to the owner console' }, { status: 401 });
    }
    return NextResponse.json({
      user: session.user,
      csrf: session.csrf,
      token: session.token,
      sessionId: session.sessionId,
      expiresAt: session.expiresAt,
    });
  }

  if (path === 'login' && method === 'POST') {
    let body: any = {};
    try {
      body = await req.json();
    } catch {}

    const loginResult = await loginOwner(body);
    if ('error' in loginResult) {
      return NextResponse.json({ message: loginResult.error }, { status: loginResult.status });
    }

    const sessionResponse = {
      user: loginResult.user,
      token: loginResult.token,
      csrf: loginResult.csrf,
      sessionId: loginResult.sessionId,
      expiresAt: loginResult.expiresAt,
    };

    const res = NextResponse.json(sessionResponse, { status: 200 });
    res.cookies.set('jodo_session', loginResult.token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60,
    });
    return res;
  }

  if (path === 'logout' && method === 'POST') {
    revokeSession(req);
    const res = NextResponse.json({ ok: true });
    res.cookies.delete('jodo_session');
    return res;
  }

  return NextResponse.json({ error: 'Auth route not found' }, { status: 404 });
}

export const GET = handle;
export const POST = handle;
