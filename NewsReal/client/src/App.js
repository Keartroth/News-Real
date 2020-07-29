import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { CategoryProvider } from "./providers/CategoryProvider";
import { NewsProvider } from './providers/NewsProvider';
import { SnippetProvider } from './providers/SnippetProvider';
import { UserProfileProvider } from "./providers/UserProfileProvider";
// import logo from './logo.svg';
import './App.css';

export const App = () => {

  return (
    <Router>
      <UserProfileProvider>
        <NewsProvider>
          <SnippetProvider>
            <CategoryProvider>
              <ApplicationViews />
            </CategoryProvider>
          </SnippetProvider>
        </NewsProvider>
      </UserProfileProvider>
    </Router>
  );
};