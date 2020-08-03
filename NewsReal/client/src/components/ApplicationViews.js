import React, { useContext, useState } from "react";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import { Login } from "./auth/Login";
import { NewsHome } from "./news/NewsHome";
import { Register } from "./auth/Register";
import { SnippetHome } from "./snippet/SnippetHome";
import { SnippetDetails } from "./snippet/SnippetDetails";
import { SnippetContext } from '../providers/SnippetProvider';
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ApplicationViews = props => {
    const { isLoggedIn } = useContext(UserProfileContext);
    const { deleteSnippet, getSnippets } = useContext(SnippetContext);
    const history = useHistory();
    let pathname = useLocation().pathname;

    //setState for deleting snippets and reference articles
    const [snippetDeleteState, setSnippetDeleteState] = useState({
        articleReferences: [],
    });

    const [snackState, setSnackState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
        snippetTitle: '',
    });

    // const { vertical, horizontal, snackOpen, snippetTitle } = snackState;

    const handleSnackClick = (title) => {
        setSnackState({ ...snackState, snackOpen: true, snippetTitle: title });
    };

    const handleSnackClose = () => {
        setSnackState({ ...snackState, snackOpen: false });
    };

    const nukeSnippet = (id) => {
        if (pathname === "/snippets") {
            deleteSnippet(snippetDeleteState.id).then(getSnippets).then(handleSnackClose);
        } else {
            deleteSnippet(snippetDeleteState.id).then(() => history.push("/"));
        }
    }

    //setState for editing snippets and reference articles
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
                        snackState={snackState}
                        nukeSnippet={nukeSnippet}
                        setSnackState={setSnackState}
                        handleSnackClick={handleSnackClick}
                        handleSnackClose={handleSnackClose}
                        snippetDeleteState={snippetDeleteState}
                        setSnippetDeleteState={setSnippetDeleteState}
                        snippetEditState={snippetEditState}
                        openSnippetEditModal={openSnippetEditModal}
                        handleSnippetEditModalChange={handleSnippetEditModalChange}
                    /> : <Redirect to="/login" />}
                </Route>

                <Route path="/" exact>
                    {isLoggedIn ? <NewsHome {...props} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/snippet/:id">
                    {isLoggedIn ? <SnippetDetails
                        snackState={snackState}
                        nukeSnippet={nukeSnippet}
                        setSnackState={setSnackState}
                        handleSnackClick={handleSnackClick}
                        handleSnackClose={handleSnackClose}
                        snippetDeleteState={snippetDeleteState}
                        setSnippetDeleteState={setSnippetDeleteState}
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