import { useState, useEffect, useMemo, useCallback, useRef} from 'react'
import { IdleTimerProvider } from 'react-idle-timer';
import { 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  useReactTable 
} from '@tanstack/react-table'
import { Box, Icon, Flex, Button} from '@chakra-ui/react';
import Pagination from './Pagination.jsx'
import Filter from './Filter.jsx'
import InfoModal from './InfoModal.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { LuArrowDown, LuArrowUp, LuArrowDownUp } from "react-icons/lu";
import {refreshToken, getMessages, handleOnIdle} from '../hooks/functions'

export default function Index() {
  
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedField, setSelectedField] = useState("search");
  const [sorting, setSorting] = useState([]); 
  const [pageIndex, setPageIndex] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [total, setTotal] = useState(0);

  const limit = 10;
  const pageCount = Math.max(1, Math.ceil(total / limit));

  const ordering = useMemo(() => {
    const s = sorting?.[0];
    if (!s) return undefined;
    const field = s.id;
    return s.desc ? `-${field}` : field;
  }, [sorting]);

  const fetchMessages = useCallback(async () => {
    const filters = debouncedSearch ? { [selectedField]: debouncedSearch } : {};
    const offset = pageIndex * limit;

    try {
      const res = await getMessages({ limit, offset, ordering, ...filters });

      if (res) {
        setData(res.results ?? []);
        setTotal(res.count ?? 0);
      } else {
        setData([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("fetchMessages error:", err);
    }
  }, [pageIndex, ordering, debouncedSearch, selectedField]);

  const handleOpenModal = (info) => {
    setModalInfo(info);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalInfo(null);
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

  const prevRef = useRef({
    ordering,
    selectedField,
    debouncedSearch,
    pageIndex,
  });

  useEffect(() => {
    const prev = prevRef.current;
    const filtersChanged =
      prev.ordering !== ordering ||
      prev.selectedField !== selectedField ||
      prev.debouncedSearch !== debouncedSearch;

    if (filtersChanged && pageIndex !== 0) {
      setPageIndex(0);
      prevRef.current = {
        ordering,
        selectedField,
        debouncedSearch,
        pageIndex: 0,
      };
      return;
    }

    fetchMessages();

    prevRef.current = { ordering, selectedField, debouncedSearch, pageIndex };
  }, [ordering, selectedField, debouncedSearch, pageIndex, fetchMessages]);

  useEffect(() => {
    const id = setInterval(() => {
      fetchMessages();
    }, 60_000);
    return () => clearInterval(id);
  }, [fetchMessages]);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    const id = setInterval(() => {
      refreshToken();
    }, 2 * 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

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
      cell: (props) => 
      <Button size="sm" onClick={() => handleOpenModal(props.getValue())}
        _dark={{
          bg: "gray.700",
          color: "white",
          _hover: { bg: "gray.600" }
        }}
        _light={{
          bg: "#006FB3",
          color: "white",
          _hover: { bg: "#0083d3" }
        }} 
      >
        Ver
      </Button>
    },
    {
      accessorKey: 'mensaje_resultado_error', 
      header: 'Mensaje resultado (error)', 
      cell: (props) => 
      <Button size="sm" onClick={() => handleOpenModal(props.getValue())}
        _dark={{
          bg: "gray.700",
          color: "white",
          _hover: { bg: "gray.600" }
        }}
        _light={{
          bg: "#006FB3",
          color: "white",
          _hover: { bg: "#0083d3" }
        }} 
      >
        Ver
      </Button>
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
    manualSorting: true,
    manualPagination: true,
    getSortedRowModel: undefined,
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
                  fontSize={"0.8rem"}
                  minW={0}
                  flexShrink={1} 
                  textAlign="center" 
                >
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <Icon
                      as={
                        header.column.getIsSorted() === "asc"
                          ? LuArrowUp
                          : header.column.getIsSorted() === "desc"
                          ? LuArrowDown
                          : LuArrowDownUp
                      }
                      mx={1}
                      boxSize="0.8rem"
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    />
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
                  fontSize={"0.8rem"}
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
            pageIndex={pageIndex}
            pageCount={pageCount}
            setPageIndex={setPageIndex}
          />
        </Flex>
      </Box>        
      <Footer/>
      <InfoModal 
        isOpen={isOpen} 
        onClose={handleCloseModal} 
        info={modalInfo} 
      />
    </IdleTimerProvider>
  )
}
