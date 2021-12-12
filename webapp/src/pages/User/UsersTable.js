import {
    CircularProgress, Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, Typography, withStyles
} from "@material-ui/core";
import {useEffect, useState} from "react";
import { brown } from "@material-ui/core/colors";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {deleteUser, fetchUsers} from "../../api/userApi";

const columns = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'surname',
        label: 'Surname',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'fullname',
        label: 'Full name',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'identity',
        label: 'Identity',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'delete',
        label: 'Delete',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'update',
        label: 'Update',
        minWidth: 50,
        align: 'center',
    },
];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: brown[400],
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },

}))(TableRow);

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    tableName: {
        margin: theme.spacing(1),
    },
    spinner: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    paper: {
        backgroundColor: 'rgba(112, 62, 239, 0.01)',
        width: '100%',
    },
    table: {
        minWidth: 500,
    },
    head: {
        fontWeight: "bold",
    },
    topTable: {
        backgroundColor: 'rgba(112, 62, 239, 0.2)',
        textAlign: 'center',
    },
    body: {
        textAlign: 'center',
    },
    bodyRow: {
        "&:hover": {
            backgroundColor: `${brown[100]} !important`
        }
    },
}));

const UsersTable = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        loadUsers(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const loadUsers = (page, rowsPerPage) => {
        setIsLoading(true);
        fetchUsers(page, rowsPerPage)
            .then(response => {
                setUsers(response.data);
            }).catch((e) => {
            console.log(e)
        }).finally(() => {
            setIsLoading(false);
        })
    }
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0);
    }
    const handleDeleteClick = (id) => {
        setIsLoading(true);
        deleteUser(id)
            .then(() => {
                loadUsers();
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    return (
        <Container className={classes.main}>
            <Grid item xs={12} sm={6} md={3}>
                <Typography component="h1" variant="h5" className={classes.tableName}>
                    Users table
                </Typography>
            </Grid>
            <Grid item >
                {

                    isLoading ? (
                            <div className={classes.spinner} role="status">
                                <CircularProgress color="secondary"/>
                            </div>)

                        : (
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table stickyHeader root>
                                        <TableHead className={classes.topTable}>
                                            <TableRow>
                                                {columns.map(column => (
                                                    <StyledTableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{minWidth: column.minWidth}}
                                                    >
                                                        {column.label}
                                                    </StyledTableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className={classes.body}>
                                            {
                                                users._embedded.users
                                                    .map((user) => {
                                                        return (
                                                            <StyledTableRow key={user.id} hover className={classes.bodyRow}>
                                                                <StyledTableCell align='center'>{user.id}</StyledTableCell>
                                                                <StyledTableCell align='center'>{user.name}</StyledTableCell>
                                                                <StyledTableCell align='center'>{user.surname}</StyledTableCell>
                                                                <StyledTableCell align='center'>{user.fullName}</StyledTableCell>
                                                                <StyledTableCell align='center'>{user.identity}</StyledTableCell>
                                                                <StyledTableCell align='center'>
                                                                        <DeleteOutlinedIcon
                                                                            onClick={() => handleDeleteClick(user.id)}
                                                                        />
                                                                </StyledTableCell>
                                                                <StyledTableCell align='center'>
                                                                    <AddCircleIcon />
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        );
                                                    })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 50, 100]}
                                    component="div"
                                    count={users.page.totalElements}
                                    onPageChange={handlePageChange}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    page={page}
                                    rowsPerPage={rowsPerPage}/>
                            </Paper>
                        )
                }
            </Grid>
        </Container>
    );
}

export default UsersTable;
