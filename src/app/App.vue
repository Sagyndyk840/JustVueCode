<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseNotify from '@/shared/ui/UI/BaseNotify/BaseNotify.vue'
</script>

<template>
  <main class="wrapper">
    <div class="container">
      <RouterView />
    </div>
  </main>
  <BaseNotify />
</template>

<style scoped>
</style>
