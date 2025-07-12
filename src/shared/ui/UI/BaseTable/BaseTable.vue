<script setup lang="ts">

interface IBaseTableProps {
  columns: {
    key: string
    title: string
    slotName?: string
  }[]
  items: Record<string, string | number>[]
  isLoading?: boolean
}

defineProps<IBaseTableProps>()
</script>

<template>
  <div class="table-responsive">
    <table class="data-table">
      <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{ col.title }}
        </th>
        <th v-if="$slots.actions">Действия</th>
      </tr>
      </thead>
      <tbody v-if="!isLoading">
      <tr v-for="(item, i) in items" :key="i">
        <td v-for="col in columns" :key="col.key">
          <slot v-if="col.slotName" :name="col.slotName" :item="item" :value="item[col.key]">
            {{ item[col.key] }}
          </slot>
          <template v-else>
            {{ item[col.key] }}
          </template>
        </td>
        <td v-if="$slots.actions">
          <slot name="actions" :item="item" />
        </td>
      </tr>
      <tr v-if="items.length === 0">
        <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="empty-message">
          Нет данных для отображения
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="loading-message">
          <span class="loader"></span>
          Загрузка...
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
