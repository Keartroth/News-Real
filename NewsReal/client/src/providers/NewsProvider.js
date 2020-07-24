import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { CircularProgress } from '@material-ui/core';

export const NewsContext = React.createContext();

export const NewsProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [news, setNews] = useState(null);

    const apiUrl = '/api/news'

    const getRecentNews = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setNews));
    };

    return (
        <NewsContext.Provider value={{ news, getRecentNews }}>
            {props.children}
        </NewsContext.Provider>
    );
}