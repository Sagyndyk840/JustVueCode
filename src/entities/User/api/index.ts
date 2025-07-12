import { BaseApi } from '@/shared/api/base'
import type { IUser, IUserCreateData } from '@/shared/types/user.ts'
import { buildQueryString } from '@/shared/lib/utils/buildQueryString.ts'

const RESOURCE = 'users' as const

export const userApi = {
  async getUsersList(params: {
        page?: number
        limit?: number
        search?: string
    }): Promise<{ data: IUser[]; total: number }> {
    const queryParams = {
      _page: params.page ?? 1,
      _limit: params.limit ?? 10,
      ...(params.search && {
        q: params.search,
        _sort: 'id',
        _order: 'asc' as const,
      }),
    }
    const queryString = buildQueryString(queryParams)

    const response = await BaseApi.get<IUser[]>(`${RESOURCE}?${queryString}`)

    return {
      data: response.data,
      total: Number(response.headers['x-total-count']) || response.data.length,
    }
  },

  async getUserById(id: string | number): Promise<IUser> {
    const response = await BaseApi.get<IUser>(`${RESOURCE}/${id}`)
    return response.data
  },

  async createUser(data: Omit<IUserCreateData, 'id'>): Promise<IUser> {
    const response = await BaseApi.post<IUser>(RESOURCE, data)
    return response.data
  },

  async updateUser(id: string | number, data: Partial<IUser>): Promise<IUser> {
    const response = await BaseApi.patch<IUser>(`${RESOURCE}/${id}`, data)
    return response.data
  },
}
