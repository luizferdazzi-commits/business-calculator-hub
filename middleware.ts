import {NextRequest,NextResponse} from 'next/server';

const securityHeaders={
  'Content-Security-Policy':[
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self' https://buy.stripe.com https://checkout.stripe.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data: https://flagcdn.com https://*.googleusercontent.com",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "upgrade-insecure-requests"
  ].join('; '),
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'X-Content-Type-Options':'nosniff',
  'X-Frame-Options':'DENY',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=(self)',
  'Cross-Origin-Opener-Policy':'same-origin-allow-popups'
};

export function middleware(req:NextRequest){
  const requestHeaders=new Headers(req.headers);
  requestHeaders.set('x-pathname',req.nextUrl.pathname);
  const res=NextResponse.next({request:{headers:requestHeaders}});
  for(const [key,value] of Object.entries(securityHeaders))res.headers.set(key,value);
  return res;
}

export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};
