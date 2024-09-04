import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { UsersTable } from './users-table'
import { UsersTableSkeleton } from './users-table.skeleton'

import { useUsersQuery } from '@app/api/hooks'
import { setUsers } from '@app/store/slices'
import { useFilteredUsersSelector } from '@app/store/selectors'

export function UsersView() {
  const { data, isLoading } = useUsersQuery()
  const dispatch = useDispatch()
  const filteredUsers = useFilteredUsersSelector()

  useEffect(() => {
    if (data) dispatch(setUsers(data))
  }, [data, dispatch])

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center gap-2">
        <img
          src="./users-table-logo.png"
          alt="Users Table logo"
          width="32"
          height="32"
        />

        <h1 className="text-4xl">Users</h1>
      </header>

      <main>
        {!isLoading && data ? (
          <UsersTable filteredUsers={filteredUsers} />
        ) : (
          <UsersTableSkeleton />
        )}
      </main>
    </section>
  )
}
