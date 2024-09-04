import { mock } from 'vitest-mock-extended'

import type { Post } from '@app/api/types'

export const postsMock = [
  mock<Post>({
    id: 1,
    title: 'Post 1',
    body: 'Body 1',
  }),
  mock<Post>({
    id: 2,
    title: 'Post 2',
    body: 'Body 2',
  }),
]
