import {Container, CssBaseline, Link, makeStyles, Typography} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000">
                Map
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer: {
        marginTop: theme.spacing(150),
        background: 'none',
        padding: theme.spacing(3, 2),
        //marginTop: 'auto',
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <footer className={classes.footer}>
                <Container >
                    <Typography variant="body1">My  footer is here.</Typography>
                    <Copyright />
                </Container>
            </footer>

        </div>
    );
}

export default Footer;

