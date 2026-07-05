<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Authentication

grist-kit supports two ways to authenticate against a Grist document: an API key, or a Grist access token. They differ in lifetime, scope, and how they are sent on the wire. Pick the one that matches your use case.

## API key

```ts
import { gristDoc } from "grist-kit";

const doc = gristDoc({
  baseDocUrl: process.env.GRIST_DOC_URL!,
  apiKey: process.env.GRIST_API_KEY,
});
```

API keys are long-lived credentials tied to a single Grist user. They are sent as `Authorization: Bearer <key>` on every request. Generate one in Grist's **Profile Settings → API**. Use this when you have a stable server-to-server trust relationship with Grist.

## Access token

```ts
import { gristDoc } from "grist-kit";

const doc = gristDoc({
  baseDocUrl: tokenInfo.baseUrl,
  accessToken: tokenInfo.token,
});
```

Access tokens are short-lived (15-minute default TTL), document-scoped JWTs. They are sent as a `?auth=<token>` query parameter on every request. They are the auth mechanism used by Grist's custom-widget plugin API (`grist.docApi.getAccessToken()`).

A function is also accepted, invoked **per request**:

```ts
const doc = gristDoc({
  baseDocUrl: tokenInfo.baseUrl,
  accessToken: () => tokenInfo.token,
});
```

Use a function when the token may need to be refreshed (e.g., a widget whose user keeps the tab open for more than 15 minutes). Use a plain string when the token arrives from outside grist-kit (e.g., a backend that receives it in a request from a widget) and is used for a single short-lived operation.

## Mutual exclusion

You may not set both `apiKey` and `accessToken` at the same time. `createRequester` throws:

```
Specify either apiKey or accessToken, not both.
```

An empty string for either field is treated as "not set", so `apiKey: ""` + `accessToken: "tok"` is valid (only the access token is used).

## Unauthenticated

If neither field is set, requests are sent without any auth header or query parameter. This works for public Grist documents.
