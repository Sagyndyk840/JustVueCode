import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { IUser, IUserCreateData } from '@/shared/types/user'
import { userApi } from '@/entities/User/api'
import { useNotify } from '@/shared/lib/use/useNotify.ts'
import { getFromLocalStorage, saveToLocalStorage } from '@/shared/lib/utils/localStorage.ts'

const NAMESPACE = 'user'

interface FetchUsersParams {
  page?: number
  limit?: number
  search?: string
}

export const useUserStore = defineStore(NAMESPACE, () => {
  const { notify } = useNotify()

  const users = ref<IUser[]>([])
  const isLoading = ref(false)
  const totalUsers = ref(0)

  const page = ref(getFromLocalStorage<number>(NAMESPACE, 'page', 1))
  const limit = ref(getFromLocalStorage<number>(NAMESPACE, 'limit', 5))
  const searchQuery = ref(getFromLocalStorage<string>(NAMESPACE, 'searchQuery', ''))

  const totalPages = computed(() =>
    Math.ceil(totalUsers.value / limit.value),
  )

  watch(page, (newValue: number) => {
    saveToLocalStorage<number>(NAMESPACE, 'page', newValue)
  })

  watch(limit, (newValue: number) => {
    saveToLocalStorage<number>(NAMESPACE, 'limit', newValue)
  })

  watch(searchQuery, (newValue: string) => {
    saveToLocalStorage<string>(NAMESPACE, 'searchQuery', newValue)
  })

  const fetchUsers = async (params?: FetchUsersParams) => {
    try {
      isLoading.value = true
      const { data, total } = await userApi.getUsersList({
        page: params?.page ?? page.value,
        limit: params?.limit ?? limit.value,
        search: params?.search ?? searchQuery.value,
      })
      users.value = data
      totalUsers.value = total
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при загрузке пользователей'
      notify(message, 'error')
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserById = async (id: string | number) => {
    try {
      isLoading.value = true
      return await userApi.getUserById(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при загрузке пользователя'
      notify(message, 'error')
    } finally {
      isLoading.value = false
    }
  }

  const createUser = async (userData: IUserCreateData) => {
    try {
      isLoading.value = true
      await userApi.createUser(userData)
      await fetchUsers()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при создании пользователя'
      notify(message, 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUser = async (id: string | number, userData: Partial<IUser>) => {
    try {
      isLoading.value = true
      await userApi.updateUser(id, userData)
      await fetchUsers()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при обновлении пользователя'
      notify(message, 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resetPagination = async () => {
    page.value = 1
    searchQuery.value = ''
    await fetchUsers()
  }

  return {
    users,
    isLoading,
    totalUsers,

    page,
    limit,
    searchQuery,
    totalPages,

    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    resetPagination,
  }
})
