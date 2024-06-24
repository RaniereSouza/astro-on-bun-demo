<template>
  <div class="theme-switcher-outer">
    <div class="theme-switcher-wrapper">
      <button :class="currentTheme" @click="toggleTheme">
        <span class="light-theme-icon">☀️</span>
        &nbsp;&nbsp;
        <span class="dark-theme-icon">🌙</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, type PropType } from 'vue';
  import { getShared } from '../lib/shared';

  type Theme = 'dark' | 'light';

  //>>> Vue component emitted events cannot be reached externally on Astro! <<<//
  // const emit = defineEmits<{
  //   (e: 'switch-theme', value: boolean): void,
  // }>();

  // function emit(eventName: string, eventPayload: unknown) {
  //   document.dispatchEvent(new CustomEvent(eventName, {detail: eventPayload}));
  // }

  const { initialTheme } = defineProps({
    initialTheme: {
      type: String as PropType<Theme>,
      default: 'dark',
    },
  });

  const currentTheme = ref(initialTheme);
  watch(currentTheme, () => {
    // emit('switch-theme', currentTheme.value);
    const onThemeSwitched = getShared('onThemeSwitched');
    (typeof onThemeSwitched === 'function') && onThemeSwitched(currentTheme.value);
  }, {immediate: true});

  function toggleTheme() {
    if (currentTheme.value === 'light') currentTheme.value = 'dark';
    else if (currentTheme.value === 'dark') currentTheme.value = 'light';
  }
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
    padding: .5rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
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
