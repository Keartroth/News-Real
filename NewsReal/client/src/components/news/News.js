import React, { useState, useRef } from 'react';
import { parseISO } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';
import { Grow } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { MenuList } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Popper } from '@material-ui/core';
import { Typography } from '@material-ui/core';

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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2),
    },
    cardFull: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        maxWidth: '75%',
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
    },
}));

const snippetOptions = ['Create New Snippet', 'Append Existing Snippet'];
const articleOptions = ['View Description', 'Visit Article Home'];

export const News = ({ article, handleModalChange, setdialogNewsState }) => {
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

    const handleSnippetClick = (e) => {
        e.preventDefault();
        if (snippetOptions[selectedSnippetIndex] === 'Create New Snippet') {
            setdialogNewsState(article)
            handleModalChange();
        } else {
            console.log(snippetOptions[selectedSnippetIndex]);
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
                    alert('This article has no additional provided description.');
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
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                {
                    (showDetailState)
                        ? <Typography>{article.description}</Typography>
                        : <><Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                            {article.title}
                        </Typography>
                            <Typography>
                                <span className={classes.marginRight}><strong>Author:</strong> {article.author}</span>
                                <span className={classes.marginLeft}><strong>Published:</strong> {formatedDate}</span>
                            </Typography>
                            <Typography>
                                <span className={classes.marginRight}><strong>Publisher:</strong> {getHostname(article.url)}</span>
                                <span className={classes.marginLeft}><strong>Category:</strong> {
                                    article.category.map((c, idx) => {
                                        const length = article.category.length;
                                        if (length === 1) {
                                            return <span key={idx}>{c}</span>
                                        } else {
                                            if (idx < length - 1) {
                                                return <span key={idx}>{c}, </span>
                                            } else {
                                                return <span key={idx}>{c}</span>
                                            }
                                        }
                                    })
                                }</span>
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