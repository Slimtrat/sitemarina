import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const outDirectory = new URL("../out/", import.meta.url);
const clientDirectory = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", String(Date.now()));

await rm(outDirectory, { recursive: true, force: true });
await mkdir(outDirectory, { recursive: true });
await cp(clientDirectory, outDirectory, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const runtime = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function render(pathname) {
  const response = await worker.fetch(
    new Request(`https://static.local${pathname}`, {
      headers: { accept: "text/html" },
    }),
    runtime,
    executionContext,
  );

  if (!response.ok) {
    throw new Error(`Static render failed for ${pathname}: ${response.status}`);
  }

  return response.text();
}

await writeFile(new URL("index.html", outDirectory), await render("/"));
await mkdir(new URL("merci/", outDirectory), { recursive: true });
await writeFile(
  new URL("merci/index.html", outDirectory),
  await render("/merci"),
);

for (const asset of ["robots.txt", "sitemap.xml"]) {
  const response = await worker.fetch(
    new Request(`https://static.local/${asset}`),
    runtime,
    executionContext,
  );
  if (response.ok) {
    await writeFile(new URL(asset, outDirectory), await response.text());
  }
}

await writeFile(
  new URL("_redirects", outDirectory),
  "/merci /merci/index.html 200\n/* /index.html 404\n",
);

console.log(`Static site exported to ${outDirectory.pathname}`);
