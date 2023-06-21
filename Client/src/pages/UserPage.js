import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
// @mui
import {
  Card, Table, Stack, Button, Popover, TableRow, TableBody, TableCell,
  Container, Typography, IconButton, TableContainer, TablePagination, Paper
} from '@mui/material';
import SimCardDownloadRoundedIcon from '@mui/icons-material/SimCardDownloadRounded';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserModalEdit, UserModalDelete, UserModalNew } from '../sections/@dashboard/user';
// Services
import { GetUsers } from '../services/user-service';
import FileUploader from '../utils/insertExcel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'names', label: 'Name', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'delegation', label: 'Delegation', alignRight: false },
  { id: 'street', label: 'Direction', alignRight: false },
  { id: 'cp', label: 'Postal Code', alignRight: false },
  { id: 'cellphone', label: 'Cellphone', alignRight: false },
  { id: 'userType', label: 'Role', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('names');
  const [filterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usersList, setUsersList] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  // ----------------------------------------------------------------------

  useEffect(() => {
    Promise.resolve(
      GetUsers()
    ).then((response) => {
      setUsersList(response.map((user) => ({
        id: user._id,
        names: user.names,
        lastName: user.lastName,
        birthday: user.birthday,
        cellphone: user.cellphone,
        street: user.street,
        number: user.number,
        cp: user.cp,
        delegation: user.delegation,
        state: user.state,
        type: user.userType,
      })))
    })
  }, [setUsersList]);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersList.map((n) => n.names);

      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  const filteredUsers = applySortFilter(usersList, getComparator(order, orderBy), filterName);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>

        {/* ---------------------------------------------------------------------- */}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Stack direction={'row'} spacing={3} alignItems="center">

            <FileUploader />

            <CSVLink data={usersList} filename={'users_list.csv'} >
              <Button variant='contained' color='warning' startIcon={<SimCardDownloadRoundedIcon />} >
                Download
              </Button>
            </CSVLink>

            <UserModalNew />
          </Stack>
        </Stack>

        {/* ---------------------------------------------------------------------- */}

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={usersList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, names, lastName, cellphone, street, number, cp, delegation, state, type } = row;

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">{names} {lastName}</TableCell>
                        <TableCell align="left">{state}</TableCell>
                        <TableCell align="left">{delegation}</TableCell>
                        <TableCell align="left">{street} #{number}</TableCell>
                        <TableCell align="left">CP.{cp}</TableCell>
                        <TableCell align="left">{cellphone}</TableCell>
                        <TableCell align="left">{type}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => {
                            setOpen(event.currentTarget)
                            setUserSelected({ row })
                          }}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {emptyRows > 0 && (

                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {usersList.length === 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h3" paragraph>
                            Not data found
                          </Typography>

                          <Typography variant="body1">
                            No registers found <br /> Try checking the connection of the database.
                            <br /> Or insert the info from an existing excel file.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={usersList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <UserModalEdit row={userSelected} />
        <UserModalDelete row={userSelected} />
      </Popover>
    </>
  );
}
