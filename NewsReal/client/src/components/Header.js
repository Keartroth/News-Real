import React, { useContext, useState } from 'react';
import { useLocation, NavLink } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { NewsContext } from '../providers/NewsProvider';
import { SnippetContext } from '../providers/SnippetProvider';
import { Search } from './search/Search';
import clsx from 'clsx';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    InputBase,
    Link,
    Toolbar,
    Typography,
    CssBaseline
} from '@material-ui/core';
import {
    fade,
    makeStyles
} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

export const Header = (props) => {
    const classes = useStyles();
    const { handleSearchInput, categories } = props;
    const { logout } = useContext(UserProfileContext);
    const { newsReady } = useContext(NewsContext);
    const { snippetsReady } = useContext(SnippetContext);
    let pathname = useLocation().pathname;

    const [open, setOpen] = useState(false);
    const toggleDrawerChange = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {
                        (pathname === "/") && <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawerChange}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.menuButtonHidden]: open,
                            })}
                        ><MenuIcon />
                        </IconButton>
                    }
                    <Typography component="h1" variant="h6" className={classes.title}>
                        NewsReal
                    </Typography>
                    <Typography component="h1" variant="h6" className={classes.title}>
                        <Link component={NavLink} to="/" color="inherit" variant="body2">
                            News
                        </Link>
                    </Typography>
                    <Typography component="h1" variant="h6" className={classes.title}>
                        <Link component={NavLink} to="/snippets" color="inherit" variant="body2">
                            Saved Snippets
                        </Link>
                    </Typography>
                    {
                        (pathname === "/" || pathname === "/snippets") && <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search Present List…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearchInput}
                                disabled={((pathname === "/" && newsReady) || (pathname === "/snippets" && snippetsReady)) ? false : true}
                            />
                        </div>
                    }
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={logout}>
                        <ExitToAppRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {
                (pathname === "/") && categories && <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={toggleDrawerChange}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Search {...props} open={open} classes={classes} toggleDrawerChange={toggleDrawerChange} />
                </Drawer>
            }
        </div>
    );
};