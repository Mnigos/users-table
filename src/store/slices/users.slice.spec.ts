import { mock } from 'vitest-mock-extended'

import {
  filterUsers,
  setUsers,
  usersInitialState,
  usersReducer,
} from './users.slice'

import type { User } from '@app/api/types'
import { johnUserMock, usersMock } from '@tests/mocks'

describe('usersSlice', () => {
  describe('setUsers', () => {
    test('should set users data', () => {
      const usersMock = mock<User[]>()

      const reducer = usersReducer(usersInitialState, setUsers(usersMock))

      expect(reducer.users).toEqual(usersMock)
      expect(reducer.filteredUsers).toEqual(usersMock)
    })
  })

  describe('filterUsers', () => {
    test('should filter users with name', () => {
      const activeFilter = {
        name: 'J',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
      expect(reducer.activeFilter).toEqual(activeFilter)
    })

    test('should filter users with username', () => {
      const activeFilter = {
        username: 'john',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
      expect(reducer.activeFilter).toEqual(activeFilter)
    })

    test('should filter users with email', () => {
      const activeFilter = {
        email: 'john@example.com',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
      expect(reducer.activeFilter).toEqual(activeFilter)
    })

    test('should filter users with phone', () => {
      const activeFilter = {
        phone: '+1234567890',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
      expect(reducer.activeFilter).toEqual(activeFilter)
    })

    test('should filter users with name and username', () => {
      const activeFilter = {
        name: 'J',
        username: 'john',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
      expect(reducer.activeFilter).toEqual(activeFilter)
    })

    test('should filter users with name and email', () => {
      const activeFilter = {
        name: 'J',
        email: 'john@example.com',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
      expect(reducer.activeFilter).toEqual(activeFilter)
    })

    test('should filter users with username and email', () => {
      const activeFilter = {
        username: 'john',
        email: 'john@example.com',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
      expect(reducer.activeFilter).toEqual(activeFilter)
    })

    test('should filter users with name, username and email', () => {
      const activeFilter = {
        name: 'J',
        username: 'john',
        email: 'john@example.com',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
    })

    test('should filter users with name, username and phone', () => {
      const activeFilter = {
        name: 'J',
        username: 'john',
        phone: '+1234567890',
      }

      const reducer = usersReducer(
        {
          ...usersInitialState,
          users: usersMock,
          filteredUsers: usersMock,
        },
        filterUsers(activeFilter)
      )

      expect(reducer.filteredUsers).toEqual([johnUserMock])
      expect(reducer.users).toEqual(usersMock)
    })
  })
})
