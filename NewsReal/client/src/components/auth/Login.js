import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from '../../providers/UserProfileProvider';
import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    makeStyles,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://keartroth.github.io/" target="_blank" rel="noopener noreferrer">
                Michael Carroll
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random/?newspaper)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    foot: {
        bottom: theme.spacing(2),
        position: 'fixed',
        marginBottom: 'auto',
    },
}));

export const Login = () => {
    const classes = useStyles();
    const { login } = useContext(UserProfileContext);
    const history = useHistory();

    const [userInput, setUserInput] = useState({ showPassword: false })

    const handleClickShowPassword = () => {
        setUserInput({ ...userInput, showPassword: !userInput.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUserInput = (e) => {
        const updatedState = { ...userInput }
        updatedState[e.target.id] = e.target.value
        setUserInput(updatedState);
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        login(userInput.email, userInput.password)
            .then(() => history.push("/"))
            .catch((resp) => {
                alert("Invalid email or password");
            });
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={loginSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleUserInput}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={userInput.showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            onChange={handleUserInput}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {userInput.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={5} className={classes.foot}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}