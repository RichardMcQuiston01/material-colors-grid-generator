<script lang="ts">
  import { documentStore } from '$lib/document.svelte';

  const style = $derived(documentStore.current.style);

  const labelClass = 'block text-sm font-medium text-gray-700';
  const inputClass =
    'mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm ' +
    'shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 ' +
    'focus:ring-brand-600';
</script>

<section aria-labelledby="style-heading" class="flex flex-col gap-4">
  <h2 id="style-heading" class="text-lg font-semibold text-gray-900">
    Output Style
  </h2>

  <div class="grid grid-cols-2 gap-3">
    <label>
      <span class={labelClass}>Orientation</span>
      <select bind:value={style.orientation} class={inputClass}>
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
      </select>
    </label>

    <label>
      <span class={labelClass}>Aspect ratio</span>
      <input bind:value={style.aspectRatio} class={inputClass} />
    </label>

    <label>
      <span class={labelClass}>Width (px)</span>
      <input
        type="number"
        min="1"
        bind:value={style.width}
        class={inputClass}
      />
    </label>

    <label>
      <span class={labelClass}>Height (px)</span>
      <input
        type="number"
        min="1"
        bind:value={style.height}
        class={inputClass}
      />
    </label>

    <label>
      <span class={labelClass}>Cards per row</span>
      <input
        type="number"
        min="1"
        bind:value={style.cardsPerRow}
        class={inputClass}
      />
    </label>

    <label>
      <span class={labelClass}>Card background</span>
      <div class="mt-1 flex items-center gap-2">
        <input
          type="color"
          bind:value={style.cardBackground}
          aria-label="Card background color"
          class="h-8 w-10 rounded border border-gray-300"
        />
        <input bind:value={style.cardBackground} class={inputClass} />
      </div>
    </label>
  </div>

  <fieldset class="rounded-md border border-gray-200 p-3">
    <legend class="px-1 text-sm font-medium text-gray-700">Card border</legend>
    <div class="flex flex-col gap-3">
      <label class="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          bind:checked={style.border.rounded}
          class="h-4 w-4 rounded border-gray-300 text-brand-700
            focus:ring-brand-600"
        />
        Rounded corners
      </label>

      <div class="grid grid-cols-2 gap-3">
        <label>
          <span class={labelClass}>Thickness</span>
          <input bind:value={style.border.thickness} class={inputClass} />
        </label>
        <label>
          <span class={labelClass}>Color</span>
          <div class="mt-1 flex items-center gap-2">
            <input
              type="color"
              bind:value={style.border.color}
              aria-label="Border color"
              class="h-8 w-10 rounded border border-gray-300"
            />
            <input bind:value={style.border.color} class={inputClass} />
          </div>
        </label>
      </div>
    </div>
  </fieldset>
</section>
