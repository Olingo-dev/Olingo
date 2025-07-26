import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChartNoAxesColumn, ChevronDown, ExternalLink, Plus} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import ContainerTableActions from "@/components/actions/ContainerTableActions"
import type { CreateContainerDialogRef } from "@/components/dialogs/createContainerDialog"
import CreateContainerDialog from "@/components/dialogs/createContainerDialog"


export type DockerPort = {
  IP: string | undefined,
  PrivatePort: number,
  PublicPort: number,
  Type: string
}
export type DockerContainer = {
    Id: string,
    Name: string,
    Ports: DockerPort[]
    Image: string
    CreatedAt: number
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    func: VoidFunc
}

export function DataTableDemo<TData, TValue>({data, columns, func}: DataTableProps<TData, TValue>) {
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

  const createRef = useRef<CreateContainerDialogRef>(null);

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
        <Button onClick={() => {createRef.current?.open()}}>Create <Plus /></Button>
        <CreateContainerDialog ref={createRef} onClose={func}/>
      </div>
      <div className="border">
        <Table className="w-full">
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

    const fetchContainer = () => {
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
    }
    useEffect(() => {
      fetchContainer()
    }, [])
    const columns : ColumnDef<DockerContainer>[] = [
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
          size: 20
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
          cell: () => {
            return (
              <div className="flex flex-row items-center">
                <p>Future</p>
                <a href="/group/future" className="ml-2"><ExternalLink size={15}/></a>
              </div>
            )
          }
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
            cell: info => {
              return (
              <div className="flex flex-row items-center">
                <p className="truncate">{info.getValue() as string}</p>
                <a href="/group/future" className="ml-2"><ExternalLink size={15}/></a>
              </div>
            )
            }
        },
        {
            accessorKey: "Ports",
            header: "Ports (public:private)", // TODO: Add info icon to explain Ports.
            cell: info => {
              const mappedPorts : Set<string> = new Set();
              const ports = info.getValue() as DockerPort[]
              ports.forEach((port) => {
                const publicPort = port.PublicPort ?? "-"
                const privatePort = port.PrivatePort ?? "-"
                mappedPorts.add(`${publicPort}:${privatePort}`) 
              })
              return (
                <div className="flex flex-row">
                  {Array.from(mappedPorts).map((ports) => <p className="mr-1">{ports}</p>)}
                </div>
              )
            }
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
          cell: ({row}) => <ContainerTableActions container={row.original} func={fetchContainer}/>
        }
    ]

    if(loading) {
        return <Skeleton className="h-[20px] w-[100px] rounded-full" />
    }
    if(error) {
        return <p>Failed to load containers</p>
    }
    return (
      <>
        <h1>Containers</h1>
        <DataTableDemo columns={columns} data={containers} func={fetchContainer}/>
      </>
    )
}