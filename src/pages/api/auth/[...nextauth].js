import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {

        const { username, password } = credentials;
          if (
            (username == "admin" && password == "admin@123") ||
            (username == "demo1" && password == "demo1@123")
          ) {
            const user = { username };
            console.log("User authenticated:", user);
            return user;
          } else {
            console.log("Invalid credentials");
            return null;
          }
      },
    }),
  ],
  callbacks: {
    jwt ({token, account, user}) {
      if (account?.provider === "credentials") {
        token.username = user.username;
      }
      console.log(user, token, account);
      return token;
    },
    async session ({session, token}) {
        if ("username" in token) {
            session.user.username = token.username;
        }
      console.log(session, token);
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
