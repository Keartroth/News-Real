import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import { NewsList } from './NewsList';
import { NewsContext } from '../../providers/NewsProvider';
import { Footer } from '../Footer';
import { Header } from '../Header';
import debounce from 'lodash.debounce'
import { CategoryContext } from '../../providers/CategoryProvider';
import { dummyData } from '../../providers/DummyData'

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

export const NewsHome = () => {
    const classes = useStyles();
    const { news, getRecentNews } = useContext(NewsContext);
    const { categories, getCategories } = useContext(CategoryContext);

    const [newsReady, setNewsReady] = useState(true);

    useEffect(() => {
        getCategories();
    }, []);

    // useEffect(() => {
    //     getRecentNews();
    // }, []);

    // useEffect(() => {
    //     if (news !== null && news.length > 0) {
    //         setNewsReady(true);
    //     } else if (news === null || news.length === 0) {
    //         setNewsReady(false);
    //     }
    // }, [news]);

    const [searchTerms, setSearchTerms] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState(null);
    const debounceSearchNews = debounce(setSearchTerms, 500);

    const handleSearchInput = (e) => {
        e.preventDefault();
        debounceSearchNews(e.target.value);
    };

    useEffect(() => {
        if (searchTerms === null || searchTerms === "") {
            setFilteredArticles(dummyData);
        } else {
            const toLowerCriteria = searchTerms.toLowerCase();
            const articleSubset = dummyData.filter((a) => a.title.toLowerCase().includes(toLowerCriteria) || a.description.toLowerCase().includes(toLowerCriteria));
            setFilteredArticles(articleSubset);
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
                                ? <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}><NewsList categories={categories} news={(filteredArticles !== null) ? filteredArticles : dummyData} /></div>
                                : <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress status="loading" /></div>
                        }
                    </Container>
                    <Footer />
                </div>
            </div>
        </>
    );
}