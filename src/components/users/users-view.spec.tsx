import type { UseQueryResult } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'
import userEvent from '@testing-library/user-event'
import type { HTMLAttributes } from 'react'
import { Provider } from 'react-redux'
import type { MockedFunction } from 'vitest'

import { UsersView } from './users-view'

import { useUsersQuery } from '@app/api/hooks'
import type { User } from '@app/api/types'
import { rootStore } from '@app/store'
import {
  johnUserMock,
  maxUserMock,
  oliverUserMock,
  usersMock,
} from '@tests/mocks'

vi.mock('@app/api/hooks')
vi.mock('./user-details')

function StoreWrapper({
  children,
}: Readonly<Pick<HTMLAttributes<HTMLDivElement>, 'children'>>) {
  return <Provider store={rootStore}>{children}</Provider>
}

describe('UsersView', () => {
  let useUsersQueryMock: MockedFunction<() => Partial<UseQueryResult<User[]>>>
  let user: UserEvent

  beforeEach(() => {
    useUsersQueryMock = vi.mocked(useUsersQuery)
    user = userEvent.setup()
  })

  test('should match snapshot as loading', () => {
    useUsersQueryMock.mockReturnValue({
      isLoading: true,
      data: undefined,
    })

    const view = render(<UsersView />, {
      wrapper: StoreWrapper,
    })

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with data', () => {
    useUsersQueryMock.mockReturnValue({
      isLoading: false,
      data: usersMock,
    })

    const view = render(<UsersView />, {
      wrapper: StoreWrapper,
    })

    expect(view).toMatchSnapshot()
  })

  describe('filters', () => {
    beforeEach(() => {
      useUsersQueryMock.mockReturnValue({
        isLoading: false,
        data: usersMock,
      })
    })

    test('should filter users by name', async () => {
      render(<UsersView />, {
        wrapper: StoreWrapper,
      })

      const input = screen.getAllByRole('textbox')[0]!

      await user.type(input, 'John')

      expect(screen.getByText(johnUserMock.name)).toBeInTheDocument()
      expect(screen.queryByText(oliverUserMock.name)).not.toBeInTheDocument()
      expect(screen.queryByText(maxUserMock.name)).not.toBeInTheDocument()
    })

    test('should filter users by username', async () => {
      render(<UsersView />, {
        wrapper: StoreWrapper,
      })

      const input = screen.getAllByRole('textbox')[1]!

      await user.type(input, 'john')

      expect(screen.getByText(johnUserMock.username)).toBeInTheDocument()
      expect(
        screen.queryByText(oliverUserMock.username)
      ).not.toBeInTheDocument()
      expect(screen.queryByText(maxUserMock.username)).not.toBeInTheDocument()
    })

    test('should filter users by email', async () => {
      render(<UsersView />, {
        wrapper: StoreWrapper,
      })

      const input = screen.getAllByRole('textbox')[2]!

      await user.type(input, 'john@example.com')

      expect(screen.getByText(johnUserMock.email)).toBeInTheDocument()
      expect(screen.queryByText(oliverUserMock.email)).not.toBeInTheDocument()
      expect(screen.queryByText(maxUserMock.email)).not.toBeInTheDocument()
    })

    test('should filter users by phone', async () => {
      render(<UsersView />, {
        wrapper: StoreWrapper,
      })

      const input = screen.getAllByRole('textbox')[3]!

      await user.type(input, '+1234567890')

      expect(screen.getByText(johnUserMock.phone)).toBeInTheDocument()
      expect(screen.queryByText(oliverUserMock.phone)).not.toBeInTheDocument()
      expect(screen.queryByText(maxUserMock.phone)).not.toBeInTheDocument()
    })
  })
})
