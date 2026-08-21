import assert from "node:assert/strict";
import test from "node:test";

async function request(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the editorial storefront with meaningful SEO content", async () => {
  const response = await request("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Marina — Peintures originales<\/title>/i);
  assert.match(html, /Des mondes à/);
  assert.match(html, /Le Monde intérieur/);
  assert.match(html, /Voir et acquérir/);
  assert.match(html, /Après Instagram/);
  assert.match(html, /Commandes sur mesure/);
  assert.match(html, /Une œuvre qui commence par une conversation/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /certificat original/i);
  assert.doesNotMatch(html, /V1|V2 commerce|paiement intégré/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Starter Project/i);
});

test("renders a non-indexable confirmation page", async () => {
  const response = await request("/merci");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Acquisition confirmée/);
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
});
