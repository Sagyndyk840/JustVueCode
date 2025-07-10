<script setup lang="ts">
import type { IUserStatus } from '@shared/types/base.ts'
import { computed } from 'vue'

const props = defineProps<{
  status: IUserStatus
}>()

const badgeClass = computed(() =>
  props.status === 'active'
    ? 'status-badge--active'
    : 'status-badge--blocked',
)
</script>

<template>
  <span class="status-badge" :class="badgeClass">
    {{ props.status }}
  </span>
</template>

<style scoped lang="scss" src="styles.scss">

</style>
