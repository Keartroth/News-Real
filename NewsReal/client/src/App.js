import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { NewsProvider } from './providers/NewsProvider';
import { UserProfileProvider } from "./providers/UserProfileProvider";
// import logo from './logo.svg';
import './App.css';

export const App = () => {

  return (
    <Router>
      <UserProfileProvider>
        <NewsProvider>
          <ApplicationViews />
        </NewsProvider>
      </UserProfileProvider>
    </Router>
  );
}