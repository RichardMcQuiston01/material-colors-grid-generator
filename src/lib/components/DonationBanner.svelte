<script lang="ts">
  import { browser } from '$app/environment';
  import qrCode from '$lib/assets/donate-qr.svg';
  import Icon from './Icon.svelte';

  const DONATE_URL = 'https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800';
  const STORAGE_KEY = 'mcgg:donation-dismissed';

  const message =
    'If this app, code, or repository has helped you or someone you ' +
    'know, please consider donating. I appreciate any help to offset the ' +
    'costs of development and/or AI Credits.';

  // Remember dismissal across visits, mirroring the app's localStorage use.
  let dismissed = $state(
    browser ? localStorage.getItem(STORAGE_KEY) === '1' : false,
  );

  function dismiss() {
    dismissed = true;
    if (browser) localStorage.setItem(STORAGE_KEY, '1');
  }
</script>

{#if !dismissed}
  <!-- A horizontal card: QR code on the left, message and link on the right.
       Sits inline in the app header rather than floating over the page. -->
  <div
    class="relative flex w-full max-w-lg items-center rounded-lg bg-white p-1.5
      pr-4 text-gray-800 shadow-sm"
    role="complementary"
    aria-label="Support this project"
  >
    <button
      type="button"
      onclick={dismiss}
      aria-label="Dismiss donation message"
      title="Dismiss"
      class="absolute -top-2 -right-2 rounded-full border border-gray-200
        bg-white p-1 text-gray-500 shadow-sm transition-colors
        hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Icon name="x" class="h-3.5 w-3.5" />
    </button>

    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-3 rounded-md focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      <img
        src={qrCode}
        alt="QR code linking to the Stripe donation page"
        width="64"
        height="64"
        class="h-16 w-16 shrink-0 rounded border border-gray-200"
      />
      <span class="text-xs leading-snug text-gray-700">
        {message}
        <span class="font-medium whitespace-nowrap text-brand-700"
          >Donate via Stripe →</span
        >
      </span>
    </a>
  </div>
{/if}
