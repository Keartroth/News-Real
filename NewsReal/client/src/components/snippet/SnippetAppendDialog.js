import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import debounce from 'lodash.debounce'
import { SnippetContext } from '../../providers/SnippetProvider';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
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
    Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
            width: '18ch',
            '&:focus': {
                width: '25ch',
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

export const SnippetAppendDialog = ({ categories, dialogSnippetAppendState, handleSnippetAppendModalChange, openSnippetAppendModal }) => {
    const classes = useStyles();
    const { addSnippetReference, snippets, getSnippets, addSnippet } = useContext(SnippetContext);
    const [snippetsReady, setSnippetsReady] = useState(false);
    const [filterReady, setFilterReady] = useState(false);
    const [snippet, setSnippet] = useState("");
    const [searchTerms, setSearchTerms] = useState(null);
    const [filteredSnippets, setFilteredSnippets] = useState(null);
    const debounceSearchSnippets = debounce(setSearchTerms, 500);
    const article = dialogSnippetAppendState;
    let history = useHistory();

    useEffect(() => {
        getSnippets();
    }, []);

    useEffect(() => {
        if (snippets !== null) {
            setSnippetsReady(true);
        }
    }, [snippets]);

    useEffect(() => {
        if (searchTerms === null || searchTerms === "") {
            setFilterReady(false);
        } else {
            const toLowerCriteria = searchTerms.toLowerCase();
            const snippetSubset = snippets.filter(s => s.userTitle.toLowerCase().includes(toLowerCriteria) || s.content.toLowerCase().includes(toLowerCriteria));
            setFilteredSnippets(snippetSubset);
            setFilterReady(true);
        }
    }, [searchTerms]);

    const handleSnippetChange = (e) => {
        setSnippet(e.target.value);
    };

    const handleUserInput = (e) => {
        debounceSearchSnippets(e.target.value);
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
            let articleCategory = {
                categoryId: foundCategory.id
            };

            newArticle.articleCategory.push(articleCategory);
        });

        addSnippet(newArticle).then((resp) => {
            const articleReference = {
                articleId: snippet.id,
                referenceArticleId: resp.id,
            }
            addSnippetReference(articleReference).then(() => {
                handleSnippetAppendModalChange();
                history.push(`/snippet/${articleReference.articleId}`)
            })
        });
    }

    if (openSnippetAppendModal === false && snippet !== "") {
        setSnippet("");
    }

    return (
        <Dialog onClose={handleSnippetAppendModalChange} aria-labelledby="customized-dialog-title" open={openSnippetAppendModal}>
            <DialogTitle classes={classes} id="customized-dialog-title" onClose={handleSnippetAppendModalChange}>
                Append A Snippet
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    Addendum Title: {(article !== null) ? article.title : ""}.
                </DialogContentText>
                <FormControl className={classes.formControl}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
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
                    onChange={handleSnippetChange}
                >
                    {
                        (filterReady)
                            ? (filteredSnippets.length > 0)
                                ? filteredSnippets.map((fs, idx) => {
                                    return (
                                        <MenuItem key={idx} value={fs.id}>
                                            {fs.userTitle}
                                        </MenuItem>
                                    )
                                })
                                : <MenuItem value="">
                                    No Snippets
                                  </MenuItem>
                            : (snippetsReady)
                                ? snippets.map((s, idx) => {
                                    return (
                                        <MenuItem key={idx} value={s}>
                                            {s.userTitle}
                                        </MenuItem>
                                    )
                                })
                                : <MenuItem value="">
                                    No Snippets
                                  </MenuItem>
                    }
                </Select>
                <FormHelperText>Use the Search Field to Narrow Options</FormHelperText>
            </DialogContent>
            {
                (snippet !== "")
                    ? <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={(snippet.image !== "None") ? snippet.image : ""}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                                {snippet.userTitle}
                            </Typography>
                            {snippet.content}
                        </CardContent>
                    </Card>
                    : ""
            }
            <DialogActions>
                <Button onClick={appendSnippet} color="primary">
                    Append Snippet
                </Button>
            </DialogActions>
        </Dialog>
    )
};