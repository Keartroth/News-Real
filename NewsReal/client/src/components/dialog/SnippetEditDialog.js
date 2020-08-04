import React, {
    useContext,
    useState
} from 'react';
import { useParams } from "react-router-dom";
import { SnippetContext } from '../../providers/SnippetProvider';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    IconButton,
    Typography,
    TextField,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiTextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

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
    formControl: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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

export const SnippetEditDialog = ({ openSnippetEditModal, snippetEditState, handleSnippetEditModalChange }) => {
    const { id } = useParams();
    const classes = useStyles();
    const { updateSnippet, getSnippetById } = useContext(SnippetContext);
    const snippet = snippetEditState;
    const [newEditState, setNewEditState] = useState(snippet);

    const handleUserInput = (e) => {
        const updatedEditState = { ...newEditState }
        updatedEditState[e.target.id] = e.target.value;
        setNewEditState(updatedEditState)
    };

    const editSnippet = () => {
        updateSnippet(snippet.id, newEditState).then(() => {
            getSnippetById(id);
            handleSnippetEditModalChange();
        });
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={openSnippetEditModal}
            onClose={handleSnippetEditModalChange}
            aria-labelledby="customized-dialog-title"
        >
            <DialogTitle classes={classes} id="customized-dialog-title" onClose={handleSnippetEditModalChange}>
                Edit: {snippet.userTitle}
            </DialogTitle>
            <DialogContent dividers>
                <FormControl className={classes.formControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="userTitle"
                        label="Title"
                        name="userTitle"
                        autoComplete="userTitle"
                        defaultValue={newEditState.userTitle}
                        onChange={handleUserInput}
                    />
                    <MuiTextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        rows={5}
                        multiline={true}
                        id="content"
                        label="Content"
                        name="content"
                        autoComplete="content"
                        defaultValue={newEditState.content}
                        onChange={handleUserInput}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        className={classes.articleInfo}
                        variant="outlined"
                        margin="normal"
                        id="author"
                        label="Author"
                        name="author"
                        autoComplete="author"
                        defaultValue={newEditState.author}
                        onChange={handleUserInput}
                    />
                    <TextField
                        className={classes.articleInfo}
                        variant="outlined"
                        margin="normal"
                        id="publisher"
                        label="Publisher"
                        name="publisher"
                        autoComplete="publisher"
                        defaultValue={newEditState.publisher}
                        onChange={handleUserInput}
                    />
                    <MuiTextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        rows={2}
                        multiline={true}
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        defaultValue={newEditState.description}
                        onChange={handleUserInput}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={editSnippet}
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    )
};