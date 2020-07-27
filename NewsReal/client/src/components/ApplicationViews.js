import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NewsHome } from "./news/NewsHome";
import { SnippetHome } from "./snippet/SnippetHome";

export const ApplicationViews = props => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/snippets">
                    {isLoggedIn ? <SnippetHome {...props} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/" exact>
                    {isLoggedIn ? <NewsHome {...props} /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};