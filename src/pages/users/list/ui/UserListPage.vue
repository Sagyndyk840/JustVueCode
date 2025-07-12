<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { UserModel } from '@/entities/User'
import BasePagination from '@/shared/ui/UI/BasePagination/BasePagination.vue'
import { UserTable } from '@/widgets/User/UserTable'
import { UserAction } from '@/widgets/User/UserAction'

const userStore = UserModel.useUserStore()
const { totalPages, page } = storeToRefs(userStore)

const handlePageChange = (newPage: number) => {
  userStore.page = newPage
}

watch(
  [() => userStore.page],
  () => {
    userStore.fetchUsers()
  },
  { immediate: true },
)
</script>

<template>
  <div class="user">
    <UserAction />

    <UserTable />

    <BasePagination
        v-if="totalPages > 1"
        :page="page"
        :totalPages="totalPages"
        @change="handlePageChange"
    />
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
