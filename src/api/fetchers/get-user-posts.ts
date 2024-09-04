import type { Post } from '../types'

import { env } from '@app/env'

export async function getUserPosts(userId: Post['userId']) {
  const searchParams = new URLSearchParams({
    userId: userId + '',
  })

  const response = await fetch(
    `${env.VITE_JSON_PLACEHOLDER_API_URL}/posts?${searchParams.toString()}`,
    {
      cache: 'force-cache',
    }
  )

  return response.json() as Promise<Post[]>
}
