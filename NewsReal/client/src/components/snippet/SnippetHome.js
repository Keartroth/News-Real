import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import { SnippetList } from './SnippetList';
import { Footer } from '../Footer';
import { Header } from '../Header';
import debounce from 'lodash.debounce'
import { dummyData } from '../../providers/DummyData'
import { SnippetContext } from '../../providers/SnippetProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export const SnippetHome = () => {
    const classes = useStyles();
    const { snippets, getSnippets } = useContext(SnippetContext);
    const [snippetsReady, setSnippetsReady] = useState(false);

    useEffect(() => {
        getSnippets();
    }, []);

    useEffect(() => {
        if (snippets !== null && snippets.length > 0) {
            setSnippetsReady(true);
        } else if (snippets === null || snippets.length === 0) {
            setSnippetsReady(false);
        }
    }, [snippets]);

    const [searchTerms, setSearchTerms] = useState(null);
    const [filteredSnippets, setFilteredSnippets] = useState(null);
    const debounceSearchsnippets = debounce(setSearchTerms, 500);

    const handleSearchInput = (e) => {
        e.preventDefault();
        debounceSearchsnippets(e.target.value);
    };

    useEffect(() => {
        if (searchTerms === null || searchTerms === "") {
            setFilteredSnippets(snippets);
        } else {
            const toLowerCriteria = searchTerms.toLowerCase();
            const articleSubset = snippets.filter((a) => a.title.toLowerCase().includes(toLowerCriteria) || a.description.toLowerCase().includes(toLowerCriteria));
            setFilteredSnippets(articleSubset);
        }
    }, [searchTerms]);

    return (
        <>
            <Header handleSearchInput={handleSearchInput} setSnippetsReady={setSnippetsReady} />
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {
                            (snippetsReady === true)
                                ? <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}><SnippetList snippets={(filteredSnippets !== null) ? filteredSnippets : snippets} /></div>
                                : <div style={{ margin: 'auto' }}><CircularProgress status="loading" /></div>
                        }
                    </Container>
                    <Footer />
                </div>
            </div>
        </>
    );
}