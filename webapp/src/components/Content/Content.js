import {Container} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import UsersTable from "../../pages/User/UsersTable";
import UserForm from "../../pages/User/UserForm";
import About from "../../pages/About/About";
import Search from "../Search/Search";

const Content = () => {
    return (
        <Container>
            <Switch>
                <Route exact path="/">
                    <UsersTable />
                </Route>
                <Route path="/createUser">
                    <UserForm />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
            </Switch>
        </Container>
    );
}

export default Content;
