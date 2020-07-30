import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { SnippetContext } from '../../providers/SnippetProvider';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    IconButton,
    TextField,
    Typography
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const DialogTitle = withStyles(useStyles)(({ children, classes, onClose, ...other }) => {
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export const NewsDialog = ({ openModal, handleModalChange, dialogNewsState, categories }) => {
    const classes = useStyles();
    const { addSnippet } = useContext(SnippetContext);
    const article = dialogNewsState;
    const [userInput, setUserInput] = useState(null);
    let history = useHistory();

    const handleUserInput = (e) => {
        const updatedState = { ...userInput }
        updatedState[e.target.id] = e.target.value
        setUserInput(updatedState);
    };

    const getHostname = (url) => {
        return new URL(url).hostname;
    }

    const saveSnippet = () => {
        const publisherArray = getHostname(article.url).split(".");
        const currentUserProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

        let publisher = "";

        if (publisherArray.length === 2) {
            publisher = publisherArray[0];
        } else {
            publisher = publisherArray[1];
        }

        const newSnippet = {
            userProfileId: currentUserProfileId,
            author: article.author,
            publisher: publisher,
            currentsId: article.id,
            title: article.title,
            description: article.description,
            url: article.url,
            userTitle: userInput.title,
            content: userInput.content,
            image: article.image,
            language: article.language,
            published: article.published,
            objectivity: null,
            sentimentality: null,
            articleCategory: []
        }

        article.category.map(c => {
            const foundCategory = categories.find(cat => cat.name === c);
            let articleCategory = {
                categoryId: foundCategory.id
            };

            newSnippet.articleCategory.push(articleCategory);
        });

        debugger

        addSnippet(newSnippet).then(() => {
            handleModalChange();
            history.push(`/snippets`)
        });
    }

    return (
        <Dialog onClose={handleModalChange} aria-labelledby="customized-dialog-title" open={openModal}>
            <DialogTitle classes={classes} id="customized-dialog-title" onClose={handleModalChange}>
                Save Snippet
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    Article Title: {(dialogNewsState !== null) ? article.title : ""}.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Snippet Title"
                    type="text"
                    fullWidth
                    onChange={handleUserInput}
                    inputProps={{ min: "5", max: "10" }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    label="Personal Reflections"
                    type="textarea"
                    fullWidth
                    onChange={handleUserInput}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveSnippet} color="primary">
                    Create Snippet
                </Button>
            </DialogActions>
        </Dialog>
    )
};