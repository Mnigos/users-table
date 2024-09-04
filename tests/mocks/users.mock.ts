import { mock } from 'vitest-mock-extended'

import type { User } from '@app/api/types'

export const johnUserMock = mock<User>({
  id: 1,
  name: 'John Doe',
  username: 'john',
  email: 'john@example.com',
  phone: '+1234567890',
})

export const oliverUserMock = mock<User>({
  id: 2,
  name: 'Oliver Smith',
  username: 'oliver',
  email: 'oliver@example.com',
  phone: '+9876543210',
})

export const maxUserMock = mock<User>({
  id: 3,
  name: 'Max Mustermann',
  username: 'max',
  email: 'max@example.com',
  phone: '+09876543210',
})

export const usersMock = [johnUserMock, oliverUserMock, maxUserMock]
