<script lang="ts">
  import Tabs from './Tabs.svelte';

  type TabId = 'one' | 'two' | 'three';
  const tabs: { id: TabId; label: string }[] = [
    { id: 'one', label: 'One' },
    { id: 'two', label: 'Two' },
    { id: 'three', label: 'Three' },
  ];
  let active = $state<TabId>('one');
</script>

<Tabs {tabs} label="Example tabs" bind:active>
  {#snippet panel(id)}
    <p>Panel for {id}</p>
  {/snippet}
</Tabs>
