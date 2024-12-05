import NextAuth, { customFetch } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      [customFetch]: fetch,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      [customFetch]: fetch,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  basePath: '/auth',
  session: { strategy: 'jwt' },
  callbacks: {
    authorized: async () => true,
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token || ''
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
