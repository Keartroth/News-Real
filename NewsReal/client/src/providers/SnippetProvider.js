import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SnippetContext = React.createContext();

export const SnippetProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    //useState for getSnippets
    const [snippets, setSnippets] = useState(null);
    const [snippetsReady, setSnippetsReady] = useState(snippets !== null);
    //useState for getSnippetById
    const [snippet, setSnippet] = useState(null);
    const [snippetReady, setSnippetReady] = useState(snippet !== null);

    useEffect(() => {
        if (snippets !== null) {
            setSnippetsReady(true);
        }
    }, [snippets]);

    useEffect(() => {
        if (snippet !== null) {
            setSnippetReady(true);
        }
    }, [snippet]);

    const apiUrl = '/api/snippet'

    const getSnippets = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json())
                .then(setSnippets));
    };

    const getSnippetById = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setSnippet);
                }
                else { throw new Error("Unauthorized"); }
            }));
    }

    const addSnippet = (snippet) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(snippet),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }))
    };

    const deleteSnippet = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete snippet.")
            })
        );
    };

    const updateSnippet = (id, snippet) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(snippet),
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }))
    };

    // snippetReference functions
    const addSnippetReference = (snippetReference) => {
        return getToken().then((token) =>
            fetch(apiUrl + '/addsnippetreferrence', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(snippetReference),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }))
    };

    const deleteSnippetReference = (articleId, referenceArticleId) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/id=${articleId}&referenceArticleId=${referenceArticleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete snippet.")
            })
        );
    };

    return (
        <SnippetContext.Provider value={{
            snippet, snippets, snippetsReady, snippetReady,
            getSnippets, addSnippet, getSnippetById, deleteSnippet,
            updateSnippet, addSnippetReference, deleteSnippetReference, setSnippets
        }}>
            {props.children}
        </SnippetContext.Provider>
    );
};