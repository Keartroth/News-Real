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
        maxWidth: 'fit-content',
        padding: '0.5rem 0em',
    },
    content: {
        margin: 'auto 0.25rem',
        overflow: 'inherit',
    },
    contentContainer: {
        height: '100%',
        position: 'relative',
        overflowY: 'auto',
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
    const formatedDate = parseISO(snippet.createDateTime).toDateString();

    const setNukeSnippet = (e) => {
        e.preventDefault();
        setSnippetDeleteState(snippet);
        handleSnackClick(snippet.userTitle);
    };
    return (
        <Card className={classes.card}>
            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                {snippet.userTitle}
            </Typography>
            <CardMedia
                className={classes.cardMedia}
                image={(snippet.image !== "None") ? snippet.image : "https://source.unsplash.com/random/?newspaper"}
                alt="Image title"
            />
            <CardContent className={classes.buttonGroup}>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/snippet/${snippet.id}`;
                        }}>View Snippet Details</Button>
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
            <CardActions>
            </CardActions>
        </Card>
    )
}