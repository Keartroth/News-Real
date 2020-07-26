import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import { ArticleList } from '../article/ArticleList';
import { NewsContext } from '../../providers/NewsProvider';
import { Footer } from '../Footer';
import { Header } from '../Header';
import debounce from 'lodash.debounce'
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
    },
}));

export const Home = () => {
    const classes = useStyles();
    const { news, getRecentNews } = useContext(NewsContext);
    const [newsReady, setNewsReady] = useState(true);

    // useEffect(() => {
    //     getRecentNews().then(resp => {
    //         setNewsReady(!newsReady)
    //     });
    // }, []);

    const [searchTerms, setSearchTerms] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const debounceSearchNews = debounce(setSearchTerms, 500);

    const handleSearchInput = (e) => {
        e.preventDefault();
        debounceSearchNews(e.target.value);
    };

    useEffect(() => {
        if (searchTerms !== null) {
            const toLowerCriteria = searchTerms.toLowerCase();
            const articleSubset = dummyData.filter((a) => a.title.toLowerCase().includes(toLowerCriteria) || a.description.toLowerCase().includes(toLowerCriteria));
            setFilteredArticles(articleSubset);
        } else {
            setFilteredArticles(dummyData);
        }
    }, [searchTerms]);

    return (
        <>
            <Header handleSearchInput={handleSearchInput} />
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {
                            (newsReady === true)
                                ? <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}><ArticleList news={(filteredArticles !== []) ? filteredArticles : dummyData} /></div>
                                : <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress status="loading" /></div>
                        }
                    </Container>
                    <Footer />
                </div>
            </div>
        </>
    );
}