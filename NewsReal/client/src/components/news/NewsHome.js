import React, { useContext, useState, useEffect } from 'react';
import debounce from 'lodash.debounce'
import { CategoryContext } from '../../providers/CategoryProvider';
import { dummyData } from '../../providers/DummyData'
import { NewsContext } from '../../providers/NewsProvider';
import { Footer } from '../Footer';
import { Header } from '../Header';
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
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
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

export const NewsHome = () => {
    const classes = useStyles();
    const { news, getRecentNews } = useContext(NewsContext);
    const { categories, getCategories } = useContext(CategoryContext);

    const [newsReady, setNewsReady] = useState(true);

    useEffect(() => {
        getCategories();
    }, []);

    const [searching, setSearching] = useState(false);
    const [searchTerms, setSearchTerms] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState(null);
    const debounceSearchNews = debounce(setSearchTerms, 500);

    const handleSearchInput = (e) => {
        e.preventDefault();
        debounceSearchNews(e.target.value);
    };

    useEffect(() => {
        if (searchTerms === null || searchTerms === "") {
            setSearching(false);
        } else {
            const toLowerCriteria = searchTerms.toLowerCase();
            const articleSubset = dummyData.filter((a) => (a.title) ? a.title.toLowerCase().includes(toLowerCriteria) : null || (a.description) ? a.description.toLowerCase().includes(toLowerCriteria) : null);
            setFilteredArticles(articleSubset);
            setSearching(true);
        }
    }, [searchTerms]);

    return (
        <>
            <Header categories={categories} handleSearchInput={handleSearchInput} setNewsReady={setNewsReady} />
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {
                            (newsReady === true)
                                ? <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}><NewsList categories={categories} news={(filteredArticles !== null && searching) ? filteredArticles : dummyData} /></div>
                                : <div className={classes.loadingDiv}><CircularProgress status="loading" /></div>
                        }
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
}