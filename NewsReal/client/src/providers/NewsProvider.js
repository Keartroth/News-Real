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
        debugger
        return getToken().then((token) =>
            fetch(apiUrl + `/searchnews/${searchParameters}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then(resp => resp.json())
            .then(setNews);
    };

    const getArticleNLPAnalysis = (type, url) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/analyzenews?type=${type}&url=${url}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then(resp => resp.json());
    };

    return (
        <NewsContext.Provider value={{ news, newsReady, setNewsReady, getRecentNews, getNewsByDefinedParameters, getArticleNLPAnalysis }}>
            {props.children}
        </NewsContext.Provider>
    );
}