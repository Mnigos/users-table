import { render, screen } from '@testing-library/react'
import { userEvent, type UserEvent } from '@testing-library/user-event'
import { useDispatch } from 'react-redux'

import { UsersTable } from './users-table'

import { usersMock } from '@tests/mocks'
import { useUsersSelector } from '@app/store/selectors'

vi.mock('react-redux')
vi.mock('./user-details')
vi.mock('@app/store/selectors')

describe('UsersTable', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()

    vi.mocked(useUsersSelector).mockReturnValue(usersMock)
  })

  test('should match snapshot', () => {
    const view = render(<UsersTable filteredUsers={usersMock} />)

    expect(view).toMatchSnapshot()
  })

  describe('filters', () => {
    const dispatchMock = vi.fn()

    beforeEach(() => {
      vi.mocked(useDispatch).mockReturnValue(dispatchMock)
    })

    test('should filter users by name', async () => {
      render(<UsersTable filteredUsers={usersMock} />)

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
      render(<UsersTable filteredUsers={usersMock} />)

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
      render(<UsersTable filteredUsers={usersMock} />)

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
      render(<UsersTable filteredUsers={usersMock} />)

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
