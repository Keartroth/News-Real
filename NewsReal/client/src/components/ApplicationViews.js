import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const ApplicationViews = () => {
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

                <Route path="/" exact>
                    {isLoggedIn ? "" : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};