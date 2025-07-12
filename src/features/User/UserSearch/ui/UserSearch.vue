<script setup lang="ts">
import { UserModel } from '@/entities/User'
import BaseButton from '@/shared/ui/UI/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/ui/UI/BaseInput/BaseInput.vue'
import { storeToRefs } from 'pinia'

const userStore = UserModel.useUserStore()
const { searchQuery } = storeToRefs(userStore)

const handleSearch = () => {
  userStore.page = 1
  userStore.fetchUsers()
}

const clearSearch = () => {
  userStore.searchQuery = ''
  userStore.page = 1
  userStore.fetchUsers()
}
</script>

<template>
  <div class="user-search">
    <BaseInput
        v-model.trim="searchQuery"
        placeholder="Поиск по имени или email"
        class="user-search__input"
        @keyup.enter="handleSearch"
    />
    <BaseButton
        variant="primary"
        size="medium"
        class="user-search__button"
        @click="handleSearch"
    >
      Найти
    </BaseButton>
    <BaseButton
        variant="secondary"
        size="medium"
        class="user-search__button"
        @click="clearSearch"
    >
      Сбросить
    </BaseButton>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
