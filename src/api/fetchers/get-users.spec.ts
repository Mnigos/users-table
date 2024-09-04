import { mock } from 'vitest-mock-extended'

import type { User } from '../types'

import { getUsers } from './get-users'

import { env } from '@app/env'

describe('getUsers', () => {
  it('should return users', async () => {
    const usersMock = mock<User[]>()

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(usersMock),
    })

    vi.stubGlobal('fetch', fetchMock)

    expect(await getUsers()).toEqual(usersMock)
    expect(fetchMock).toHaveBeenCalledWith(
      `${env.VITE_JSON_PLACEHOLDER_API_URL}/users`,
      {
        cache: 'force-cache',
      }
    )
  })
})
