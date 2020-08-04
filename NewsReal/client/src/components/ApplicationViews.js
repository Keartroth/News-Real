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

    const [snackState, setSnackState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
        snippetTitle: '',
        snippetBool: null,
        snippetId: null,
    });

    const handleSnackClick = (title, bool, id) => {
        setSnackState({ ...snackState, snackOpen: true, snippetTitle: title, snippetBool: bool, snippetId: id });
    };

    const handleSnackClose = () => {
        setSnackState({ ...snackState, snackOpen: false, snippetBool: null, id: null, });
    };

    const nukeSnippet = (articleId) => {
        const referenceBool = snackState.snippetBool;
        const id = snackState.snippetId;
        if (pathname === "/snippets") {
            deleteSnippet(articleId).then(getSnippets).then(handleSnackClose);
        } else if (referenceBool) {
            deleteSnippet(articleId).then(() => {
                history.push("/snippets");
                handleSnackClose();
            });
        } else if (!referenceBool) {
            deleteSnippetReference(articleId).then(() => getSnippetById(id));
            handleSnackClose();
        }
    }

    //setState for editing snippets and reference articles
    const [openSnippetEditModal, setOpenSnippetEditModal] = useState(false);
    const [snippetEditState, setSnippetEditState] = useState(null);
    const handleSnippetEditModalChange = () => {
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