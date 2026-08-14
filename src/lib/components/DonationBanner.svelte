<script lang="ts">
  import { browser } from '$app/environment';
  import qrCode from '$lib/assets/donate-qr.svg';

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
  <div
    class="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-xs
      rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
    role="complementary"
    aria-label="Support this project"
  >
    <button
      type="button"
      onclick={dismiss}
      aria-label="Dismiss donation message"
      class="absolute right-1.5 top-1.5 rounded p-1 text-gray-500
        transition-colors hover:bg-gray-100 hover:text-gray-700
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-brand-700"
    >
      ✕
    </button>

    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-3 rounded-md pr-4 focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      <img
        src={qrCode}
        alt="QR code linking to the Stripe donation page"
        width="80"
        height="80"
        class="h-20 w-20 shrink-0 rounded border border-gray-200"
      />
      <span class="text-xs leading-snug text-gray-700">
        {message}
        <span class="mt-1 block font-medium text-brand-700"
          >Donate via Stripe →</span
        >
      </span>
    </a>
  </div>
{/if}
