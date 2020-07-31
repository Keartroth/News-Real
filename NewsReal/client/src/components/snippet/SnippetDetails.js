import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
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
    Link,
    Typography,
    Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../Header';
import { SnippetEditDialog } from './SnippetEditDialog';

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
        width: '263px',
    },
    card: {
        height: '575px',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2),
        width: '45%',
    },
    cardFull: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '75%',
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
    },
    content: {
        overflow: 'scroll',
        overflowX: 'hidden',
    },
    expandedDetails: {
        width: '75%',
    },
    pos: {
        marginBottom: 12,
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'nowrap',
    },
    marginRight: {
        margin: '0 0.5em 0 0'
    },
    marginLeft: {
        margin: '0 0 0 0.5em'
    },
}));

const capitalizeCategory = (s) => {
    if (typeof s !== 'string') {
        return s;
    } else {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export const SnippetDetails = ({ setSnippetDeleteState, setSnippetEditState, handleSnippetEditModalChange, handleSnackClick, openSnippetEditModal }) => {
    const { id } = useParams();
    const classes = useStyles();
    const [snippet, setSnippet] = useState(null);
    const [snippetReady, setSnippetReady] = useState(false);
    const { getSnippetById } = useContext(SnippetContext);
    let formatedDate;
    let formatedUserDate;

    if (snippet) {
        formatedDate = parseISO(snippet.published).toDateString();
        formatedUserDate = parseISO(snippet.createDateTime).toDateString();
    }

    useEffect(() => {
        getSnippetById(id).then((resp) => {
            setSnippet(resp);
        })
    }, []);

    useEffect(() => {
        if (snippet !== null) {
            setSnippetReady(true);
        } else {
            setSnippetReady(false);
        }
    }, [snippet]);

    const editArticleModal = (article) => {
        setSnippetEditState(article);
        console.log(article)
        handleSnippetEditModalChange();
    };

    const deleteArticleModal = (e) => {
        e.preventDefault();
        debugger
        setSnippetDeleteState(snippet);
        handleSnackClick(snippet.userTitle);
    };

    const CategoryRender = () => {
        debugger
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

    const referenceCards = (ar, idx) => {
        const ra = ar.referenceArticle
        return (
            <Card key={idx}>
                <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                    {
                        (ra.userTitle)
                            ? <span><strong>Title:</strong> {ra.userTitle}</span>
                            : ""
                    }
                    <a target="blank" href={`${ra.url}`}>
                        <strong>Article Title:</strong> {ra.title}
                    </a>
                </Typography>
                <CardMedia
                    className={classes.cardMedia}
                    image={(ra.image !== "None") ? ra.image : "https://source.unsplash.com/random/?newspaper"}
                    title="Image title"
                />
                <CardContent className={classes.content}>
                    <Typography >
                        <span><strong>Author:</strong> {ra.author}</span>
                        <span><strong>Publisher:</strong> {ra.publisher}</span>
                        <span><strong>Published:</strong> {formatedDate}</span>
                        {
                            <span className={classes.marginLeft}><strong>Category:</strong>
                                {
                                    (snippetReady)
                                        ? <CategoryRender />
                                        : ""
                                }</span>
                        }
                    </Typography>
                    <Typography >
                        <strong>Created:</strong> {ra.createDateTime}
                        {
                            (ra.objectivity)
                                ? <span><strong>Objectivity:</strong> {ra.objectivity}</span>
                                : ""
                        }
                        {
                            (ra.sentimentality)
                                ? <span><strong>Objectivity:</strong> {ra.sentimentality}</span>
                                : ""
                        }
                    </Typography>
                    <Typography >
                        <strong>Created:</strong> {ra.createDateTime}
                        <strong>Description:</strong> {ra.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        editArticleModal(ra);
                    }}>Edit Reference</Button>
                    <Button onClick={deleteArticleModal}>Delete Reference</Button>
                </CardActions>
            </Card>
        )
    };

    const SnippetRender = () => {
        return (
            <Paper className={classes.snippet}>
                <Card>
                    <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                        {
                            (snippet.userTitle)
                                ? <span><strong>Title:</strong> {snippet.userTitle}</span>
                                : ""
                        }

                        <a target="blank" href={`${snippet.url}`}>
                            <strong>Article Title:</strong> {snippet.title}
                        </a>
                    </Typography>
                    <CardMedia
                        className={classes.cardMedia}
                        image={(snippet.image !== "None") ? snippet.image : "https://source.unsplash.com/random/?newspaper"}
                        title="Image title"
                    />
                    <CardContent className={classes.content}>
                        <Typography >
                            <span><strong>Author:</strong> {snippet.author}</span>
                            <span><strong>Publisher:</strong> {snippet.publisher}</span>
                            <span><strong>Published:</strong> {formatedDate}</span>
                            {
                                <span className={classes.marginLeft}><strong>Category:</strong>
                                    {
                                        (snippetReady)
                                            ? <CategoryRender />
                                            : ""
                                    }</span>
                            }
                        </Typography>
                        <Typography >
                            <strong>Created:</strong> {snippet.createDateTime}
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
                        <Typography >
                            <strong>Created:</strong> {snippet.formatedUserDate}
                            <strong>Description:</strong> {snippet.description}
                        </Typography>
                        <Typography >
                            {snippet.description}
                        </Typography>
                        <Typography >
                            {snippet.description}
                        </Typography>
                        <Typography >
                            {snippet.description}
                        </Typography>
                        <Typography >
                            {snippet.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/* <Button onClick={editReference}>Edit Reference</Button>
                    <Button onClick={setNukeReference}>Delete Reference</Button> */}
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
                    ? <SnippetEditDialog />
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
                                ? snippet.articleReferences.map((ar, idx) => referenceCards(ar, idx))
                                : ""
                            : ""
                    }
                </section>
            </Container>
        </>
    )
}