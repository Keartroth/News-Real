import React from 'react';
import { parseISO } from 'date-fns'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
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
        paddingTop: '56.25%', // 16:9
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
    }
}));

const capitalizeCategory = (s) => {
    if (typeof s !== 'string') {
        return s;
    } else {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export const Snippet = ({ snippet, handleSnackClick, setSnippetDeleteState }) => {
    const classes = useStyles();
    const formatedDate = parseISO(snippet.published).toDateString();

    const setNukeSnippet = (e) => {
        e.preventDefault();
        setSnippetDeleteState(snippet);
        handleSnackClick(snippet.userTitle);
    };

    return (
        <Card className={classes.card}>
            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                Title: {snippet.userTitle}
                Published: {formatedDate}
            </Typography>
            <CardMedia
                className={classes.cardMedia}
                image={(snippet.image !== "None") ? snippet.image : "https://source.unsplash.com/random/?newspaper"}
                title="Image title"
            />
            <CardContent>
                <CardActions>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/snippet/${snippet.id}`;
                    }}>View Snippet Details</Button>
                    <Button onClick={setNukeSnippet}>Delete Snippet</Button>
                </CardActions>
            </CardContent>
            <CardContent className={classes.content}>
                <Typography >{snippet.content}</Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}