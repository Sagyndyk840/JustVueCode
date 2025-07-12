<script setup lang="ts">
import BaseButton from '@/shared/ui/UI/BaseButton/BaseButton.vue'
import BaseSelect from '@/shared/ui/UI/BaseSelect/BaseSelect.vue'
import ValidatedInput from '@/shared/ui/Form/ValidatedInput/ValidatedInput.vue'
import BaseCard from '@/shared/ui/UI/BaseCard/BaseCard.vue'
import { UserModel } from '@/entities/User'
import type { IUserStatus } from '@/shared/types/base.ts'
import type { IUser } from '@/shared/types/user.ts'
import { useFormValidation } from '@/shared/lib/use/useForm.ts'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNotify } from '@/shared/lib/use/useNotify.ts'
import { router } from '@/app/providers'

const { notify } = useNotify()
const userStore = UserModel.useUserStore()
const route = useRoute()

const user = ref<IUser>()

onMounted(async () => {
  user.value = await userStore.fetchUserById(Number(route.params.id))
})

const { values, errors, validateForm, validateField } = useFormValidation(
  () => ({
    fullName: user.value?.fullName ?? '',
    email: user.value?.email ?? '',
    status: user.value?.status ?? 'active' as IUserStatus,
  }),
  {
    fullName: 'required|minLength:2',
    email: 'required|email',
    status: 'required',
  },
)

const onSubmit = async () => {
  if (!validateForm()) return
  try {
    await userStore.updateUser(Number(route.params.id), values.value)
    notify('Данные пользователя успешно обновлены', 'success')
    router.push({ name: 'UserListPage' })
  } catch {
  }
}
</script>

<template>
  <BaseCard class="user-edit-form">
    <h2 class="user-edit-form__title">Редактировать пользователя</h2>

    <form @submit.prevent="onSubmit">
      <ValidatedInput
          v-model="values.fullName"
          :placeholder="'Введите ФИО'"
          :error="errors.fullName"
          field-name="fullName"
          label="ФИО"
          @blur="validateField"
      />

      <ValidatedInput
          v-model="values.email"
          type="email"
          :placeholder="'Введите email'"
          :error="errors.email"
          field-name="email"
          label="Email"
          @blur="validateField"
      />

      <BaseSelect
          v-model="values.status"
          label="Статус"
          @blur="validateField"
      >
        <option value="active">Активен</option>
        <option value="blocked">Заблокирован</option>
      </BaseSelect>

      <div class="user-edit-form__btn">
        <BaseButton type="submit">
          Сохранить изменения
        </BaseButton>
        <RouterLink :to="{ name: 'UserListPage' }">
          <BaseButton type="button">
            Назад
          </BaseButton>
        </RouterLink>
      </div>
    </form>
  </BaseCard>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
