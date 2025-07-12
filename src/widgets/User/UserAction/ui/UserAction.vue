<script setup lang="ts">
import BaseButton from '@/shared/ui/UI/BaseButton/BaseButton.vue'
import { UserSearch } from '@/features/User'
</script>

<template>
  <div class="user-action">
    <RouterLink :to="{ name: 'UserCreatePage' }">
      <BaseButton
          variant="primary"
          size="medium"
          class="user-action__btn"
      >
        Создать
      </BaseButton>
    </RouterLink>
    <UserSearch />
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>

