import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { NewsProvider } from './providers/NewsProvider';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
// import logo from './logo.svg';
import './App.css';
import { SnippetProvider } from './providers/SnippetProvider';

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