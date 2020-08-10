import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import debounce from 'lodash.debounce'
import { Header } from './components/Header';
import { ApplicationViews } from "./components/ApplicationViews";
import { CategoryContext } from "./providers/CategoryProvider";
import { NewsProvider } from './providers/NewsProvider';
import { SnippetProvider } from './providers/SnippetProvider';
import { UserProfileContext } from "./providers/UserProfileProvider";
import { SearchContext } from "./providers/SearchProvider";
// import logo from './logo.svg';
import './App.css';

export const App = () => {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { deleteSearchParameter } = useContext(SearchContext);
  const [searchTerms, setSearchTerms] = useState(null);
  const debounceSearch = debounce(setSearchTerms, 500);

  const handleSearchInput = (e) => {
    e.preventDefault();
    debounceSearch(e.target.value);
  };

  const initialSnackState = {
    snackOpen: false,
    vertical: 'top',
    horizontal: 'center',
    searchParameterTitle: "",
    searchParameterId: null,
  }

  const [snackState, setSnackState] = useState(initialSnackState);

  const { snackOpen } = snackState;

  const toggleSnack = (searchParameter) => {
    if (snackOpen) {
      setSnackState(initialSnackState);
    } else {
      setSnackState({ ...snackState, snackOpen: true, searchParameterTitle: searchParameter.title, searchParameterId: searchParameter.id });
    }
  };

  const nukeSearch = (id) => {
    deleteSearchParameter(id).then(toggleSnack);
  }

  useEffect(() => {
    if (isLoggedIn) {
      getCategories();
    }
  }, []);

  return (
    <Router>
      <NewsProvider>
        <SnippetProvider>
          {
            //Short circut evaluation is awesome
            isLoggedIn && <Header categories={categories} toggleSnack={toggleSnack} handleSearchInput={handleSearchInput} />
          }
          <ApplicationViews
            categories={categories}
            searchTerms={searchTerms}
            snackState={snackState}
            toggleSnack={toggleSnack}
            nukeSearch={nukeSearch}
          />
        </SnippetProvider>
      </NewsProvider>
    </Router>
  );
};