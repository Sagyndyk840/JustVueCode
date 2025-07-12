<script setup lang="ts">
import BaseCard from '@/shared/ui/UI/BaseCard/BaseCard.vue'
import BaseStatusBadge from '@/shared/ui/UI/BaseStatusBadge/BaseStatusBadge.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { UserModel } from '@/entities/User'
import type { IUser } from '@/shared/types/user.ts'

const userStore = UserModel.useUserStore()
const route = useRoute()
const user = ref<IUser>()

onMounted(async () => {
  user.value = await userStore.fetchUserById(Number(route.params.id))
})
</script>

<template>
  <div class="user-profile">
    <h1 class="user-profile__title">Профиль пользователя</h1>

    <BaseCard v-if="user" class="user-profile__card">
      <div class="user-profile__info">
        <div class="user-profile__info-item">
          <span class="user-profile__label">ID:</span>
          <span class="user-profile__value">{{ user.id }}</span>
        </div>

        <div class="user-profile__info-item">
          <span class="user-profile__label">ФИО:</span>
          <span class="user-profile__value">{{ user.fullName }}</span>
        </div>

        <div class="user-profile__info-item">
          <span class="user-profile__label">Email:</span>
          <span class="user-profile__value">{{ user.email }}</span>
        </div>

        <div class="user-profile__info-item">
          <span class="user-profile__label">Статус:</span>
          <span class="user-profile__value">
            <BaseStatusBadge :status="user.status" />
          </span>
        </div>
      </div>
    </BaseCard>

    <div v-else class="user-profile__loading">
      Загрузка данных пользователя...
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">

</style>
