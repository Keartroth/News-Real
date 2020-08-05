import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import { Login } from "./auth/Login";
import { NewsHome } from "./news/NewsHome";
import { Register } from "./auth/Register";
import { NewsContext } from '../providers/NewsProvider';
import { SnippetHome } from "./snippet/SnippetHome";
import { SnippetDetails } from "./snippet/SnippetDetails";
import { SnippetContext } from '../providers/SnippetProvider';
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ApplicationViews = (props) => {
    const { news } = useContext(NewsContext);
    const { isLoggedIn } = useContext(UserProfileContext);
    const { snippets, deleteSnippet, getSnippets, deleteSnippetReference, getSnippetById } = useContext(SnippetContext);
    const { searchTerms } = props;
    const history = useHistory();
    let pathname = useLocation().pathname;

    //search input on header
    const [searching, setSearching] = useState(false);
    const [filteredSnippets, setFilteredSnippets] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState(null);

    useEffect(() => {
        if (pathname === "/") {
            if (searchTerms === null || searchTerms === "") {
                setSearching(false);
            } else {
                const toLowerCriteria = searchTerms.toLowerCase();
                const articleSubset = news.filter((a) => (a.title) ? a.title.toLowerCase().includes(toLowerCriteria) : null || (a.description) ? a.description.toLowerCase().includes(toLowerCriteria) : null);
                setFilteredArticles(articleSubset);
                setSearching(true);
            }
        } else if (pathname === "/snippets") {
            if (searchTerms === null || searchTerms === "") {
                setSearching(false);
            } else {
                const toLowerCriteria = searchTerms.toLowerCase();
                const articleSubset = snippets.filter((a) => (a.userTitle) ? a.userTitle.toLowerCase().includes(toLowerCriteria) : null || (a.description) ? a.description.toLowerCase().includes(toLowerCriteria) : null || (a.title) ? a.title.toLowerCase().includes(toLowerCriteria) : null);
                setFilteredSnippets(articleSubset);
                setSearching(true);
            }
        }
    }, [searchTerms]);

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
                        searching={searching}
                        filteredSnippets={filteredSnippets}
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
                    {isLoggedIn ? <NewsHome
                        {...props}
                        searching={searching}
                        filteredArticles={filteredArticles}
                    /> : <Redirect to="/login" />}
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