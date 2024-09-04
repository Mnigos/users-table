import { render, screen } from '@testing-library/react'
import { userEvent, type UserEvent } from '@testing-library/user-event'
import { mock } from 'vitest-mock-extended'
import { useDispatch } from 'react-redux'

import { UsersTable } from './users-table'

import type { User } from '@app/api/types'

vi.mock('react-redux')

describe('UsersTable', () => {
  const usersMock = [
    mock<User>({
      name: 'John',
      username: 'john',
      email: 'john@example.com',
      phone: '+1234567890',
    }),
    mock<User>({
      name: 'Oliver',
      username: 'oliver',
      email: 'oliver@example.com',
      phone: '+9876543210',
    }),
    mock<User>({
      name: 'Max',
      username: 'max',
      email: 'max@example.com',
      phone: '+09876543210',
    }),
  ]

  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  test('should match snapshot', () => {
    const view = render(<UsersTable users={usersMock} />)

    expect(view).toMatchSnapshot()
  })

  describe('filters', () => {
    const dispatchMock = vi.fn()

    beforeEach(() => {
      vi.mocked(useDispatch).mockReturnValue(dispatchMock)
    })

    test('should filter users by name', async () => {
      render(<UsersTable users={usersMock} />)

      const input = screen.getAllByRole('textbox')[0]!

      await user.type(input, 'John')

      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'users/filterUsers',
          payload: {
            name: 'John',
          },
        })
      )
    })

    test('should filter users by username', async () => {
      render(<UsersTable users={usersMock} />)

      const input = screen.getAllByRole('textbox')[1]!

      await user.type(input, 'john')

      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'users/filterUsers',
          payload: {
            username: 'john',
          },
        })
      )
    })

    test('should filter users by email', async () => {
      render(<UsersTable users={usersMock} />)

      const input = screen.getAllByRole('textbox')[2]!

      await user.type(input, 'john@example.com')

      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'users/filterUsers',
          payload: {
            email: 'john@example.com',
          },
        })
      )
    })

    test('should filter users by phone', async () => {
      render(<UsersTable users={usersMock} />)

      const input = screen.getAllByRole('textbox')[3]!

      await user.type(input, '+1234567890')

      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'users/filterUsers',
          payload: {
            phone: '+1234567890',
          },
        })
      )
    })
  })
})
