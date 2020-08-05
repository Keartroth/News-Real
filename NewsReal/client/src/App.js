import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import debounce from 'lodash.debounce'
import { Header } from './components/Header';
import { ApplicationViews } from "./components/ApplicationViews";
import { CategoryContext } from "./providers/CategoryProvider";
import { NewsProvider } from './providers/NewsProvider';
import { SnippetProvider } from './providers/SnippetProvider';
import { UserProfileContext } from "./providers/UserProfileProvider";
// import logo from './logo.svg';
import './App.css';

export const App = () => {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const [searchTerms, setSearchTerms] = useState(null);
  const debounceSearch = debounce(setSearchTerms, 500);

  const handleSearchInput = (e) => {
    e.preventDefault();
    debounceSearch(e.target.value);
  };

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
            isLoggedIn && <Header categories={categories} handleSearchInput={handleSearchInput} />
          }
          <ApplicationViews categories={categories} searchTerms={searchTerms} />
        </SnippetProvider>
      </NewsProvider>
    </Router>
  );
};