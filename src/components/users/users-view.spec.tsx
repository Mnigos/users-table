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
import { usersMock } from '@tests/mocks'

vi.mock('@app/api/hooks')

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

      expect(screen.getByText('John')).toBeInTheDocument()
      expect(screen.queryByText('Oliver')).not.toBeInTheDocument()
      expect(screen.queryByText('Max')).not.toBeInTheDocument()
    })

    test('should filter users by username', async () => {
      render(<UsersView />, {
        wrapper: StoreWrapper,
      })

      const input = screen.getAllByRole('textbox')[1]!

      await user.type(input, 'john')

      expect(screen.getByText('John')).toBeInTheDocument()
      expect(screen.queryByText('Oliver')).not.toBeInTheDocument()
      expect(screen.queryByText('Max')).not.toBeInTheDocument()
    })

    test('should filter users by email', async () => {
      render(<UsersView />, {
        wrapper: StoreWrapper,
      })

      const input = screen.getAllByRole('textbox')[2]!

      await user.type(input, 'john@example.com')

      expect(screen.getByText('John')).toBeInTheDocument()
      expect(screen.queryByText('Oliver')).not.toBeInTheDocument()
      expect(screen.queryByText('Max')).not.toBeInTheDocument()
    })

    test('should filter users by phone', async () => {
      render(<UsersView />, {
        wrapper: StoreWrapper,
      })

      const input = screen.getAllByRole('textbox')[3]!

      await user.type(input, '+1234567890')

      expect(screen.getByText('John')).toBeInTheDocument()
      expect(screen.queryByText('Oliver')).not.toBeInTheDocument()
      expect(screen.queryByText('Max')).not.toBeInTheDocument()
    })
  })
})
