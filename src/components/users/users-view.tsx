import { UsersTable } from './users-table'

import { useUsersQuery } from '@app/api/hooks'

export function UsersView() {
  const { data: users, isLoading } = useUsersQuery()

  if (isLoading || !users) return <div>Loading...</div>

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
