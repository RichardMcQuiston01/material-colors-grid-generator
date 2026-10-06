<script lang="ts" module>
  /** Names of the flat line icons available to {@link Icon}. */
  export type IconName =
    | 'download'
    | 'upload'
    | 'reset'
    | 'help'
    | 'package'
    | 'plus'
    | 'x'
    | 'copy'
    | 'check';

  // Static, trusted SVG fragments on a 24x24 grid, drawn as 2px round strokes
  // (flat style, no fills or gradients).
  const ICON_PATHS: Record<IconName, string> = {
    download:
      '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    upload: '<path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
    help:
      '<circle cx="12" cy="12" r="10"/>' +
      '<path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    package:
      '<path d="m21 8-9-5-9 5v8l9 5 9-5z"/><path d="m3 8 9 5 9-5"/>' +
      '<path d="M12 13v8"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    copy:
      '<rect x="9" y="9" width="11" height="11" rx="2"/>' +
      '<path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
  };
</script>

<script lang="ts">
  // Decorative: every icon sits next to a text label or inside a button that
  // has an accessible name, so it is hidden from assistive tech.
  let {
    name,
    class: className = 'h-4 w-4',
  }: { name: IconName; class?: string } = $props();
</script>

<svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="shrink-0 {className}"
  aria-hidden="true"
  focusable="false"
  data-icon={name}
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static constants above -->
  {@html ICON_PATHS[name]}
</svg>
