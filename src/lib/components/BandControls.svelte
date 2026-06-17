<script lang="ts">
  import { documentStore } from '$lib/document.svelte';

  const style = $derived(documentStore.current.style);
  const bands = $derived([
    { key: 'header', label: 'Header', band: style.header },
    { key: 'footer', label: 'Footer', band: style.footer },
  ]);

  const labelClass = 'block text-sm font-medium text-gray-700';
  const inputClass =
    'mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm ' +
    'shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 ' +
    'focus:ring-brand-600';
</script>

<section aria-labelledby="bands-heading" class="flex flex-col gap-4">
  <div>
    <h2 id="bands-heading" class="text-lg font-semibold text-gray-900">
      Header &amp; Footer
    </h2>
    <p class="text-sm text-gray-500">Leave text empty to hide a band.</p>
  </div>

  {#each bands as { key, label, band } (key)}
    <fieldset class="rounded-md border border-gray-200 p-3">
      <legend class="px-1 text-sm font-medium text-gray-700">{label}</legend>
      <div class="flex flex-col gap-3">
        <label>
          <span class={labelClass}>Text</span>
          <input
            bind:value={band.text}
            placeholder="(hidden)"
            class={inputClass}
          />
        </label>

        <div class="grid grid-cols-2 gap-3">
          <label>
            <span class={labelClass}>Background</span>
            <div class="mt-1 flex items-center gap-2">
              <input
                type="color"
                bind:value={band.background}
                aria-label="{label} background color"
                class="h-8 w-10 rounded border border-gray-300"
              />
              <input bind:value={band.background} class={inputClass} />
            </div>
          </label>
          <label>
            <span class={labelClass}>Font color</span>
            <input
              type="color"
              bind:value={band.font.color}
              aria-label="{label} font color"
              class="mt-1 h-9 w-full rounded border border-gray-300"
            />
          </label>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label>
            <span class={labelClass}>Font</span>
            <input bind:value={band.font.family} class={inputClass} />
          </label>
          <label>
            <span class={labelClass}>Size</span>
            <input bind:value={band.font.size} class={inputClass} />
          </label>
        </div>
      </div>
    </fieldset>
  {/each}
</section>
