import React from 'react';
import {
    Button,
    Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    snackButton: {
        color: 'red',
    },
    root: {
        color: 'black',
        backgroundColor: 'inherit',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export const DeleteSnackbar = ({ snackState, handleSnackClose, snippetDeleteState, nukeSnippet }) => {
    const classes = useStyles();
    const { vertical, horizontal, snackOpen, snippetTitle, id } = snackState;

    return (
        <Snackbar
            className={classes.root}
            anchorOrigin={{ vertical, horizontal }}
            open={snackOpen}
            onClose={handleSnackClose}
            message={(snippetDeleteState !== null)
                ? (snippetDeleteState.articleReferences !== null && snippetDeleteState.articleReferences.length > 0)
                    ? snippetDeleteState.articleReferences.map((ar, idx) => {
                        if (idx === 0) {
                            return <div key={idx}><p>Are you certain you wish to delete:</p>
                                <p>{`${snippetTitle}`}</p>
                                <p>You will also delete the reference articles: </p>
                                <p>{`${ar.referenceArticle.title}`}</p></div>
                        } else {
                            return <p key={idx}>{`${ar.referenceArticle.title}`}</p>
                        }
                    })
                    : <><p>Are you certain you wish to delete:</p>
                        <p>{(snippetDeleteState.userTitle) ? `${snippetTitle}` : `${snippetDeleteState.title}`}</p></>
                : ""
            }
            key={vertical + horizontal}
            action={
                <React.Fragment>
                    <Button className={classes.snackButton} size="small" onClick={() => nukeSnippet(snippetDeleteState.id)}>
                        Yes I am Certain
                    </Button>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleSnackClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </React.Fragment>
            }
        />
    )
}