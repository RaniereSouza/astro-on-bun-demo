<template>
  <div class="theme-switcher-outer">
    <div class="theme-switcher-wrapper">
      <button :class="currentTheme" @click="toggleTheme">
        <span class="light-theme-icon">☀️</span>
        <span class="dark-theme-icon">🌙</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  type Theme = 'dark' | 'light';

  const currentTheme = ref<Theme>('dark');
  // [ERROR] const currentTheme = ref((document.documentElement.dataset.theme || 'dark') as Theme); [ERROR]
  // We cannot use the "document" global outside of an event handler function or a lifecycle hook, partial hydration throws error;
  // If the component was added to the Astro template with the directive "client:only", then it would work

  function toggleTheme() {
    if (currentTheme.value === 'light') currentTheme.value = 'dark';
    else if (currentTheme.value === 'dark') currentTheme.value = 'light';
    document.documentElement.dataset.theme = currentTheme.value;
  }

  onMounted(() => {
    currentTheme.value = (document.documentElement.dataset.theme || 'dark') as Theme;
  })
</script>

<style scoped>
  * {
    box-sizing: border-box;
    transition: all var(--std-animation-time);
  }

  .theme-switcher-outer {
    --theme-switcher-btn-size: 3.25rem;

    position: absolute;
    top: 2rem;
    right: 3rem;
  }

  .theme-switcher-wrapper {
    position: relative;
  }

  button {
    padding: .5rem .75rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    height: var(--theme-switcher-btn-size);
    border-radius: calc(var(--theme-switcher-btn-size) / 2); 
    outline: none;
    background-color: transparent;
    position: relative;
    z-index: 1;
    border: 1px solid rgba(var(--accent-primary), 75);
    color: rgba(var(--accent-primary), 75);
    cursor: pointer;
  }

  .theme-switcher-wrapper::before {
    content: "";
    height: calc(var(--theme-switcher-btn-size) - 1px);
    width: calc(var(--theme-switcher-btn-size) - 1px);
    border-radius: 50%;
    position: absolute;
    top: 0;
    z-index: 0;
    background-color: rgba(var(--accent-primary), 75);
  }

  .theme-switcher-wrapper:has(button.dark)::before {
    left: auto;
    right: 0;
  }

  .theme-switcher-wrapper:has(button.light)::before {
    left: 0;
    right: auto;
  }

  .dark-theme-icon {
    filter: grayscale(80%);
  }

  .dark-theme-icon, .light-theme-icon {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
  }

  button.light .dark-theme-icon, button.dark .light-theme-icon {
    opacity: 50%;
  }

  button:hover .dark-theme-icon, button:hover .light-theme-icon {
    opacity: 100%;
  }
</style>
