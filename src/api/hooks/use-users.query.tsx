import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../fetchers'

export const useUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
