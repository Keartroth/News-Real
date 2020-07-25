import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CircularProgress } from '@material-ui/core';
import { mainSearchItems, secondarySearchItems } from '../search/Search';
import { ArticleList } from '../article/ArticleList';
import { NewsContext } from '../../providers/NewsProvider';
import { Footer } from '../Footer';

const dummyData = [
    {
        author: "SeekingAlpha.com",
        category: [
            "business",
            "finance"
        ],
        description: "",
        id: "1736fcea-1dfb-4171-ba6c-87c35a75dfe4",
        image: "None",
        language: "en",
        published: "2020-07-24 16:04:46 +0000",
        title: "Twitter: Ripe Time To Buy",
        url: "https://seekingalpha.com/article/4360626-twitter-ripe-time-to-buy?source=feed_tag_editors_picks"
    },
    {
        author: "ANDRE CHUMKO",
        category: [
            "general"
        ],
        description: "The director-general of health scored a try in the first half, playing as a flanker for the Centurions XV at Wainuiomata....",
        id: "11059dff-1653-4da7-a926-fa42addd21e5",
        image: "https://resources.stuff.co.nz/content/dam/images/4/y/n/g/b/7/image.related.StuffLandscapeSixteenByNine.1420x800.20s72o.png/1595658274176.jpg",
        language: "en",
        published: "2020-07-25 06:24:31 +0000",
        title: "Dr Ashley Bloomfield helps his Centurions XV team win the parliamentary rugby match",
        url: "https://www.stuff.co.nz/sport/rugby/122247888/dr-ashley-bloomfield-helps-his-centurions-xv-team-win-the-parliamentary-rugby-match"
    },
    {
        author: "Stuff",
        category: [
            "general"
        ],
        description: "Police called to a serious car crash in Hastings conform one person has died....",
        id: "56dd01de-68b9-4fab-8f2f-a893d0eea01c",
        image: "https://resources.stuff.co.nz/content/dam/images/4/y/m/l/n/0/image.related.StuffLandscapeSixteenByNine.1420x800.20s7mq.png/1595660949394.jpg",
        language: "en",
        published: "2020-07-25 07:09:07 +0000",
        title: "One person dead after two-car crash in Hastings",
        url: "https://www.stuff.co.nz/dominion-post/news/hawkes-bay/122248610/one-person-dead-after-twocar-crash-in-hastings"
    },
    {
        author: "PHILLIP ROLLO",
        category: [
            "general"
        ],
        description: "Adelaide goalkeeper makes crucial save to salvage draw against makeshift Phoenix squad....",
        id: "33325ebe-3b8c-4a96-bf17-fd507f746bd9",
        image: "https://resources.stuff.co.nz/content/dam/images/4/y/n/g/e/b/image.related.StuffLandscapeSixteenByNine.1420x800.20s7wr.png/1595670998946.jpg",
        language: "en",
        published: "2020-07-25 09:56:36 +0000",
        title: "Wellington Phoenix held by Adelaide United after Ulises Davila misses late penalty",
        url: "https://www.stuff.co.nz/sport/football/a-league/122248971/wellington-phoenix-held-by-adelaide-united-after-ulises-davila-misses-late-penalty"
    }
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export const Home = props => {
    const classes = useStyles();
    const open = props.open
    const handleDrawerChange = props.handleDrawerChange
    const { news, getRecentNews, getNewsByDefinedParameters } = useContext(NewsContext)

    const [newsReady, setNewsReady] = useState(true);

    // useEffect(() => {
    //     getRecentNews().then(resp => {
    //         setNewsReady(!newsReady)
    //     });
    // }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
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
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {
                        (newsReady === true)
                            ? <ArticleList news={dummyData} />
                            : <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress status="loading" /></div>
                    }
                </Container>
                <Footer />
            </main>
        </div>
    );
}