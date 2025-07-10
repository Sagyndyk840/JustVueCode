<script setup lang="ts">
defineProps<{
  columns: {
    key: string
    title: string
  }[]
  items: Record<string, string | number>[]
  isLoading?: boolean
}>()
</script>

<template>
  <div class="table-responsive">
    <table class="data-table">
      <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{ col.title }}
        </th>
      </tr>
      </thead>
      <tbody v-if="!isLoading">
      <tr v-for="(item, i) in items" :key="i">
        <td v-for="col in columns" :key="col.key">
          {{ item[col.key] }}
        </td>
      </tr>
      <tr v-if="items.length === 0">
        <td :colspan="columns.length" class="empty-message">
          Нет данных для отображения
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td :colspan="columns.length" class="loading-message">
          <span class="loader"></span>
          Загрузка...
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss" src="styles.scss">
</style>
