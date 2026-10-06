<script lang="ts" generics="TabId extends string">
  import type { Snippet } from 'svelte';

  interface TabDefinition {
    id: TabId;
    label: string;
  }

  let {
    tabs,
    label,
    active = $bindable(),
    panel,
  }: {
    tabs: TabDefinition[];
    /** Accessible name for the tab list. */
    label: string;
    active: TabId;
    /** Renders the content of the active tab. */
    panel: Snippet<[TabId]>;
  } = $props();

  const idPrefix = $props.id();
  const tabButtons: Record<string, HTMLButtonElement | undefined> = {};

  function select(id: TabId, moveFocus = false): void {
    active = id;
    if (moveFocus) tabButtons[id]?.focus();
  }

  // WAI-ARIA tabs pattern: arrows move between tabs (wrapping), Home/End jump
  // to the ends, and focus activates the tab.
  function onKeydown(event: KeyboardEvent): void {
    const index = tabs.findIndex((tab) => tab.id === active);
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        next = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(tabs[next].id, true);
  }
</script>

<div class="flex min-h-0 flex-1 flex-col">
  <div
    role="tablist"
    aria-label={label}
    tabindex="-1"
    onkeydown={onKeydown}
    class="flex shrink-0 gap-1 overflow-x-auto border-b border-gray-200 px-3 pt-2"
  >
    {#each tabs as tab (tab.id)}
      {@const selected = tab.id === active}
      <button
        bind:this={tabButtons[tab.id]}
        type="button"
        role="tab"
        id="{idPrefix}-tab-{tab.id}"
        aria-selected={selected}
        aria-controls="{idPrefix}-panel"
        tabindex={selected ? 0 : -1}
        onclick={() => select(tab.id)}
        class="-mb-px shrink-0 rounded-t-md border-b-2 px-3 py-2 text-sm
          font-medium whitespace-nowrap transition-colors
          focus-visible:outline-2 focus-visible:-outline-offset-2
          focus-visible:outline-brand-700 {selected
          ? 'border-brand-700 text-brand-700'
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div
    role="tabpanel"
    id="{idPrefix}-panel"
    aria-labelledby="{idPrefix}-tab-{active}"
    tabindex="-1"
    class="min-h-0 flex-1 overflow-y-auto p-5"
  >
    {@render panel(active)}
  </div>
</div>
