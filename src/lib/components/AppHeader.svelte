<script lang="ts">
  import DocumentActions from './DocumentActions.svelte';
  import DonationBanner from './DonationBanner.svelte';
  import Icon from './Icon.svelte';
  import Logo from './Logo.svelte';

  const PACKAGE_NAME = '@richardmcquiston01/material-colors-grid';
  const NPM_URL = `https://www.npmjs.com/package/${PACKAGE_NAME}`;
</script>

<header class="shrink-0 bg-brand-700 text-white">
  <div
    class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-6
      py-2.5"
  >
    <div class="flex min-w-0 items-center gap-3">
      <Logo class="h-9 w-9 shrink-0 rounded-md shadow-sm" />
      <div>
        <h1 class="text-xl leading-tight font-bold">
          Material Colors Grid Generator
        </h1>
        <a
          href={NPM_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="View the {PACKAGE_NAME} package on npm"
          class="inline-flex items-center gap-1 text-xs text-brand-100
            underline-offset-2 hover:text-white hover:underline
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-white"
        >
          <Icon name="package" class="h-3.5 w-3.5" />
          {PACKAGE_NAME}
        </a>
      </div>
    </div>

    <!-- Takes the open space between the title and the actions; wraps to its
         own row when the header is too narrow for all three. -->
    <div class="flex min-w-64 flex-1 basis-64 justify-center">
      <DonationBanner />
    </div>

    <div class="max-w-full min-w-0">
      <DocumentActions />
    </div>
  </div>
</header>
