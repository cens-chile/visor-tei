import { useState, useEffect } from 'react'
import { IdleTimerProvider } from 'react-idle-timer';
import { 
    flexRender, 
    getCoreRowModel, 
    getFilteredRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    useReactTable 
} from '@tanstack/react-table'
import {
  Box,
  Button, 
  Icon,
  Flex,
  Heading,
  Spacer,
  Text
} from '@chakra-ui/react';
import Pagination from './Pagination.jsx'
import Filter from './Filter.jsx'
import InfoModal from './InfoModal.jsx'
import { LuArrowDown, LuArrowUp, LuArrowDownUp } from "react-icons/lu";
import {refreshToken, logout, getMessages, handleOnIdle} from '../hooks/functions'

export default function Index() {

  const [data, setData] = useState([])
  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedField, setSelectedField] = useState("search");
  const [sorting, setSorting] = useState([]);

  const fetchMessages = async ({ ordering } = {}) => {
    const filters = searchTerm.trim()
      ? { [selectedField]: searchTerm.trim() }
      : {};

    const result = await getMessages({ ordering, ...filters});

    if (result && result.results) {
      setData(result.results);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return ''; 

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Fecha inválida'; 

    const time = date.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${time}\n${day}-${month}-${year}`;
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUserName(username);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
    refreshToken();
    }, 2*60*60*1000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== '') return;

    fetchMessages(); 
    const interval = setInterval(fetchMessages, 60000); 

    return () => clearInterval(interval);
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchMessages();
    }, 300); 

    return () => clearTimeout(delay);
  }, [searchTerm, selectedField]);

  useEffect(() => {
    const sort = sorting[0]; 

    if (sort) {
      const field = sort.id;
      const order = sort.desc ? `-${field}`: `${field}`;

      fetchMessages({
        ordering: order
      });
    }else {
      fetchMessages(); 
    }
  }, [sorting]);

  const columns = [
    {
      accessorKey: 'id_mensaje', 
      header: 'ID Mensaje', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'id_interconsulta', 
      header: 'ID Interconsulta', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'evento', 
      header: 'Evento', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'organizacion', 
      header: 'Origen del mensaje', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'software', 
      header: 'Software', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'fecha_envio', 
      header: 'Fecha envío', 
      cell: (props) => <p style={{ whiteSpace: 'pre-line' }}>{formatDate(props.getValue())}</p>
    },
    {
      accessorKey: 'fecha_recepcion', 
      header: 'Fecha recepción', 
      cell: (props) => <p style={{ whiteSpace: 'pre-line' }}>{formatDate(props.getValue())}</p>
    },
    {
      accessorKey: 'estado', 
      header: 'Estado', 
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'mensaje_resultado', 
      header: 'Mensaje resultado', 
      cell: (props) => <InfoModal info={props.getValue()} />
    },
    {
      accessorKey: 'mensaje_resultado_error', 
      header: 'Mensaje resultado (error)', 
      cell: (props) => <InfoModal info={props.getValue()} />
    }
  ]

  const filterableFields = ['evento', 'estado', 'organizacion', 'id_interconsulta', 'software', 'fecha_envio', 'fecha_recepcion' ];

  const searchableColumns = columns.filter(col => filterableFields.includes(col.accessorKey));

  const table = useReactTable({
    data,
    columns, 
    state:{
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

  })

  return (
    <IdleTimerProvider
      timeout={3 * 60 * 60 * 1000} 
      onIdle={handleOnIdle}
    >
      <Box
        mx={"auto"}
        my={6}
        py={3}
        bg="gray.900"
        color="white"
        borderRadius="lg"
        boxShadow="lg"
        w={table.getTotalSize()}
        >
        <Flex align="center" mb={10} p={4} borderRadius="md" >
          <Heading alignContent="center" className='header'>Visor de mensajes</Heading>
          <Spacer />
          {userName && (
            <Flex align="center" gap={4}>
              <Text fontSize="md">
                Bienvenido, <strong>{userName}</strong>
              </Text>
              <Button _dark={{
                bg: "gray.700",
                color: "white",
                _hover: { bg: "gray.600" },
                }} 
                size="sm" onClick={logout}
              >
                Cerrar sesión
              </Button>
            </Flex>
          )}
        </Flex>
        <Filter
          value={searchTerm}
          selectedField={selectedField}
          onChange={(value) => {
            setSearchTerm(value);
            setFilters((prev) => ({
              ...prev,
              [selectedField === 'search' ? 'search' : selectedField]: value || undefined,
            }));
          }}
          onFieldChange={(field) => {
            setSelectedField(field);
            setFilters((prev) => ({
              ...prev,
              [field === 'search' ? 'search' : field]: searchTerm || undefined,
            }));
          }}
          options={searchableColumns} 
        />
        <Box className="table" w={table.getTotalSize()}>
          {table.getHeaderGroups().map( (headerGroup) =>
          <Box className='tr' key={headerGroup.id}>
            {headerGroup.headers.map ( (header) =>
            <Box className='th' w={header.getSize()} key={header.id}>
              {header.column.columnDef.header}   

              {header.column.getCanSort() && (
                <>
                  <Icon
                    as={LuArrowDownUp}
                    mx={2}
                    boxSize="1rem"
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  />
                  {header.column.getIsSorted() === 'asc' && (
                    <Icon as={LuArrowUp} boxSize="1rem" ml={1} />
                  )}
                  {header.column.getIsSorted() === 'desc' && (
                    <Icon as={LuArrowDown} boxSize="1rem" ml={1} />
                  )}
                </>
              )}
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
        <Flex direction="column" align="center" justify="center" mt={5} gap={4}>
          <Pagination
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            setPageIndex={(index) => table.setPageIndex(index)}
          />
        </Flex>
      </Box>        
    </IdleTimerProvider>
  )
}
