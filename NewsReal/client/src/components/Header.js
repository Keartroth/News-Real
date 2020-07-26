import React, { useContext } from 'react';
import clsx from 'clsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mainSearchItems, secondarySearchItems } from './search/Search';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { NewsContext } from '../providers/NewsProvider';

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
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

export const Header = props => {
    const { logout } = useContext(UserProfileContext);
    const { getRecentNews, getNewsByDefinedParameters } = useContext(NewsContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerChange = () => {
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
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerChange}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.menuButtonHidden]: open,
                        })}
                    ><MenuIcon />
                    </IconButton>
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
            <Drawer
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
                    <IconButton onClick={handleDrawerChange}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainSearchItems}</List>
                <Divider />
                <List>{secondarySearchItems}</List>
            </Drawer>
        </div>
    );
}