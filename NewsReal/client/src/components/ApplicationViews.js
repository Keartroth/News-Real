import React, { useContext, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { NewsHome } from "./news/NewsHome";
import { Register } from "./auth/Register";
import { SnippetHome } from "./snippet/SnippetHome";
import { SnippetDetails } from "./snippet/SnippetDetails";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ApplicationViews = props => {
    const { isLoggedIn } = useContext(UserProfileContext);
    const [openSnippetEditModal, setOpenSnippetEditModal] = useState(false);
    const [snippetEditState, setSnippetEditState] = useState(null);
    const handleSnippetEditModalChange = () => {
        setOpenSnippetEditModal(!openSnippetEditModal);
    }

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
                    {isLoggedIn ? <SnippetHome
                        {...props}
                        snippetEditState={snippetEditState}
                        setSnippetEditState={setSnippetEditState}
                        openSnippetEditModal={openSnippetEditModal}
                        handleSnippetEditModalChange={handleSnippetEditModalChange}
                    /> : <Redirect to="/login" />}
                </Route>

                <Route path="/" exact>
                    {isLoggedIn ? <NewsHome {...props} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/snippet/:id">
                    {isLoggedIn ? <SnippetDetails
                        snippetEditState={snippetEditState}
                        setSnippetEditState={setSnippetEditState}
                        openSnippetEditModal={openSnippetEditModal}
                        handleSnippetEditModalChange={handleSnippetEditModalChange}
                    /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};