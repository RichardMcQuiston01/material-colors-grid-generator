<script lang="ts">
  import { documentStore } from '$lib/document.svelte';

  const fonts = $derived(documentStore.current.style.fonts);
  const cardAuto = $derived(fonts.card.color === 'auto');

  const labelClass = 'block text-sm font-medium text-gray-700';
  const inputClass =
    'mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm ' +
    'shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 ' +
    'focus:ring-brand-600';

  function setCardAuto(useAuto: boolean) {
    fonts.card.color = useAuto ? 'auto' : '#000000';
  }
</script>

<section aria-labelledby="font-heading" class="flex flex-col gap-4">
  <h2 id="font-heading" class="text-lg font-semibold text-gray-900">Fonts</h2>

  {#each [{ key: 'category', label: 'Category header', font: fonts.category }, { key: 'subCategory', label: 'Sub-category header', font: fonts.subCategory }] as level (level.key)}
    <fieldset class="rounded-md border border-gray-200 p-3">
      <legend class="px-1 text-sm font-medium text-gray-700">
        {level.label}
      </legend>
      <div class="grid grid-cols-3 gap-3">
        <label>
          <span class={labelClass}>Font</span>
          <input bind:value={level.font.family} class={inputClass} />
        </label>
        <label>
          <span class={labelClass}>Color</span>
          <input
            type="color"
            bind:value={level.font.color}
            aria-label="{level.label} color"
            class="mt-1 h-9 w-full rounded border border-gray-300"
          />
        </label>
        <label>
          <span class={labelClass}>Size</span>
          <input bind:value={level.font.size} class={inputClass} />
        </label>
      </div>
    </fieldset>
  {/each}

  <fieldset class="rounded-md border border-gray-200 p-3">
    <legend class="px-1 text-sm font-medium text-gray-700">Color card</legend>
    <div class="grid grid-cols-3 gap-3">
      <label>
        <span class={labelClass}>Font</span>
        <input bind:value={fonts.card.family} class={inputClass} />
      </label>
      <label>
        <span class={labelClass}>Size</span>
        <input bind:value={fonts.card.size} class={inputClass} />
      </label>
      <div>
        <span class={labelClass}>Color</span>
        <label class="mt-1 flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={cardAuto}
            onchange={(e) => setCardAuto(e.currentTarget.checked)}
            class="h-4 w-4 rounded border-gray-300 text-brand-700
              focus:ring-brand-600"
          />
          Auto (use hex)
        </label>
        {#if !cardAuto}
          <input
            type="color"
            bind:value={fonts.card.color}
            aria-label="Card font color"
            class="mt-2 h-9 w-full rounded border border-gray-300"
          />
        {/if}
      </div>
    </div>
  </fieldset>
</section>
