import { mock } from 'vitest-mock-extended'

import type { Post } from '../types'

import { getUserPosts } from './get-user-posts'

import { env } from '@app/env'

describe('getUserPosts', () => {
  test("should return user's posts", async () => {
    const userPostsMock = mock<Post[]>()

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(userPostsMock),
    })

    vi.stubGlobal('fetch', fetchMock)

    expect(await getUserPosts(1)).toEqual(userPostsMock)
    expect(fetchMock).toHaveBeenCalledWith(
      `${env.VITE_JSON_PLACEHOLDER_API_URL}/posts?userId=1`,
      {
        cache: 'force-cache',
      }
    )
  })
})
