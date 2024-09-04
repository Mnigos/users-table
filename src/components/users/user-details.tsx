import { AvatarFallback } from '@radix-ui/react-avatar'
import { DialogDescription } from '@radix-ui/react-dialog'

import { Avatar } from '../ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

import { useUserPostsQuery } from '@app/api/hooks'
import type { User } from '@app/api/types'

namespace UserDetails {
  export type Props = Readonly<Pick<User, 'id' | 'name' | 'username'>>
}

function UserDetails({ id, name, username }: UserDetails.Props) {
  const { data: userPosts } = useUserPostsQuery(id)

  const [firstName, lastName] = name.split(' ') as [string, string]

  return (
    <DialogContent>
      <DialogHeader className="flex flex-row items-center gap-2">
        <Avatar className="flex items-center justify-center bg-blue-700">
          <AvatarFallback>
            {`${firstName.charAt(0)}${lastName.charAt(0)}`}
          </AvatarFallback>
        </Avatar>

        <div>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="text-neutral-500">
            @{username}
          </DialogDescription>
        </div>
      </DialogHeader>

      {userPosts && (
        <section className="flex flex-col gap-2">
          <header>
            <h2 className="text-2xl">Recent posts</h2>
          </header>

          <main className="flex flex-col gap-2">
            {userPosts.slice(0, 3).map(({ id, title, body }) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>

                <CardContent className="text-sm">{body}</CardContent>
              </Card>
            ))}
          </main>
        </section>
      )}
    </DialogContent>
  )
}

export { UserDetails }
