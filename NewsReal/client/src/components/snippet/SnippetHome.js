import React, { useContext, useEffect } from 'react';
import { SnippetContext } from '../../providers/SnippetProvider';
import { SnippetList } from './SnippetList';
import { Footer } from '../Footer';
import {
    CircularProgress,
    Container,
    CssBaseline
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    appBarSpacer: theme.mixins.toolbar,
    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-25px 0 0 -25px',
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        padding: theme.spacing(3),
    },
}));

export const SnippetHome = (props) => {
    const classes = useStyles();
    const { filteredSnippets, searching } = props;
    const { snippets, snippetsReady, getSnippets } = useContext(SnippetContext);

    useEffect(() => {
        getSnippets();
    }, []);

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {
                            (snippetsReady)
                                ? <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}><SnippetList {...props} snippets={(filteredSnippets !== null && searching) ? filteredSnippets : snippets} /></div>
                                : <div style={{ margin: 'auto' }}><CircularProgress className={classes.CircularProgress} status="loading" /></div>
                        }
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
}