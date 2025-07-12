<script setup lang="ts">
import BaseTable from '@/shared/ui/UI/BaseTable/BaseTable.vue'
import { UserModel } from '@/entities/User'
import { storeToRefs } from 'pinia'
import BaseStatusBadge from '@/shared/ui/UI/BaseStatusBadge/BaseStatusBadge.vue'
import type { IUserStatus } from '@/shared/types/base.ts'

const userStore = UserModel.useUserStore()
const { users, isLoading } = storeToRefs(userStore)

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'fullName', title: 'Имя' },
  { key: 'email', title: 'Email' },
  { key: 'status', title: 'Статус', slotName: 'status' },
]
</script>

<template>
  <div class="user-list-table">
    <BaseTable
        class="user-list-table__table"
        :columns="columns"
        :items="users"
        :is-loading="isLoading"
    >
      <template #status="{ value }">
        <BaseStatusBadge :status="value as IUserStatus" />
      </template>

      <template #actions="{ item }">
        <RouterLink :to="{ name: 'UserProfilePage', params: { id: item.id } }">
          👁
        </RouterLink>
        <RouterLink :to="{ name: 'UserEditPage', params: { id: item.id } }">
          ✏️
        </RouterLink>
      </template>
    </BaseTable>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
