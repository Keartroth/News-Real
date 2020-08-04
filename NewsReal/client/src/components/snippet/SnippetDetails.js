import React, {
    useContext,
    useEffect
} from 'react';
import { useParams } from "react-router-dom";
import { Header } from '../Header';
import { Footer } from '../Footer';
import { SnippetEditDialog } from '../dialog/SnippetEditDialog';
import { DeleteSnackbar } from '../dialog/DeleteSnackbar';
import { SnippetContext } from "../../providers/SnippetProvider";
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
    const setSnippetDeleteState = props.setSnippetDeleteState;
    const setSnippetEditState = props.setSnippetEditState;
    const toggleSnippetEditModalChange = props.toggleSnippetEditModalChange;
    const toggleSnack = props.toggleSnack;
    const openSnippetEditModal = props.openSnippetEditModal;
    const snackOpen = props.snackState.snackOpen;

    const { getSnippetById, snippet, snippetReady } = useContext(SnippetContext);
    let formatedDate;
    let formatedUserDate;

    if (snippetReady && snippet !== null) {
        formatedDate = parseISO(snippet.published).toDateString();
        formatedUserDate = parseISO(snippet.createDateTime).toDateString();
    }

    useEffect(() => {
        getSnippetById(id)
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
                                            (snippetReady)
                                                ? <CategoryRender />
                                                : ""
                                        }</div>
                                }
                                {
                                    (ra.objectivity)
                                        ? <div><strong>Objectivity:</strong> {ra.objectivity}</div>
                                        : ""
                                }
                                {
                                    (ra.sentimentality)
                                        ? <div><strong>Objectivity:</strong> {ra.sentimentality}</div>
                                        : ""
                                }
                            </Typography>
                            <Typography component="div">
                                <strong>Description:</strong> {ra.description}
                            </Typography>
                            <Typography component="div">
                                {
                                    (ra.content)
                                        ? <div><strong>Content:</strong> {ra.content}</div>
                                        : ""
                                }
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.buttonGroup}>
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
                            (snippet.userTitle)
                                ? <div><strong>Title:</strong> {snippet.userTitle}</div>
                                : <div> <strong>Link:</strong> <a target="_blank" rel="noopener noreferrer" href={`${snippet.url}`}> {snippet.title}</a></div>
                        }
                        <div><strong>Created:</strong> {formatedUserDate}</div>
                        {
                            (snippet.objectivity)
                                ? <span><strong>Objectivity:</strong> {snippet.objectivity}</span>
                                : ""
                        }
                        {
                            (snippet.sentimentality)
                                ? <span><strong>Objectivity:</strong> {snippet.sentimentality}</span>
                                : ""
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
                                (snippet.userTitle)
                                    ? <div> <strong>Link:</strong> <a target="_blank" rel="noopener noreferrer" href={`${snippet.url}`}> {snippet.title}</a></div>
                                    : ""
                            }
                        </Typography>
                        <Typography className={classes.infoContainer} component="div">
                            <div className={classes.info}><strong>Author:</strong> {snippet.author}</div>
                            <div className={classes.info}><strong>Publisher:</strong> {snippet.publisher}</div>
                            <div><strong>Published:</strong> {formatedDate}</div>
                            {
                                <div className={classes.marginLeft}><strong>Category: </strong>
                                    {
                                        <CategoryRender />
                                    }</div>
                            }
                        </Typography>
                        <Typography className={classes.textContainer}>
                            <strong>Description:</strong> {snippet.description}
                        </Typography>
                        <Typography className={classes.textContainer}>
                            <strong>Content:</strong> {snippet.content}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.buttonGroup}>
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
            <Header />
            {
                (openSnippetEditModal)
                    ? <SnippetEditDialog {...props} />
                    : ""
            }
            {
                (snackOpen)
                    ? <DeleteSnackbar {...props} />
                    : ""
            }
            <Container className={classes.root}>
                <section>
                    {
                        (snippetReady)
                            ? <SnippetRender />
                            : <CircularProgress />
                    }
                </section>
                <section>
                    {
                        (snippetReady)
                            ? (snippet.articleReferences.length > 0)
                                ? snippet.articleReferences.map((ar, idx) => referenceCardsRender(ar, idx))
                                : ""
                            : ""
                    }
                </section>
            </Container>
            <Footer />
        </>
    )
}