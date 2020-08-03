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
    author: {
        fontSize: 14,
    },
    buttonGroup: {
        width: '263px',
    },
    card: {
        boxShadow: '5px 10px 10px #888888',
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        margin: theme.spacing(2),
        width: '45%',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        margin: 'inherit',
    },
    cardTitle: {
        maxWidth: 'fit-content',
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
    },
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
                alt="Image title"
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