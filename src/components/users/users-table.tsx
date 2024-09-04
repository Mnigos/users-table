import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { LuArrowDownSquare, LuArrowUpSquare } from 'react-icons/lu'
import { useDispatch } from 'react-redux'

import { Dialog, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

import { UserDetails } from './user-details'

import type { User, UserBasicInfo } from '@app/api/types'
import { useUsersSelector } from '@app/store/selectors'
import { filterUsers } from '@app/store/slices'
import { cn } from '@app/utils'

namespace UsersTable {
  export type Props = Readonly<{
    filteredUsers: UserBasicInfo[]
  }>
}

function UsersTable({ filteredUsers }: UsersTable.Props) {
  const columns = useMemo<ColumnDef<UserBasicInfo>[]>(
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
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const users = useUsersSelector()
  const dispatch = useDispatch()

  function handleFilterChange(column: string, value: string) {
    const usersFilter = {
      [column]: value,
    } as Record<keyof UserBasicInfo, string>

    dispatch(filterUsers(usersFilter))
  }

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(({ id, headers }) => (
            <TableRow key={id}>
              {headers.map(({ id, isPlaceholder, column, getContext }) => (
                <TableHead key={id}>
                  <div className="flex items-center gap-[2px]">
                    {!isPlaceholder && (
                      <button
                        className={cn(
                          column.getCanSort() && 'cursor-pointer select-none',
                          'flex items-center gap-2'
                        )}
                        onClick={column.getToggleSortingHandler()}
                      >
                        {flexRender(column.columnDef.header, getContext())}

                        <div className="w-[16px]">
                          {{
                            asc: <LuArrowUpSquare />,
                            desc: <LuArrowDownSquare />,
                          }[column.getIsSorted() as string] ?? null}
                        </div>
                      </button>
                    )}

                    {column.getCanFilter() && (
                      <div className="p-1">
                        <Input
                          placeholder="Search"
                          className="w-full"
                          onChange={({ currentTarget: { value } }) => {
                            handleFilterChange(
                              column.columnDef.header!.toString().toLowerCase(),
                              value
                            )
                          }}
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(({ id, getVisibleCells }) => (
            <TableRow key={id}>
              {getVisibleCells().map(({ id, column, getContext, getValue }) => (
                <Dialog key={id}>
                  <DialogTrigger asChild>
                    <TableCell className="cursor-pointer">
                      {flexRender(column.columnDef.cell, getContext())}
                    </TableCell>
                  </DialogTrigger>

                  <UserDetails
                    {...users.find(
                      user => user[column.id as keyof User] === getValue()
                    )!}
                  />
                </Dialog>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { UsersTable }
