import React, { useContext, useState, useEffect } from 'react';
import debounce from 'lodash.debounce'
import { SnippetContext } from '../../providers/SnippetProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { SnippetList } from './SnippetList';
import { Footer } from '../Footer';
import { Header } from '../Header';
import {
    CircularProgress,
    Container,
    CssBaseline
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        padding: theme.spacing(1),
    },
}));

export const SnippetHome = (props) => {
    const classes = useStyles();
    const { snippets, getSnippets } = useContext(SnippetContext);
    const { categories, getCategories } = useContext(CategoryContext);
    const [snippetsReady, setSnippetsReady] = useState(false);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        setSnippetsReady(false);
        getSnippets();
        getCategories();
    }, []);

    useEffect(() => {
        if (snippets !== null && snippets.length > 0) {
            setSnippetsReady(true);
            setSearching(false);
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
            <Header categories={categories} handleSearchInput={handleSearchInput} setSnippetsReady={setSnippetsReady} />
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {
                            (snippetsReady === true)
                                ? <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}><SnippetList {...props} searching={searching} snippets={(filteredSnippets !== null) ? filteredSnippets : snippets} /></div>
                                : <div style={{ margin: 'auto' }}><CircularProgress status="loading" /></div>
                        }
                    </Container>
                    <Footer />
                </div>
            </div>
        </>
    );
}