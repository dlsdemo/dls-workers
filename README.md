# DLS Demo

Cloudflare Pages project to illustrate and demo the Cloudflare Data Localization Suite (DLS) functionalities.

Developer Docs: https://developers.cloudflare.com/data-localization/

## Headers

Workers URL: [headers.dls-demo.workers.dev](https://headers.dls-demo.workers.dev/)

Domain: [headers.dlsdemo.com](https://headers.dlsdemo.com/)

The Cloudflare Workers code to return all `headers` as `application/json` is: 

```
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Modify and return headers
  const headers = new Headers(request.headers);
  // Add or modify any headers as needed
  headers.set('Custom-Header', 'Hello World!!');
  // Add Cloudflare headers
  const cf = request.cf;
  // Prepare the response object
  const response = new Response(JSON.stringify({ headers: Object.fromEntries(headers), cf }, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Max-Age', '86400');
  // Return response
  return response;
}
```
