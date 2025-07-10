import type { IUserStatus } from '@shared/types/base.ts'

export interface IUser {
    id: number
    fullName: string
    email: string
    status: IUserStatus
}

export type IUserCreateData = Omit<IUser, 'id'>
