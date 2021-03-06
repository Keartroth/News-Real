import React, { useState, useEffect, createContext } from "react";
import { CircularProgress } from '@material-ui/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-25px 0 0 -25px',
    },
}));

export const UserProfileContext = createContext();

export const UserProfileProvider = (props) => {
    const classes = useStyles();
    const apiUrl = "/api/userprofile";

    const userProfile = sessionStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile !== null);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
                setIsLoggedIn(true);
            });
    };

    const logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                sessionStorage.clear()
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
            .then((savedUserProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
                setIsLoggedIn(true);
            });
    };

    const existingUserCheck = (email, displayName) => {
        return fetch(`${apiUrl}/existingusercheck/${email}&${displayName}`, {
            method: "GET"
        })
            .then(_ => _.json());
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfile)
            }).then(resp => resp.json()));
    };

    return (
        <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getToken, existingUserCheck }}>
            {
                (isFirebaseReady)
                    ? props.children
                    : <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress className={classes.CircularProgress} status="loading" /></div>
            }
        </UserProfileContext.Provider>
    );
}