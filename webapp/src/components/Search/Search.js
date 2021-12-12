import {useEffect, useState} from "react";
import {findByNameIsLike} from "../../api/userApi";
import {
    Container, Grid,
    makeStyles, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import {brown} from "@material-ui/core/colors";

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
    paper: {
        backgroundColor: 'rgba(112, 62, 239, 0.01)',
        width: '100%',
    },
    table: {
        width: 1200,
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
    searchBar: {
        backgroundColor: 'rgba(60, 60, 60, 0.2)'
    }
}));

const Search = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [searched, setSearched] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(20);

    useEffect(() => {
        loadUsersByName(searched, page, rowsPerPage);
    }, [searched, page, rowsPerPage]);

    const loadUsersByName = (searched, page, rowsPerPage) => {
        findByNameIsLike(searched, page, rowsPerPage)
            .then(response => {
                setUsers(response.data._embedded.users);
            }).catch((e) => {
            console.log(e)
        })
    }

    const cancelSearch = () => {
        setSearched("");
        loadUsersByName(searched);
    };
    return (
        <Container className={classes.main}>
            <Grid item>
                <Paper className={classes.paper}>
                    <SearchBar
                        className={classes.searchBar}
                        value={searched}
                        onChange={(searchVal) => loadUsersByName(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                    <TableContainer>
                        <Table stickyHeader className={classes.table}>
                            <TableHead className={classes.topTable}>
                                <TableRow>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Surname</StyledTableCell>
                                    <StyledTableCell align="center">Full name</StyledTableCell>
                                    <StyledTableCell align="center">Identity</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <StyledTableRow key={user.id} hover className={classes.bodyRow}>
                                        <StyledTableCell align="center">{user.name}</StyledTableCell>
                                        <StyledTableCell align="center">{user.surname}</StyledTableCell>
                                        <StyledTableCell align="center">{user.fullName}</StyledTableCell>
                                        <StyledTableCell align="center">{user.identity}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Container>
    );
}

export default Search;


