import React, { useContext } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";
import { ApplicationViews } from "./components/ApplicationViews";
import { Header } from "./components/Header";
import logo from './logo.svg';
import './App.css';
import { NewsProvider } from './providers/NewsProvider';

export const App = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Router>
      <NewsProvider>
        {isLoggedIn ? <Header /> : ""}
        <ApplicationViews />
      </NewsProvider>
    </Router>
  );
}