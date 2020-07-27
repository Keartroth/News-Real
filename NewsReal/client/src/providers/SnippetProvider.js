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

    return (
        <SnippetContext.Provider value={{ snippets, getSnippets }}>
            {props.children}
        </SnippetContext.Provider>
    );
};