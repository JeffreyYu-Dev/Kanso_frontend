export default function AniList({ clientId, clientSecret }) {
  return {
    id: "anilist",
    name: "AniList",
    type: "oauth",
    authorization: {
      url: "https://anilist.co/api/v2/oauth/authorize",
      params: {
        client_id: clientId,
        redirect_uri: "http://localhost:3000/api/auth/callback/anilist",
        response_type: "code",
        scope: "",
      },
    },
    token: {
      url: "https://anilist.co/api/v2/oauth/token",
      params: { grant_type: "authorization_code" },
    },
    userinfo: {
      url: "https://graphql.anilist.co",
      async request({ client, tokens }) {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access_token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                Viewer {
                  id
                  name
                  avatar {
                    large
                  }
                  bannerImage
                  about
                  siteUrl
                }
              }
            `,
          }),
        });
        const { data } = await response.json();
        return data.Viewer;
      },
    },
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.name,
        image: profile.avatar.large,
      };
    },

    clientId: clientId,
    clientSecret: clientSecret,
  };
}
