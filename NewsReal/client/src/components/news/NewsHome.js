import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../../providers/NewsProvider';
import { DeleteSearchSnackbar } from "../dialog/DeleteSearchSnackbar";
import { Footer } from '../Footer';
import { NewsList } from './NewsList';
import {
    Container,
    CssBaseline,
    CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-25px 0 0 -25px',
    },
    container: {
        flexGrow: 1,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        padding: theme.spacing(3),
    },
    loadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50%',
    },
}));

export const NewsHome = (props) => {
    const classes = useStyles();
    const { filteredArticles, searching } = props;
    const { news, newsReady, getRecentNews } = useContext(NewsContext);

    useEffect(() => {
        getRecentNews();
    }, []);

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <DeleteSearchSnackbar {...props} />
                <div className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {
                            (newsReady === true)
                                ? <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}><NewsList {...props} news={(filteredArticles !== null && searching) ? filteredArticles : news} /></div>
                                : <div className={classes.loadingDiv}><CircularProgress className={classes.circularProgress} status="loading" /></div>
                        }
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
}