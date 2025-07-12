<script setup lang="ts">
interface IBaseSelectProps {
  disabled?: boolean
  label?: string
  fieldName?: string
}

const model = defineModel<string>({
  default: '',
  required: false,
})

defineProps<IBaseSelectProps>()

const emit = defineEmits<{
  (e: 'blur'): void
}>()

const onBlur = () => {
  emit('blur')
}
</script>

<template>
  <div class="select-wrapper">
    <label v-if="label" :for="fieldName" class="select-label">
      {{ label }}
    </label>
    <select
        :id="fieldName"
        v-model="model"
        :disabled="disabled"
        @blur="onBlur"
        class="select"
    >
      <slot />
    </select>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
