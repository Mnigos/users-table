import { useSelector } from 'react-redux'

import type { UsersState } from '../slices'

import type { User } from '@app/api/types'

export const useFilteredUsersSelector = () =>
  useSelector<UsersState, User[]>(state => state.filteredUsers)

export const useUsersSelector = () =>
  useSelector<UsersState, User[]>(state => state.users)
