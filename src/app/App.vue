<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import BaseTable from '@/shared/ui/UI/BaseTable/BaseTable.vue'
const isLoading = ref(false)

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Имя' },
  { key: 'email', title: 'Email' },
]

const items = ref([
  { id: 1, name: 'Айбек', email: 'aibek@mail.kz' },
  { id: 2, name: 'Анель', email: 'anel@mail.kz' },
])

</script>

<template>
  <RouterView />
  <BaseTable
      :columns="columns"
      :items="items"
      :is-loading="isLoading"
  />
</template>

<style scoped>
</style>
