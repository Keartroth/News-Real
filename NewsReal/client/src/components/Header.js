import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Header = props => {
    const { logout } = useContext(UserProfileContext);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography component="h1" variant="h6" className={classes.title}>
                        NewsReal
                    </Typography>
                    <Typography component="h1" variant="h6" className={classes.title}>
                        <Link href="/" color="inherit" variant="body2">
                            News
                        </Link>
                    </Typography>
                    <Typography component="h1" variant="h6" className={classes.title}>
                        <Link href="/snippets" color="inherit" variant="body2">
                            Saved Snippets
                        </Link>
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={logout}>
                        <ExitToAppRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}