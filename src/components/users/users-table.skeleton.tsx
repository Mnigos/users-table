import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { LuArrowDownSquare, LuArrowUpSquare } from 'react-icons/lu'

import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

export function UsersTableSkeleton() {
  const columns = useMemo(
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
    data: Array.from({ length: 10 }),
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
                  <div className="flex items-center gap-[2px]">
                    {!isPlaceholder && (
                      <button
                        className="flex items-center gap-2"
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
                          disabled
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
              {getVisibleCells().map(({ id }) => (
                <TableCell key={id} className="cursor-pointer">
                  <Skeleton className="h-5 w-24" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
