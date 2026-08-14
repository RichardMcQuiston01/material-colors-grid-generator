<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import DonationBanner from '$lib/components/DonationBanner.svelte';
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  let { children } = $props();

  // Vercel Web Analytics (no-op off Vercel; only reports in production).
  injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
<DonationBanner />
