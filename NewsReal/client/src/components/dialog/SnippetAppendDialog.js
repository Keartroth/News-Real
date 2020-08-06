import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import debounce from 'lodash.debounce'
import { SnippetContext } from '../../providers/SnippetProvider';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    FormHelperText,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiTextField from '@material-ui/core/TextField';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    cardContent: {
        overflow: 'auto',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    dialogTitle: {
        textAlign: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '75%',
    },
    inputRoot: {
        color: 'gray',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '75%',
            '&:focus': {
                width: '100%',
            },
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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

export const SnippetAppendDialog = (props) => {
    const classes = useStyles();
    const { addSnippetReference, snippets, getSnippets, addSnippet, snippetsReady, updateSnippet } = useContext(SnippetContext);
    const { categories, dialogSnippetAppendState, openSnippetAppendModal, toggleSnippetAppendModalChange } = props;
    const [searching, setSearching] = useState(false);
    const [searchBool, setSearchBool] = useState(true);
    const [snippet, setSnippet] = useState("");
    const [snippetEditState, setSnippetEditState] = useState("");
    const [searchTerms, setSearchTerms] = useState(null);
    const [filteredSnippets, setFilteredSnippets] = useState(null);
    const debounceSearchSnippets = debounce(setSearchTerms, 500);
    const article = dialogSnippetAppendState;
    let history = useHistory();

    useEffect(() => {
        getSnippets();
    }, []);

    useEffect(() => {
        setSnippetEditState(snippet);
    }, [snippet]);

    useEffect(() => {
        if (searchTerms === null || searchTerms === "") {
            setSearching(false);
        } else {
            const toLowerCriteria = searchTerms.toLowerCase();
            const snippetSubset = snippets.filter(s => (s.userTitle) ? s.userTitle.toLowerCase().includes(toLowerCriteria) : null || (s.title) ? s.title.toLowerCase().includes(toLowerCriteria) : null || (s.content) ? s.content.toLowerCase().includes(toLowerCriteria) : null);
            setFilteredSnippets(snippetSubset);
            setSearching(true);
        }
    }, [searchTerms]);

    const SnippetChange = (e) => {
        if (e.target.value === "0") {
            setSearchBool(true);
            setSnippet("");
        } else {
            setSearchBool(false);
            setSnippet(e.target.value);
        }
    };

    const handleUserInput = (e) => {
        debounceSearchSnippets(e.target.value);
    };

    const handleSnippetUpdate = (e) => {
        const updatedState = { ...snippetEditState }
        updatedState[e.target.id] = e.target.value
        setSnippetEditState(updatedState);
    };

    const getHostname = (url) => {
        return new URL(url).hostname;
    }

    const appendSnippet = () => {
        const publisherArray = getHostname(article.url).split(".");
        const currentUserProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

        let publisher = "";

        if (publisherArray.length === 2) {
            publisher = publisherArray[0];
        } else {
            publisher = publisherArray[1];
        }

        const newArticle = {
            userProfileId: currentUserProfileId,
            author: (article.author !== "") ? article.author : "No author information provided",
            publisher: (publisher !== "") ? publisher : "No publisher information provided",
            currentsId: article.id,
            title: (article.title !== "") ? article.title : "No title information provided",
            description: (article.description !== "") ? article.description : "No description information provided",
            url: article.url,
            image: article.image,
            language: (article.language !== "") ? article.language : "No language information provided",
            published: (article.published !== "") ? article.published : "No publication date information provided",
            objectivity: null,
            sentimentality: null,
            articleCategory: []
        }
        article.category.map(c => {
            const foundCategory = categories.find(cat => cat.name === c);
            if (foundCategory) {
                let articleCategory = {
                    categoryId: foundCategory.id
                };

                newArticle.articleCategory.push(articleCategory);
            }
        });

        if (snippet !== snippetEditState) {
            updateSnippet(snippet.id, snippetEditState);
        }
        addSnippet(newArticle).then((resp) => {
            const articleReference = {
                articleId: snippet.id,
                referenceArticleId: resp.id,
            }
            addSnippetReference(articleReference).then(() => {
                toggleSnippetAppendModalChange();
                history.push(`/snippet/${articleReference.articleId}`)
            })
        });
    }

    if (openSnippetAppendModal === false && snippet !== "") {
        setSnippet("");
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            className={classes.appendDialog}
            open={openSnippetAppendModal}
            onClose={toggleSnippetAppendModalChange}
            aria-labelledby="customized-dialog-title"
        >
            <DialogTitle classes={classes} id="customized-dialog-title" onClose={toggleSnippetAppendModalChange}>
                Append A Snippet
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    Addendum Title: {(article !== null) && article.title}.
                </DialogContentText>
                <FormControl className={classes.formControl}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            fullWidth
                            disabled={(searchBool) ? false : true}
                            placeholder="Search by Snippet Title or Content…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className={classes.spacerDiv}></div>
                </FormControl>
            </DialogContent>
            <DialogContent dividers>
                <InputLabel id="demo-simple-select-helper-label">Snippet to Append</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={snippet}
                    fullWidth
                    required
                    onChange={SnippetChange}
                >
                    <MenuItem value="0">
                        Select A Snippet
                    </MenuItem>
                    {
                        (searching)
                            ? (filteredSnippets.length > 0)
                                ? filteredSnippets.map((fs, idx) => {
                                    return (
                                        <MenuItem key={idx} value={fs}>
                                            {fs.userTitle}
                                        </MenuItem>
                                    )
                                })
                                : <MenuItem value="">
                                    No Matching Snippets
                                  </MenuItem>
                            : (snippetsReady && snippets.length > 0)
                                ? snippets.map((s, idx) => {
                                    return (
                                        <MenuItem key={idx} value={s}>
                                            {s.userTitle}
                                        </MenuItem>
                                    )
                                })
                                : <MenuItem value="0">
                                    You Have No Saved Snippets
                                  </MenuItem>
                    }
                </Select>
                <FormHelperText>Use the Search Field to Narrow Options</FormHelperText>
            </DialogContent>
            {
                (snippet !== "") && <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <TextField
                            className={classes.cardTitle}
                            autoFocus
                            margin="dense"
                            id="userTitle"
                            label="Snippet Title"
                            type="text"
                            fullWidth
                            required
                            onChange={handleSnippetUpdate}
                            value={snippetEditState.userTitle || ""}
                            inputProps={{ min: "5", max: "10" }}
                        />
                        <MuiTextField
                            autoFocus
                            margin="dense"
                            id="content"
                            label="Personal Reflections"
                            type="textarea"
                            multiline={true}
                            rows={5}
                            fullWidth
                            required
                            onChange={handleSnippetUpdate}
                            value={snippetEditState.content || ""}
                        />
                    </CardContent>
                </Card>
            }
            <DialogActions>
                <Button onClick={(e) => {
                    e.preventDefault();
                    if (snippetEditState && snippet) {
                        appendSnippet();
                    } else {
                        alert('You must select a Snippet to append.');
                    }
                }} variant="contained" color="primary">
                    Append Snippet
                </Button>
            </DialogActions>
        </Dialog>
    )
};