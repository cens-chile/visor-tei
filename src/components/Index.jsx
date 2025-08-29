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
import { Box, Icon, Flex } from '@chakra-ui/react';
import Pagination from './Pagination.jsx'
import Filter from './Filter.jsx'
import InfoModal from './InfoModal.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { LuArrowDown, LuArrowUp, LuArrowDownUp } from "react-icons/lu";
import {refreshToken, getMessages, handleOnIdle} from '../hooks/functions'

export default function Index() {

  const [data, setData] = useState([])
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
        _dark={{
          bg: "gray.700",
          color: "white"
        }}
        _light={{
          bg: "#ffffff",
          color: "black"
        }}
        borderRadius="lg"
        boxShadow="lg"
        w={"90%"}
        >
        <Header/>
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
        <Flex className="table" direction="column" mx={"auto"} w={"100%"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Flex className="tr" key={headerGroup.id} w={"100%"}>
              {headerGroup.headers.map((header) => (
                <Box
                  className="th"
                  flex="1" 
                  key={header.id}
                  _dark={{
                    bg: "gray.700",
                    color: "white"
                  }}
                  _light={{
                    bg: "#e1e1e1",
                    color: "black"
                  }}
                  p={2}
                  minW={0}
                  flexShrink={1} 
                  textAlign="center" 
                >
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
              ))}
            </Flex>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Flex className="tr" key={row.id} w={"100%"}>
              {row.getVisibleCells().map((cell) => (
                <Box
                  className="td"
                  flex="1" 
                  key={cell.id}
                  minW={0}
                  flexShrink={1}
                  p={2} 
                  textAlign="center" 
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Flex>
          ))}
        </Flex>
        <Flex direction="column" align="center" justify="center" mt={5} gap={4}>
          <Pagination
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            setPageIndex={(index) => table.setPageIndex(index)}
          />
        </Flex>
      </Box>        
      <Footer/>
    </IdleTimerProvider>
  )
}
