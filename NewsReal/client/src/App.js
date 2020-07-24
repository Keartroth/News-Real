import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider, UserProfileContext } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import logo from './logo.svg';
import './App.css';

function App() {
  const { isLoggedIn } = useContext(UserProfileContext);
  return (
    <Router>
      <UserProfileProvider>
        {isLoggedIn ? <Header /> : ""}
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;