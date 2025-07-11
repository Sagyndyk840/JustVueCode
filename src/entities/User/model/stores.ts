import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUser, IUserCreateData } from '@/shared/types/user'
import { userApi } from '@/entities/User/api'

const NAMESPACE = 'user'

export const useUserStore = defineStore(NAMESPACE, () => {
  const users = ref<IUser[]>([])
  const currentUser = ref<IUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const totalUsers = ref(0)

  const activeUsers = computed(() =>
    users.value.filter(user => user.status === 'active'),
  )

  const blockedUsers = computed(() =>
    users.value.filter(user => user.status === 'blocked'),
  )

  const fetchUsers = async (params?: {
        page?: number
        limit?: number
        search?: string
    }) => {
    try {
      isLoading.value = true
      const { data, total } = await userApi.getUsersList(params || {})
      users.value = data
      totalUsers.value = total
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserById = async (id: string | number) => {
    try {
      isLoading.value = true
      currentUser.value = await userApi.getUserById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user'
    } finally {
      isLoading.value = false
    }
  }

  const createUser = async (userData: IUserCreateData) => {
    try {
      isLoading.value = true
      const newUser = await userApi.createUser(userData)
      users.value.unshift(newUser)
      return newUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create user'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUser = async (id: string | number, userData: Partial<IUser>) => {
    try {
      isLoading.value = true
      const updatedUser = await userApi.updateUser(id, userData)

      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...updatedUser }
      }

      if (currentUser.value?.id === id) {
        currentUser.value = { ...currentUser.value, ...updatedUser }
      }

      return updatedUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    currentUser,
    isLoading,
    error,
    totalUsers,

    activeUsers,
    blockedUsers,

    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
  }
})
