import { useQuery } from '@tanstack/react-query'

import type { Post } from '../types'
import { getUserPosts } from '../fetchers'

export const useUserPostsQuery = (userId: Post['userId']) =>
  useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(userId),
  })
