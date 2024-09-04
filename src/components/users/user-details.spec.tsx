import type { UseQueryResult } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import type { MockedFunction } from 'vitest'

import { UserDetails } from './user-details'

import { useUserPostsQuery } from '@app/api/hooks'
import type { Post, User } from '@app/api/types'
import { johnUserMock, postsMock } from '@tests/mocks'

vi.mock('@app/api/hooks')
vi.mock('../ui/dialog')

describe('UserDetails', () => {
  let useUserPostsQueryMock: MockedFunction<
    (userId: User['id']) => Partial<UseQueryResult<Post[]>>
  >

  beforeEach(() => {
    useUserPostsQueryMock = vi.mocked(useUserPostsQuery)
  })

  test('should match snapshot', () => {
    useUserPostsQueryMock.mockReturnValue({
      isLoading: false,
      data: postsMock,
    })

    const view = render(<UserDetails {...johnUserMock} />)

    expect(view).toMatchSnapshot()

    expect(useUserPostsQueryMock).toHaveBeenCalledWith(johnUserMock.id)
  })
})
