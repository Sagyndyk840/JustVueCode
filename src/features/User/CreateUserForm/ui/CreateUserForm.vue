<script setup lang="ts">
import ValidatedInput from '@/shared/ui/Form/ValidatedInput/ValidatedInput.vue'
import BaseButton from '@/shared/ui/UI/BaseButton/BaseButton.vue'
import BaseSelect from '@/shared/ui/UI/BaseSelect/BaseSelect.vue'
import { useFormValidation } from '@/shared/lib/use/useForm.ts'
import { useUserStore } from '@/entities/User/model'
import BaseCard from '@/shared/ui/UI/BaseCard/BaseCard.vue'
import type { IUserStatus } from '@/shared/types/base.ts'
import { router } from '@/app/providers'
import { useNotify } from '@/shared/lib/use/useNotify.ts'

const { notify } = useNotify()
const userStore = useUserStore()

const { values, errors, validateForm, validateField, resetForm } = useFormValidation(
  {
    fullName: '',
    email: '',
    status: 'active' as IUserStatus,
  },
  {
    fullName: 'required|minLength:2',
    email: 'required|email',
    status: 'required',
  },
)

const onSubmit = async () => {
  if (!validateForm()) return
  try {
    const isSuccess = await userStore.createUser(values.value)
    if (isSuccess) {
      notify('Пользователь успешно создан', 'success')
      await resetForm()
      router.push({ name: 'UserListPage' })
    }
  } catch {
  }
}
</script>

<template>
  <BaseCard class="user-create-form">
    <h2 class="user-create-form__title">Создать пользователя</h2>

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

      <div class="user-create-form__btn">
        <BaseButton type="submit">
          Создать пользователя
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
