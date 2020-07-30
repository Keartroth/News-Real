import React, { useState, useContext } from 'react';
import { Snippet } from './Snippet';
import { SnippetEditDialog } from './SnippetEditDialog';
import { SnippetContext } from '../../providers/SnippetProvider';
import {
    Button,
    Slide,
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
        backgroundColor: 'lightBlue',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export const SnippetList = props => {
    const snippets = props.snippets;
    const searching = props.searching
    const { deleteSnippet } = useContext(SnippetContext);
    const classes = useStyles();
    const [openSnippetEditModal, setOpenSnippetEditModal] = useState(false);
    const [snippetEditState, setSnippetEditState] = useState(null);
    const [snippetDeleteState, setSnippetDeleteState] = useState({
        articleReferences: [],
    });

    const handleSnippetEditModalChange = () => {
        setOpenSnippetEditModal(!openSnippetEditModal);
    }

    const [snackState, setSnackState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
        snippetTitle: '',
    });

    const { vertical, horizontal, snackOpen, snippetTitle } = snackState;

    const handleSnackClick = (title) => {
        setSnackState({ ...snackState, snackOpen: true, snippetTitle: title });
    };

    const handleSnackClose = () => {
        setSnackState({ ...snackState, snackOpen: false });
    };

    const nukeSnippet = (id) => {
        debugger
        deleteSnippet(snippetDeleteState.id);
    }

    console.log(snippets);

    return (
        <>
            <Snackbar
                className={classes.root}
                anchorOrigin={{ vertical, horizontal }}
                open={snackOpen}
                onClose={handleSnackClose}
                message={(snippetDeleteState !== null)
                    ? snippetDeleteState.articleReferences.map((ar, idx) => {
                        if (idx === 0) {
                            return <><div>Are you certain you wish to delete:</div>
                                <div>{`${snippetTitle}`}</div>
                                <div>You will also delete: </div>
                                <div>{`${ar.referenceArticle.title}`}</div></>
                        } else {
                            return <div>{`${ar.referenceArticle.title}`}</div>
                        }
                    })
                    : ""}
                key={vertical + horizontal}
                action={
                    <React.Fragment>
                        <Button className={classes.snackButton} size="small" onClick={nukeSnippet}>
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
            {
                (openSnippetEditModal)
                    ? <SnippetEditDialog
                        openSnippetEditModal={openSnippetEditModal}
                        snippetEditState={snippetEditState}
                        handleSnippetEditModalChange={handleSnippetEditModalChange}
                    />
                    : ""
            }
            {
                (snippets.length > 0)
                    ? snippets.map((s, idx) => {
                        return <Snippet
                            key={s.id}
                            snippet={s}
                            idx={idx}
                            handleSnackClick={handleSnackClick}
                            setSnippetDeleteState={setSnippetDeleteState}
                            setSnippetEditState={setSnippetEditState}
                            handleSnippetEditModalChange={handleSnippetEditModalChange}
                        />
                    })
                    : (searching) ? <div>No Results Match Your Search</div> : <div>You have no saved snippets</div>
            }
        </>
    )
}