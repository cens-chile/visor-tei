import { useState } from 'react'
import { 
    flexRender, 
    getCoreRowModel, 
    getFilteredRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    useReactTable 
} from '@tanstack/react-table'
import { Box, ButtonGroup, Button, Icon, Text} from "@chakra-ui/react"
import DATA from '../hooks/data.js' 
import Filter from './Filter.jsx'
import SortIcon from './icons/SortIcon.jsx'
import InfoModal from './InfoModal.jsx'


export default function Index() {

  const [data, setData] = useState(DATA)
  const [globalFilter, setGlobalFilter] = useState("")

  const columns = [
    {
      accessorKey: 'idMensaje', 
      header: 'ID Mensaje', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'idInterconsulta', 
      header: 'ID Interconsulta', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'evento', 
      header: 'Evento', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'fechaEnvio', 
      header: 'Fecha envío', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'fechaRecepcion', 
      header: 'Fecha recepción', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'estado', 
      header: 'Estado', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'info', 
      header: 'Información', 
      cell: (props) => <InfoModal info={props.getValue()} />
    }
  ]

  const table = useReactTable({
    data,
    columns, 
    state:{
      globalFilter, 
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      return Object.values(row.original).some((value) =>
        String(value).toLowerCase().includes(filterValue.toLowerCase())
      );
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

  })

  console.log(globalFilter)

  return (
    <>
    <Box>
      <Filter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Box classname="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map( (headerGroup) =>
         <Box className='tr' key={headerGroup.id}>
          {headerGroup.headers.map ( (header) =>
          <Box className='th' w={header.getSize()} key={header.id}>
            {header.column.columnDef.header}   
            {
              header.column.getCanSort() && (<Icon
              as={SortIcon}
              mx={2}
              boxSize="14px"
              onClick={
                header.column.getToggleSortingHandler()
              }
              />
            )}
            {
              {
                asc: " 🔼",
                desc: " 🔽",
              }[header.column.getIsSorted()]
            }
          </Box>
          )}
         </Box>
        )}
        {
          table.getRowModel().rows.map(row => 
          <Box className='tr' key={row.id}>
            {row.getVisibleCells().map(cell => 
            <Box className='td' w={cell.column.getSize()} key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Box>)}
          </Box>)
        }
      </Box>
      <Text m={2}>
        Página {table.getState().pagination.pageIndex + 1} de {" "}
        {table.getPageCount()}
      </Text>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
      </ButtonGroup>
    </Box>
      
    </>
  )
}
