import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [categories, setCategories] = useState(null);
    const [categoriesReady, setCategoriesReady] = useState(null);

    useEffect(() => {
        if (categories !== null) {
            setCategoriesReady(true);
        }
    }, [categories]);

    const apiUrl = '/api/category'

    const getCategories = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json())
                .then(setCategories));
    };

    return (
        <CategoryContext.Provider value={{ categories, categoriesReady, getCategories }}>
            {props.children}
        </CategoryContext.Provider>
    );
};