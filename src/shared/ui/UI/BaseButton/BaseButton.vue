<script setup lang="ts">
import { computed } from 'vue'

interface IBaseButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'text'
  size?: 'small' | 'medium' | 'large'
  block?: boolean
}

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  type: 'button',
  disabled: false,
  variant: 'primary',
  size: 'medium',
  block: false,
})

const buttonClass = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--disabled': props.disabled,
    'btn--block': props.block,
  },
])
</script>

<template>
  <button
      :type="type || 'button'"
      :disabled="disabled"
      :class="buttonClass"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
