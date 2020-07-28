import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SnippetContext = React.createContext();

export const SnippetProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [snippets, setSnippets] = useState(null);

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
                    return resp.json();
                }
                else { throw new Error("Unauthorized"); }
            }));
    }

    const addSnippet = (snippet, articleCategories) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(snippet, articleCategories),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

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

    const editSnippet = (id, snippet) => {
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

    return (
        <SnippetContext.Provider value={{ snippets, getSnippets, addSnippet, getSnippetById, deleteSnippet, editSnippet }}>
            {props.children}
        </SnippetContext.Provider>
    );
};