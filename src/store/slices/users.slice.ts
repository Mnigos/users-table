import { createSlice } from '@reduxjs/toolkit'
import type { RequireAtLeastOne } from 'type-fest'

import type { User, UserBasicInfo } from '@app/api/types'

export interface Action<TPayload = unknown> {
  type: string
  payload: TPayload
}

export type SetUsersAction = Action<User[]>
export type FilterUsersAction = Action<RequireAtLeastOne<UserBasicInfo>>

export interface UsersState {
  users: User[]
  filteredUsers: User[]
  activeFilter: Partial<UserBasicInfo>
}

function filterUser(value: string, filter: string) {
  const lowerCasedValue = value.toLowerCase()
  const lowerCasedFilter = filter.toLowerCase()

  if (filter.length === 1) return lowerCasedValue.startsWith(lowerCasedFilter)

  return lowerCasedValue.includes(lowerCasedFilter)
}

export const usersInitialState: UsersState = {
  users: [],
  filteredUsers: [],
  activeFilter: {},
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {
    setUsers: (state, action: SetUsersAction) => {
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
      }
    },
    filterUsers: (state, action: FilterUsersAction) => {
      const { users, activeFilter } = state

      const name = action.payload.name ?? activeFilter.name
      const username = action.payload.username ?? activeFilter.username
      const email = action.payload.email ?? activeFilter.email
      const phone = action.payload.phone ?? activeFilter.phone

      return {
        filteredUsers: users.filter(
          user =>
            (name ? filterUser(user.name, name) : true) &&
            (username ? filterUser(user.username, username) : true) &&
            (email ? filterUser(user.email, email) : true) &&
            (phone ? filterUser(user.phone, phone) : true)
        ),
        users,
        activeFilter: {
          name,
          username,
          email,
          phone,
        },
      }
    },
  },
})

export const { setUsers, filterUsers } = usersSlice.actions

export const usersReducer = usersSlice.reducer
