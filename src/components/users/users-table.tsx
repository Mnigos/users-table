import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

import { cn } from '@app/utils'
import type { User } from '@app/api/types'

namespace UsersTable {
  export type Props = Readonly<{
    users: User[]
  }>
}

function UsersTable({ users }: UsersTable.Props) {
  const columns = useMemo<
    ColumnDef<Pick<User, 'name' | 'username' | 'email' | 'phone'>>[]
  >(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
    ],
    []
  )

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(({ id, headers }) => (
            <TableRow key={id}>
              {headers.map(({ id, isPlaceholder, column, getContext }) => (
                <TableHead key={id}>
                  {!isPlaceholder && (
                    // eslint-disable-next-line sonarjs/mouse-events-a11y, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                      className={cn(
                        column.getCanSort() && 'cursor-pointer select-none'
                      )}
                      onClick={column.getToggleSortingHandler()}
                    >
                      {flexRender(column.columnDef.header, getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(({ id, getVisibleCells }) => (
            <TableRow key={id}>
              {getVisibleCells().map(({ id, column, getContext }) => (
                <TableCell key={id}>
                  {flexRender(column.columnDef.cell, getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { UsersTable }
