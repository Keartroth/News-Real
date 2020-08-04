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
    const { deleteSnippet, getSnippets, deleteSnippetReference, getSnippetById } = useContext(SnippetContext);
    const history = useHistory();
    let pathname = useLocation().pathname;

    //setState for deleting snippets and reference articles
    const [snippetDeleteState, setSnippetDeleteState] = useState({
        articleReferences: [],
    });

    const initialSnackState = {
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
        snippetTitle: '',
        snippetBool: null,
        snippetId: null,
    }

    const [snackState, setSnackState] = useState(initialSnackState);

    const { snackOpen } = snackState;

    const toggleSnack = (title, bool, id) => {
        if (snackOpen) {
            setSnackState(initialSnackState);
        } else {
            setSnackState({ ...snackState, snackOpen: true, snippetTitle: title, snippetBool: bool, snippetId: id });
        }
    };

    const nukeSnippet = (articleId) => {
        const referenceBool = snackState.snippetBool;
        const id = snackState.snippetId;
        if (pathname === "/snippets") {
            deleteSnippet(articleId).then(getSnippets).then(toggleSnack);
        } else if (referenceBool) {
            deleteSnippet(articleId).then(() => {
                history.push("/snippets");
                toggleSnack();
            });
        } else if (!referenceBool) {
            deleteSnippetReference(articleId).then(() => getSnippetById(id));
            toggleSnack();
        }
    }

    //setState for editing snippets and reference articles
    const [openSnippetEditModal, setOpenSnippetEditModal] = useState(false);
    const [snippetEditState, setSnippetEditState] = useState(null);
    const toggleSnippetEditModalChange = () => {
        setOpenSnippetEditModal(!openSnippetEditModal);
    }

    return (
        <main style={{ height: '100%' }}>
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
                        toggleSnack={toggleSnack}
                        snippetDeleteState={snippetDeleteState}
                        setSnippetDeleteState={setSnippetDeleteState}
                        snippetEditState={snippetEditState}
                        openSnippetEditModal={openSnippetEditModal}
                        toggleSnippetEditModalChange={toggleSnippetEditModalChange}
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
                        toggleSnack={toggleSnack}
                        snippetDeleteState={snippetDeleteState}
                        setSnippetDeleteState={setSnippetDeleteState}
                        snippetEditState={snippetEditState}
                        setSnippetEditState={setSnippetEditState}
                        openSnippetEditModal={openSnippetEditModal}
                        toggleSnippetEditModalChange={toggleSnippetEditModalChange}
                    /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};