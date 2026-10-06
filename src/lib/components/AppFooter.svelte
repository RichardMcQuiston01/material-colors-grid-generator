<script lang="ts">
  const SITE_URL = 'https://richardmcquiston.com/';
  const REPO_URL =
    'https://github.com/RichardMcQuiston01/material-colors-grid-generator';

  const linkClass =
    'underline underline-offset-2 hover:text-brand-700 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-brand-700';
</script>

<footer class="shrink-0 border-t border-gray-200 bg-white">
  <div
    class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-1 px-6
      py-2 text-xs text-gray-600"
  >
    <p>
      &copy; 2026
      <a
        href={SITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        class={linkClass}>Richard McQuiston</a
      >. All rights reserved.
    </p>
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClass}>Source on GitHub</a
    >
  </div>
</footer>
