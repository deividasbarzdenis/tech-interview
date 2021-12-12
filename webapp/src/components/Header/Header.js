import {
    AppBar,
    Avatar, Button,
    IconButton,
    makeStyles, Menu, MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import AllInclusiveOutlinedIcon from '@material-ui/icons/AllInclusiveOutlined';
import {NavLink} from "react-router-dom";
import {grey, brown, lightGreen} from "@material-ui/core/colors";
import SortIcon from "@material-ui/icons/Sort";
import {useState} from "react";
import TableChartIcon from '@material-ui/icons/TableChart';
import MapIcon from '@material-ui/icons/Map';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SearchIcon from "@material-ui/icons/Search";

const menuItems = [
    {
        index: 0,
        title: "Search",
        icon: <SearchIcon color="secondary"/>,
        pageUrl: "/search"
    },
    {
        index: 1,
        title: "Users Table",
        icon: <TableChartIcon color="secondary"/>,
        pageUrl: "/"
    },
    {
        index: 2,
        title: "Create User",
        icon: <PersonAddAltOutlinedIcon />,
        pageUrl: "/createUser"
    },
    {
        index: 3,
        title: "About",
        icon: <MapIcon color="secondary"/>,
        pageUrl: "/about"
    },
]
const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',

        },
        appbar: {
            background: 'none',
        },
        appBarTitle: {
            flexGrow: '1',
            fontSize: '2.0rem',
            textDecoration: 'none',
            color: brown[400],
        },
        appBarTitle1: {
            color: lightGreen[500]
        },
        appBarTitle2: {
            color: brown[400]
        },
        avatar: {
            backgroundColor: lightGreen[500],
            color: brown[400],
        },
        menuButton: {},
        dropMenu: {
        },
        dropMenuText: {
            textDecoration: 'none',
            color: grey[700]
        },
        headerButtons: {

        },
        btColor: {},
    }
})

const Header = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClick = () => {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Avatar className={classes.avatar}>
                        <AllInclusiveOutlinedIcon/>
                    </Avatar>
                    <NavLink exact to="/" className={classes.appBarTitle}>
                        <Typography variant="h5" component="h2" className={classes.appBarTitle} color="secondary">
                            Users
                            <span className={classes.appBarTitle1}>-->
                                <span className={classes.appBarTitle2}>Table</span>
                            </span>
                        </Typography>
                    </NavLink>
                    {isMobile ? (
                        <>
                            <IconButton
                                className={classes.menuButton}
                                onClick={handleMenu}
                            >
                                <SortIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuItems.map(({index, title, pageUrl}) => {
                                    return (
                                        <MenuItem className={classes.dropMenu}  key={index}>
                                            <NavLink
                                                className={classes.dropMenuText}
                                                to={pageUrl}
                                                onClick={() => handleMenuClick()}>
                                                {title}
                                            </NavLink>
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        </>
                    ) : (
                        <div className={classes.headerButtons}>
                            {menuItems.map(({title, pageUrl, index, icon}) => {
                                return (
                                    <Button
                                        key={index}
                                        className={classes.btColor}
                                        component={NavLink}
                                        to={pageUrl}
                                        startIcon={icon}
                                    >
                                        {title}
                                    </Button>
                                )
                            })}
                        </div>
                    )}

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
