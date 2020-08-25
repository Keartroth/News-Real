import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { parseISO } from 'date-fns'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';
import { SnippetContext } from "../../providers/SnippetProvider";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    author: {
        fontSize: 14,
    },
    buttonGroup: {
        display: 'flex',
        flexWrap: 'nowrap',
        margin: 'auto',
        width: 'fit-content',
    },
    card: {
        boxShadow: '5px 10px 10px #888888',
        display: 'flex',
        flexDirection: 'column',
        height: '650px',
        margin: theme.spacing(2),
        width: '47%',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        margin: 'inherit',
    },
    cardTitle: {
        alignSelf: 'center',
        fontWeight: 'bolder',
        maxWidth: 'fit-content',
        padding: '0.5rem 0em',
    },
    content: {
        margin: 'auto 0.25rem',
        overflow: 'inherit',
    },
    contentContainer: {
        height: '85%',
        position: 'relative',
        overflowY: 'auto',
        whiteSpace: 'pre-line',
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
        marginBottom: '1rem',
    },
    navLink: {
        textDecoration: 'none',
    },
}));

const capitalizeCategory = (s) => {
    if (typeof s !== 'string') {
        return s;
    } else {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export const Snippet = (props) => {
    const classes = useStyles();
    const { snippet, toggleSnack, setSnippetDeleteState } = props;
    const { setSnippetReady } = useContext(SnippetContext);
    const formatedDate = parseISO(snippet.createDateTime).toDateString();

    const setReadyToFalse = () => {
        setSnippetReady(false);
    }

    const setNukeSnippet = (e) => {
        e.preventDefault();
        setSnippetDeleteState(snippet);
        toggleSnack(snippet.userTitle);
    };
    return (
        <Card className={classes.card}>
            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                {snippet.userTitle}
            </Typography>
            <CardMedia
                className={classes.cardMedia}
                image={(snippet.image !== "None") ? snippet.image : "https://images.unsplash.com/photo-1582487852281-845682679570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
                alt="Image title"
            />
            <CardContent className={classes.buttonGroup}>
                <CardActions>
                    <NavLink className={classes.navLink} to={`/snippet/${snippet.id}`} onClick={setReadyToFalse}>
                        <Button
                            color="primary"
                            variant="contained"
                        >View Snippet Details</Button>
                    </NavLink>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={setNukeSnippet}>Delete Snippet</Button>
                </CardActions>
            </CardContent>
            <CardContent className={classes.content}>
                <Typography component="div" className={classes.infoContainer}>
                    <div className={classes.info}><strong>Created: </strong> {formatedDate}</div>
                    <div className={classes.info}><strong>Category: </strong>
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
                    </div>
                </Typography>
                <Typography className={classes.contentContainer} component="div"><strong>Summary:</strong> {snippet.content}</Typography>
            </CardContent>
        </Card>
    )
}