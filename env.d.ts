// types/next-auth.d.ts
import NextAuth from 'next-auth'
import 'next-auth/jwt'

declare global {
  interface CloudflareEnv {
    AUTH_SECRET: string
    AUTH_GITHUB_ID: string
    AUTH_GITHUB_SECRET: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    NEXT_PUBLIC_VERCEL_URL: string
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
  }
}
