import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { v4 } from 'uuid';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: "Credentials",
        async authorize(credentials, req) {
            console.log(credentials?.username)
            const user = { id: v4(), username: credentials?.username}
            return user
        },
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
        },
      }),
  ],
  callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token
      },
      session: async ({ session, token }) => {
          session.user = token.user
          console.log(session)
          return session
      }
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  }
}


export default NextAuth(authOptions)