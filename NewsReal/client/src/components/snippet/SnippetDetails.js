import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import { useParams } from "react-router-dom";
import { parseISO } from 'date-fns'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Typography,
    Paper
} from '@material-ui/core';
import { Footer } from '../Footer';
import { SnippetContext } from "../../providers/SnippetProvider";
import { DeleteSnackbar } from '../dialog/DeleteSnackbar';
import { SnippetEditDialog } from '../dialog/SnippetEditDialog';
import { SnippetNLPDialog } from "../dialog/SnippetNLPDialog";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: '5rem',
        textAlign: '-webkit-center',
        width: '90%'
    },
    author: {
        fontSize: 14,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    buttonGroup: {
        display: 'flex',
        flexWrap: 'nowrap',
        margin: 'auto',
        width: 'fit-content',
    },
    card: {
        height: '575px',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2),
        width: '45%',
    },
    cardMedia: {
        height: 'auto',
        paddingTop: '56.25%', // 16:9
        width: '80%',
    },
    cardContent: {
        flexGrow: 1,
        margin: 'inherit',
    },
    cardTitle: {
        alignSelf: 'center',
        maxWidth: 'fit-content',
        padding: '0.5rem 0em',
    },
    content: {
        maxHeight: '20rem',
        overflow: 'auto',
        overflowX: 'hidden',
        textAlign: 'left',
    },
    expandedDetails: {
        width: '75%',
    },
    info: {
        display: 'inline-block',
    },
    infoContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        margin: '0.5rem 1.5rem',
    },
    minHeight: '100vh',
    pos: {
        marginBottom: 12,
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'nowrap',
    },
    raContent: {
        display: 'flex',
        flexWrap: 'nowrap',
    },
    raInfo: {
        display: 'inline-block',
    },
    raInfoContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        margin: '0.5rem 0',
    },
    referenceArticle: {
        boxShadow: '5px 10px 10px #888888',
        margin: '2rem 0',
        width: '100%',
    },
    snippet: {
        boxShadow: '5px 10px 10px #888888',
        marginBottom: '2rem',
        width: '100%',
    },
    textContainer: {
        margin: '0.5rem 0',
        textIndent: '1.5rem',
    },
    userTitle: {
        textAlign: 'center',
    },
}));

const capitalizeCategory = (s) => {
    if (typeof s !== 'string') {
        return s;
    } else {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export const SnippetDetails = (props) => {
    const { id } = useParams();
    const classes = useStyles();
    const { setSnippetDeleteState, setSnippetEditState, toggleSnippetEditModalChange, toggleSnack, openSnippetEditModal, snackOpen } = props;
    const { getSnippetById, snippet, snippetReady } = useContext(SnippetContext);
    const [openNLPModal, setOpenNLPModal] = useState(false);
    const [analysisArticle, setAnalysisArticle] = useState(null);

    const toggleNLPModal = (article) => {
        setAnalysisArticle(article);
        setOpenNLPModal(!openNLPModal);
    }

    let formatedDate;
    let formatedUserDate;

    if (snippetReady && snippet !== null) {
        formatedDate = parseISO(snippet.published).toDateString();
        formatedUserDate = parseISO(snippet.createDateTime).toDateString();
    }

    useEffect(() => {
        getSnippetById(id);
    }, []);

    const editArticleModal = (article) => {
        setSnippetEditState(article);
        toggleSnippetEditModalChange();
    };

    const deleteArticleModal = (article, bool, snippetId) => {
        setSnippetDeleteState(article);
        toggleSnack(article.userTitle, bool, snippetId);
    };

    const CategoryRender = () => {
        return (
            <>
                {
                    snippet.categories.map((c, idx) => {
                        const length = snippet.categories.length;
                        const cc = capitalizeCategory(c.name);
                        if (length === 1) {
                            return <span key={idx}>{cc}</span>
                        } else {
                            if (idx < length - 1) {
                                return <span key={idx}>{cc}, </span>
                            } else {
                                return <span key={idx}>{cc}</span>
                            }
                        }
                    })
                }
            </>
        )
    }

    const referenceCardsRender = (ar, idx) => {
        const ra = ar.referenceArticle
        return (
            <Card key={idx} className={classes.referenceArticle}>
                <Typography className={classes.cardTitle} gutterBottom component="div">
                    {
                        (ra.userTitle)
                            ? <div><div><strong>Title: </strong> {ra.userTitle}</div><div><strong>Link: </strong><a target="_blank" rel="noopener noreferrer" href={`${ra.url}`}>{ra.title}</a></div></div>
                            : <div><strong>Link: </strong><a target="_blank" rel="noopener noreferrer" href={`${ra.url}`}>{ra.title}</a></div>
                    }
                </Typography>
                <Grid className={classes.raContent}>
                    <Grid item xs={4}>
                        <CardContent>
                            <CardMedia
                                className={classes.cardMedia}
                                image={(ra.image !== "None") ? ra.image : "https://source.unsplash.com/random/?newspaper"}
                                alt="Image title"
                            />
                        </CardContent>
                    </Grid>
                    <Grid item xs={8}>
                        <CardContent className={classes.content}>
                            <Typography className={classes.raInfoContainer} component="div">
                                <div className={classes.raInfo}><strong>Author:</strong> {ra.author}</div>
                                <div className={classes.raInfo}><strong>Publisher:</strong> {ra.publisher}</div>
                                <div className={classes.raInfo}><strong>Published:</strong> {formatedDate}</div>
                            </Typography>
                            <Typography className={classes.raInfoContainer} component="div">
                                <div className={classes.raInfo}><strong>Created:</strong> {formatedUserDate}</div>
                                {
                                    <div className={classes.raInfo}><strong>Category: </strong>
                                        {
                                            (snippetReady) && <CategoryRender />
                                        }</div>
                                }
                                {
                                    ra.objectivity != null && <div title="Objectivity classification scores close to 100 have a high probability of objectivity."><strong>Objectivity:</strong> {parseFloat(((1 - ra.objectivity) * 100).toFixed(3))}%</div>
                                }
                                {
                                    ra.sentimentality != null && <div title="Sentiment classification scores close to 0 are neutral. The greater the value deviates from 0 the stronger the sentiment."><strong>Sentimentality:</strong> {(ra.sentimentality > 0) ? `${ra.sentimentality * 100}% Positive` : `${ra.sentimentality * (-100)}% Negative`}</div>
                                }
                            </Typography>
                            <Typography component="div">
                                <strong>Description:</strong> {ra.description}
                            </Typography>
                            <Typography component="div">
                                {
                                    (ra.content) && <div><strong>Content:</strong> {ra.content}</div>
                                }
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.buttonGroup}>
                            {
                                (ra.sentimentality == null || ra.objectivity == null) && <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleNLPModal(ra);
                                    }}>Submit for Language Analysis</Button>
                            }
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    editArticleModal(ra);
                                }}>Edit Reference</Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteArticleModal(ra, false, snippet.id);
                                }}>Delete Reference</Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        )
    };

    const SnippetRender = () => {
        return (
            <Paper className={classes.snippet}>
                <Card>
                    <Typography className={classes.cardTitle} gutterBottom component="div">
                        {
                            snippet.userTitle
                                ? <div><strong>Title:</strong> {snippet.userTitle}</div>
                                : <div> <strong>Link:</strong> <a target="_blank" rel="noopener noreferrer" href={`${snippet.url}`}> {snippet.title}</a></div>
                        }
                        <div><strong>Created:</strong> {formatedUserDate}</div>
                        {
                            snippet.objectivity != null && <span title="Objectivity classification scores close to 100 have a high probability of objectivity."><strong>Objectivity:</strong> {parseFloat(((1 - snippet.objectivity) * 100).toFixed(3))}%</span>
                        }
                        {
                            snippet.sentimentality != null && <span title="Sentiment classification scores close to 0 are neutral. The greater the value deviates from 0 the stronger the sentiment."><strong>Sentimentality:</strong> {(snippet.sentimentality > 0) ? `${(snippet.sentimentality * 100).toFixed(1)}% Positive` : `${(snippet.sentimentality * (-100).toFixed(1))}% Negative`}</span>
                        }
                    </Typography>
                    <CardMedia
                        className={classes.cardMedia}
                        image={(snippet.image !== "None") ? snippet.image : "https://source.unsplash.com/random/?newspaper"}
                        alt="Image title"
                    />
                    <CardContent className={classes.content}>
                        <Typography className={classes.userTitle} component="div">
                            {
                                snippet.userTitle && <div> <strong>Link:</strong> <a target="_blank" rel="noopener noreferrer" href={`${snippet.url}`}> {snippet.title}</a></div>
                            }
                        </Typography>
                        <Typography className={classes.infoContainer} component="div">
                            <div className={classes.info}><strong>Author:</strong> {snippet.author}</div>
                            <div className={classes.info}><strong>Publisher:</strong> {snippet.publisher}</div>
                            <div><strong>Published:</strong> {formatedDate}</div>
                            <div className={classes.marginLeft}><strong>Category: </strong>
                                {
                                    <CategoryRender />
                                }
                            </div>
                        </Typography>
                        <Typography className={classes.textContainer}>
                            <strong>Description:</strong> {snippet.description}
                        </Typography>
                        <Typography className={classes.textContainer}>
                            <strong>Content:</strong> {snippet.content}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.buttonGroup}>
                        {
                            (snippet.sentimentality == null || snippet.objectivity == null) && <Button
                                color="primary"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleNLPModal(snippet);
                                }}>Submit for Language Analysis</Button>
                        }
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={(e) => {
                                e.preventDefault();
                                editArticleModal(snippet);
                            }}>Edit Snippet</Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={(e) => {
                                e.preventDefault();
                                deleteArticleModal(snippet, true);
                            }}>Delete Snippet</Button>
                    </CardActions>
                </Card>
            </Paper>
        )
    }

    return (
        <>
            {
                openSnippetEditModal && <SnippetEditDialog {...props} />
            }
            {
                snackOpen && <DeleteSnackbar {...props} />
            }
            {
                openNLPModal && analysisArticle && <SnippetNLPDialog openNLPModal={openNLPModal} article={analysisArticle} toggleNLPModal={toggleNLPModal} />
            }
            <Container className={classes.root}>
                <section>
                    {
                        snippetReady
                            ? <SnippetRender />
                            : <CircularProgress />
                    }
                </section>
                <section>
                    {
                        snippetReady && (snippet.articleReferences.length > 0) && snippet.articleReferences.map((ar, idx) => referenceCardsRender(ar, idx))
                    }
                </section>
            </Container>
            <Footer />
        </>
    )
}