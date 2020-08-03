import React, { useState, useRef } from 'react';
import { parseISO } from 'date-fns'
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
    },
    cardFull: {
        boxShadow: '5px 10px #888888',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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

const snippetOptions = ['Create New Snippet', 'Append Existing Snippet'];
const articleOptions = ['View Description', 'Visit Article Home'];

export const News = ({ article, handleModalChange, setDialogNewsState, setDialogSnippetAppendState, handleSnippetAppendModalChange }) => {
    const classes = useStyles();
    const [articleOpen, setArticleOpen] = useState(false);
    const [snippetOpen, setSnippetOpen] = useState(false);
    const [showDetailState, setShowDetailState] = useState(false);
    const articleAnchorRef = useRef(null);
    const snippetAnchorRef = useRef(null);
    const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
    const [selectedSnippetIndex, setSelectedSnippetIndex] = useState(0);
    const formatedDate = parseISO(article.published).toDateString();

    const getHostname = (url) => {
        return new URL(url).hostname;
    }

    const capitalizeCategory = (s) => {
        if (typeof s !== 'string') {
            return s;
        } else {
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    }

    const handleSnippetClick = (e) => {
        e.preventDefault();
        if (snippetOptions[selectedSnippetIndex] === 'Create New Snippet') {
            setDialogNewsState(article)
            handleModalChange();
        } else {
            setDialogSnippetAppendState(article);
            handleSnippetAppendModalChange();
        }
    };

    const handleArticleClick = (e) => {
        e.preventDefault();

        if (articleOptions[selectedArticleIndex].includes('View')) {
            if (articleOptions[selectedArticleIndex].includes('Details')) {
                setShowDetailState(!showDetailState);
                e.target.parentElement.parentElement.parentElement.scrollIntoView();
                articleOptions[selectedArticleIndex] = 'View Description';
            } else {
                if (article.description !== "") {
                    setShowDetailState(!showDetailState);
                    e.target.parentElement.parentElement.parentElement.scrollIntoView();
                    articleOptions[selectedArticleIndex] = 'View Article Details';
                } else {
                    alert('This article has no additional description provided.\nVisit the article in question for more information.');
                }
            }
        } else {
            window.open(article.url, '_blank');
        }
    };

    const handleArticleMenuItemClick = (event, index) => {
        setSelectedArticleIndex(index);
        setArticleOpen(false);
    };

    const handleArticleToggle = () => {
        setArticleOpen((prevOpen) => !prevOpen);
    };

    const handleArticleClose = (event) => {
        if (articleAnchorRef.current && articleAnchorRef.current.contains(event.target)) {
            return;
        }
        setArticleOpen(false);
    };

    const handleSnippetMenuItemClick = (event, index) => {
        setSelectedSnippetIndex(index);
        setSnippetOpen(false);
    };

    const handleSnippetToggle = () => {
        setSnippetOpen((prevOpen) => !prevOpen);
    };

    const handleSnippetClose = (event) => {
        if (snippetAnchorRef.current && snippetAnchorRef.current.contains(event.target)) {
            return;
        }
        setSnippetOpen(false);
    };

    return (
        <Card className={(showDetailState) ? classes.cardFull : classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={(article.image !== "None") ? article.image : "https://source.unsplash.com/random/?newspaper"}
                alt="Image title"
            />
            <CardContent className={classes.cardContent}>
                {
                    (showDetailState)
                        ? <Typography>{article.description}</Typography>
                        : <><Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                            {article.title}
                        </Typography>
                            <Typography component="div" className={classes.infoContainer}>
                                <div className={classes.info}><strong>Author:</strong> {article.author}</div>
                                <div className={classes.info}><strong>Published:</strong> {formatedDate}</div>
                            </Typography>
                            <Typography component="div" className={classes.infoContainer}>
                                <div className={classes.info}><strong>Publisher:</strong> {getHostname(article.url)}</div>
                                <div className={classes.info}><strong>Category:</strong> {
                                    article.category.map((c, idx) => {
                                        const length = article.category.length;
                                        const cc = capitalizeCategory(c);
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
                                }</div>
                            </Typography></>
                }
            </CardContent>
            <CardActions>
                <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary" ref={articleAnchorRef} aria-label="split button">
                    <Button className={classes.buttonGroup} onClick={handleArticleClick}>{articleOptions[selectedArticleIndex]}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-controls={articleOpen ? 'split-button-menu' : undefined}
                        aria-expanded={articleOpen ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleArticleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={articleOpen} anchorEl={articleAnchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleArticleClose}>
                                    <MenuList id="split-button-menu">
                                        {articleOptions.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedArticleIndex}
                                                onClick={(event) => handleArticleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary" ref={snippetAnchorRef} aria-label="split button">
                    <Button className={classes.buttonGroup} onClick={handleSnippetClick}>{snippetOptions[selectedSnippetIndex]}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-controls={snippetOpen ? 'split-button-menu' : undefined}
                        aria-expanded={snippetOpen ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleSnippetToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={snippetOpen} anchorEl={snippetAnchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleSnippetClose}>
                                    <MenuList id="split-button-menu">
                                        {snippetOptions.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedSnippetIndex}
                                                onClick={(event) => handleSnippetMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </CardActions>
        </Card>
    )
}