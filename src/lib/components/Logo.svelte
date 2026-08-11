<script lang="ts">
  // The brand mark: a 2x2 grid of colour swatches echoing the app's output.
  // Decorative — the adjacent <h1> provides the accessible name — so it is
  // hidden from assistive tech. Mirrors the palette of the favicon.
  let { class: className = '' }: { class?: string } = $props();
</script>

<svg
  viewBox="0 0 32 32"
  class={className}
  aria-hidden="true"
  focusable="false"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="32" height="32" rx="7" fill="#ffffff" />
  <rect x="6" y="6" width="9" height="9" rx="2" fill="#a5d6a7" />
  <rect x="17" y="6" width="9" height="9" rx="2" fill="#43a047" />
  <rect x="6" y="17" width="9" height="9" rx="2" fill="#2e7d32" />
  <rect x="17" y="17" width="9" height="9" rx="2" fill="#1b5e20" />
</svg>
