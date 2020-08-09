import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SearchContext = React.createContext();

export const SearchProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    //useState for getSearchParameters
    const [searchParameters, setSearchParameters] = useState(null);
    const [searchParametersReady, setSearchParametersReady] = useState(false);
    //useState for getSearchParameter
    const [searchParameter, setSearchParameter] = useState(null);
    const [searchParameterReady, setSearchParameterReady] = useState(false);

    useEffect(() => {
        if (searchParameters !== null) {
            debugger
            setSearchParametersReady(true);
        }
    }, [searchParameters]);

    useEffect(() => {
        if (searchParameter !== null) {
            setSearchParameterReady(true);
        }
    }, [searchParameter]);

    const apiUrl = '/api/searchparameter'

    const getSearchParameters = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json())
                .then(setSearchParameters));
    };

    const getSearchParameterById = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setSearchParameter);
                }
                else { throw new Error("Unauthorized"); }
            }));
    }

    const addSearchParameter = (searchParameter) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchParameter),
            }).then(resp => {
                if (resp.ok) {
                    getSearchParameters();
                }
                throw new Error("Unauthorized");
            }));
    };

    const deleteSearchParameter = (id) => {
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
                throw new Error("Failed to delete search parameters.")
            })
        );
    };

    const updateSearchParameter = (id, searchParameter) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchParameter),
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }))
    };

    return (
        <SearchContext.Provider value={{
            searchParameters, searchParametersReady, searchParameterReady,
            getSearchParameters, getSearchParameterById, addSearchParameter,
            deleteSearchParameter, updateSearchParameter
        }}>
            {props.children}
        </SearchContext.Provider>
    );
}