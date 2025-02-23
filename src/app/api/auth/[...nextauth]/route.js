import NextAuth from "next-auth";
import AniList from "./anilistProvider";

export const authOptions = {
  providers: [
    AniList({
      clientId: process.env.ANILIST_CLIENT_ID,
      clientSecret: process.env.ANILIST_CLIENT_SECRET,
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
