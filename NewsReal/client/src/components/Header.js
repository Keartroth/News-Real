import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import { UserProfileContext } from "../providers/UserProfileProvider";

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

export const Header = () => {
    const { logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" isOpen={isOpen}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/news" variant="body2">
                            News
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/snippets" variant="body2">
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