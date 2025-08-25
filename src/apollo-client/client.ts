import { cookies } from "next/headers";
import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const dynamic = "force-dynamic";

const registeredClient = registerApolloClient(async () => {
  const cookieStore = await cookies();
  // const token = cookieStore.get('cs-auth')?.value || '';

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "",
      credentials: "include",
      // headers: {
      // Authorization: `Bearer ${token}`,
      // 'Apollo-Require-Preflight': 'true'
      // },
      fetchOptions: {
        cache: "no-store",
      },
    }),
  });
});

export const { getClient, query, PreloadQuery } = registeredClient;
