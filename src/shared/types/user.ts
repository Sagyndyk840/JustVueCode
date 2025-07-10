export interface IUser {
    id: number
    fullName: string
    email: string
    status: 'active' | 'blocked'
}

export type IUserCreateData = Omit<IUser, 'id'>
