import type { User } from '../types'

import { env } from '@app/env'

export async function getUsers() {
  const response = await fetch(`${env.VITE_JSON_PLACEHOLDER_API_URL}/users`, {
    cache: 'force-cache',
  })

  return response.json() as Promise<User[]>
}
