<script setup lang="ts">
import { useNotify } from '@/shared/lib/use/useNotify.ts'

const { notifications, removeNotification } = useNotify()

</script>

<template>
  <div class="notify-wrapper">
    <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notify"
        :class="`notify--${notification.type}`"
        @click="removeNotification(notification.id)"
    >
      <span class="notify__message">{{ notification.message }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
