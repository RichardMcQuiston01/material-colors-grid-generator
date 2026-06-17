<script lang="ts">
  import { documentStore } from '$lib/document.svelte';
  import {
    createCategory,
    createColor,
    createSubCategory,
  } from '$lib/factories';
  import type { Color } from '$lib/types';

  const doc = $derived(documentStore.current);

  const inputClass =
    'rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm ' +
    'focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600';
  const addBtnClass =
    'rounded-md border border-brand-700 px-3 py-1 text-sm font-medium ' +
    'text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-brand-700';
  const removeBtnClass =
    'rounded p-1 text-gray-400 transition-colors hover:bg-red-50 ' +
    'hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600';
</script>

{#snippet colorList(colors: Color[], context: string)}
  <ul class="flex flex-col gap-2">
    {#each colors as color, i (color.id)}
      <li class="flex items-center gap-2">
        <input
          type="color"
          bind:value={color.hex}
          aria-label="{color.name} hex value"
          class="h-8 w-9 shrink-0 rounded border border-gray-300"
        />
        <input
          bind:value={color.name}
          aria-label="Color name"
          placeholder="Name"
          class="{inputClass} min-w-0 flex-1"
        />
        <input
          bind:value={color.hex}
          aria-label="Hex code"
          class="{inputClass} w-24"
        />
        <button
          type="button"
          onclick={() => colors.splice(i, 1)}
          title="Remove color"
          aria-label="Remove color {color.name}"
          class={removeBtnClass}
        >
          ✕
        </button>
      </li>
    {/each}
  </ul>
  <button
    type="button"
    onclick={() => colors.push(createColor('New color', '#888888'))}
    class="{addBtnClass} mt-2 self-start"
    title="Add a color to {context}"
  >
    + Add color
  </button>
{/snippet}

<section aria-labelledby="colors-heading" class="flex flex-col gap-4">
  <h2 id="colors-heading" class="text-lg font-semibold text-gray-900">
    Colors
  </h2>

  {#each doc.categories as category, ci (category.id)}
    <div class="rounded-lg border border-gray-200 p-4">
      <div class="mb-3 flex items-center gap-2">
        <input
          bind:value={category.name}
          aria-label="Category name"
          class="{inputClass} flex-1 font-medium"
        />
        <button
          type="button"
          onclick={() => doc.categories.splice(ci, 1)}
          disabled={doc.categories.length === 1}
          title="Remove category"
          aria-label="Remove category {category.name}"
          class="{removeBtnClass} disabled:cursor-not-allowed
            disabled:opacity-40"
        >
          ✕
        </button>
      </div>

      {@render colorList(category.colors, category.name)}

      <div class="mt-4 flex flex-col gap-3 border-l-2 border-brand-100 pl-3">
        {#each category.subCategories as sub, si (sub.id)}
          <div class="rounded-md bg-gray-50 p-3">
            <div class="mb-2 flex items-center gap-2">
              <input
                bind:value={sub.name}
                aria-label="Sub-category name"
                class="{inputClass} flex-1 text-sm font-medium"
              />
              <button
                type="button"
                onclick={() => category.subCategories.splice(si, 1)}
                title="Remove sub-category"
                aria-label="Remove sub-category {sub.name}"
                class={removeBtnClass}
              >
                ✕
              </button>
            </div>
            {@render colorList(sub.colors, sub.name)}
          </div>
        {/each}

        <button
          type="button"
          onclick={() =>
            category.subCategories.push(createSubCategory('New sub-category'))}
          class="{addBtnClass} self-start"
          title="Add a sub-category to {category.name}"
        >
          + Add sub-category
        </button>
      </div>
    </div>
  {/each}

  <button
    type="button"
    onclick={() => doc.categories.push(createCategory('New category'))}
    class="{addBtnClass} self-start"
    title="Add a category"
  >
    + Add category
  </button>
</section>
