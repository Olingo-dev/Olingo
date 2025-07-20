import { useEffect, useState } from "react"
import { Skeleton } from "./components/ui/skeleton"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "./components/ui/table"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { ChartNoAxesColumn, ChevronDown, Container, MoreHorizontal, Plus, ScanEye} from "lucide-react"
import { Checkbox } from "./components/ui/checkbox"

type DockerContainer = {
    Id: string,
    Name: string,
    Ports: number[]
    Image: string
    CreatedAt: number
}

const columns: ColumnDef<DockerContainer>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      maxSize: 50,
      size: 50
    },
    {
      id: "Status",
      header: "Status",
      enableHiding: false,
      cell: () => {
        return (
          <div className="flex flex-row items-center">
            <ChartNoAxesColumn size={16} className="text-green-400 mr-1"/> 
            Online
          </div>
        )
      }
    },
    {
      id: "Group",
      header: "Group",
      cell: () => "Future"
    },
    {
        accessorKey: "Name",
        header: "Name",
        enableSorting: true,
        enableResizing: true,
        enableHiding: false
    },
    {
        accessorKey: "Image",
        header: "Image",
        cell: info => <p className="truncate">{info.getValue() as string}</p>
    },
    {
        accessorKey: "Ports",
        header: "Ports",
        cell: info => (info.getValue() as number[]).join(":")
    },
    {
        accessorKey: "CreatedAt",
        header: "Created at",
        enableHiding: false,
        cell: info => new Date(info.getValue() as number * 1000).toLocaleString(),
    },
    {
      id: "Actions",
      header: "Actions",
      enableHiding: false,
      cell: ({row}) => {
        const container = row.original;
         return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-bold flex flex-row items-center"><Container className="mr-1" size={18}/> Container actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(container.Id)}
                >
                  Copy container ID
                </DropdownMenuItem>
                <DropdownMenuItem>View container details</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Remove container
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-bold flex flex-row items-center"><ScanEye className="mr-1" size={18}/>Tracing</DropdownMenuLabel>
                <DropdownMenuItem>View audit log</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    }
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}



export function DataTableDemo<TData, TValue>({data, columns}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: data,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter containers..."
          value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mr-4">
              View columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>Create <Plus /></Button>
      </div>
      <div className="border">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
    const [containers, setContainers] = useState<DockerContainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/containers")
        .then(res => res.json())
        .then(data => {
          const mappedResponse : DockerContainer[] = (Array.isArray(data) ? data : [data]).map((container) => ({
            Id: container.id,
            Name: container.name,
            CreatedAt: container["created-at"],
            Image: container.image,
            Ports: container.ports
          })) 
            setContainers(mappedResponse);
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
            setError(true)
        }
        )
    }, [])

    if(loading) {
        return <Skeleton className="h-[20px] w-[100px] rounded-full" />
    }
    if(error) {
        return <p>Failed to load containers</p>
    }
    return (
      <>
        <h1>Containers</h1>
        <DataTableDemo columns={columns} data={containers}/>
      </>
    )
}