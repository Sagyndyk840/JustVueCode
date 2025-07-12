<script setup lang="ts">
import BaseInput from '@/shared/ui/UI/BaseInput/BaseInput.vue'

interface IValidatedInputProps {
  type?: string
  placeholder?: string
  error?: string
  fieldName?: string
  disabled?: boolean
  label?: string
}

const model = defineModel<string>({
  default: '',
  required: false,
})

const props = defineProps<IValidatedInputProps>()

const emit = defineEmits<{
  (e: 'blur', field?: string): void
}>()

const handleBlur = () => {
  emit('blur', props.fieldName)
}

</script>

<template>
  <div class="validated-input">
    <BaseInput
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{ 'error': error }"
        :label="label"
        @blur="handleBlur"
    />
    <Transition name="fade">
      <div v-if="error" class="validated-input__error">
        {{ error }}
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
