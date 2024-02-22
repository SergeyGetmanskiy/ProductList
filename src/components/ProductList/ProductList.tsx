import { useState, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'id' | 'name' | 'brand' | 'price';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 30 },
  { id: 'name', label: 'Название', minWidth: 100 },
  { id: 'brand', label: 'Бренд', minWidth: 50 },
  {
    id: 'price',
    label: 'Цена',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  id: string;
  name: string;
  brand: string;
  price: number;
}

function createData(
  id: string,
  name: string,
  brand: string,
  price: number,
): Data {
  name = name + id;
  return { id, name, brand, price };
}

const rows = [
  createData('1', 'кофе', 'Nescafe', 50),
  createData('2', 'кофе', 'Nescafe', 50),
  createData('3', 'кофе', 'Nescafe', 50),
  createData('4', 'кофе', 'Nescafe', 50),
  createData('5', 'кофе', 'Nescafe', 50),
  createData('6', 'кофе', 'Nescafe', 50),
  createData('7', 'кофе', 'Nescafe', 50),
  createData('8', 'кофе', 'Nescafe', 50),
  createData('9', 'кофе', 'Nescafe', 50),
  createData('10', 'кофе', 'Nescafe', 50),
  createData('11', 'кофе', 'Nescafe', 50),
  createData('12', 'кофе', 'Nescafe', 50),
  createData('13', 'кофе', 'Nescafe', 50),
  createData('14', 'кофе', 'Nescafe', 50),
  createData('15', 'кофе', 'Nescafe', 50),
  createData('16', 'кофе', 'Nescafe', 50),
  createData('17', 'кофе', 'Nescafe', 50),
  createData('18', 'кофе', 'Nescafe', 50),
];

export default function ProductList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '60%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}