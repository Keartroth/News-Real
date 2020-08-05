import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import debounce from 'lodash.debounce'
import { Header } from './components/Header';
import { ApplicationViews } from "./components/ApplicationViews";
import { CategoryProvider } from "./providers/CategoryProvider";
import { NewsProvider } from './providers/NewsProvider';
import { SnippetProvider } from './providers/SnippetProvider';
import { UserProfileProvider } from "./providers/UserProfileProvider";
// import logo from './logo.svg';
import './App.css';

export const App = () => {
  const [searchTerms, setSearchTerms] = useState(null);
  const debounceSearch = debounce(setSearchTerms, 500);

  const handleSearchInput = (e) => {
    e.preventDefault();
    debounceSearch(e.target.value);
  };

  return (
    <Router>
      <UserProfileProvider>
        <NewsProvider>
          <SnippetProvider>
            <CategoryProvider>
              <Header
                handleSearchInput={handleSearchInput}
              />
              <ApplicationViews
                searchTerms={searchTerms}
              />
            </CategoryProvider>
          </SnippetProvider>
        </NewsProvider>
      </UserProfileProvider>
    </Router>
  );
};