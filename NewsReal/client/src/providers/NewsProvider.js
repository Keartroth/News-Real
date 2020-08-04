import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const NewsContext = React.createContext();

export const NewsProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [news, setNews] = useState(null);
    const [newsReady, setNewsReady] = useState(false);

    useEffect(() => {
        if (news !== null) {
            setNewsReady(true);
        }
    }, [news]);

    const apiUrl = '/api/news'

    const getRecentNews = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json())
                .then(setNews));
    };

    const getNewsByDefinedParameters = (searchParameters) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/searchnews/${searchParameters}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then(resp => resp.json())
            .then(setNews);
    };

    return (
        <NewsContext.Provider value={{ news, newsReady, setNewsReady, getRecentNews, getNewsByDefinedParameters }}>
            {props.children}
        </NewsContext.Provider>
    );
}