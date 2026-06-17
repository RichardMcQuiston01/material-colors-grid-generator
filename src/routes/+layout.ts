// Pure client-side SPA: disable SSR so canvas/localStorage code runs only in
// the browser, and skip prerendering in favour of the adapter-static fallback.
export const ssr = false;
export const prerender = false;
