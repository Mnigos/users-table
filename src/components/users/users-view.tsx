import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { UsersTable } from './users-table'

import { useUsersQuery } from '@app/api/hooks'
import { setUsers } from '@app/store/slices'
import { useUsersSelector } from '@app/store/selectors'

export function UsersView() {
  const { data, isLoading } = useUsersQuery()
  const dispatch = useDispatch()
  const users = useUsersSelector()

  useEffect(() => {
    if (data) dispatch(setUsers(data))
  }, [data, dispatch])

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h1 className="text-4xl">Users</h1>
      </header>

      <main>
        <UsersTable users={users} />
      </main>
    </section>
  )
}
