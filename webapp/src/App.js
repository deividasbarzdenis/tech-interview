import {Container, createTheme, CssBaseline, makeStyles, ThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import { blueGrey } from "@material-ui/core/colors";
import cover from './assets/cover.jpg'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: blueGrey,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

const useStyles = makeStyles({
  root: {
    //minHeight: '100vh',
    //position: "absolute",
    top: 0,
    right: 0,
    //height: "100%",
    width: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + cover})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
})

function App() {
  const classes = useStyles();
  return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Router>
            <CssBaseline/>
            <Header/>
            <Container component="main" className={classes.main}>
              <Content/>
            </Container>
            <Footer/>
          </Router>
        </div>
      </ThemeProvider>
  );
}

export default App;
