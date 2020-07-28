import React, { useContext } from 'react';
import { parseISO } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grow } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { MenuList } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Popper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { SnippetContext } from '../../providers/SnippetProvider';

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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2),
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardTitle: {
        // fontSize: 'inherit',
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
}));

const snippetOptions = ['Create New Snippet', 'Append Existing Snippet'];
const articleOptions = ['View Article Details', 'Visit Article Home'];

export const News = ({ article, categories, idx }) => {
    const classes = useStyles();
    const formatedDate = parseISO(article.published).toDateString();
    const { addSnippet } = useContext(SnippetContext);

    const [articleOpen, setArticleOpen] = React.useState(false);
    const [snippetOpen, setSnippetOpen] = React.useState(false);
    const articleAnchorRef = React.useRef(null);
    const snippetAnchorRef = React.useRef(null);
    const [selectedArticleIndex, setSelectedArticleIndex] = React.useState(1);
    const [selectedSnippetIndex, setSelectedSnippetIndex] = React.useState(1);

    const handleSnippetClick = (e) => {
        e.preventDefault();
        if (snippetOptions[selectedSnippetIndex] === 'Create New Snippet') {
            const getHostname = (url) => {
                // use URL constructor and return hostname
                return new URL(url).hostname;
            }

            const publisherArray = getHostname(article.url).split(".");
            let publisher = "";
            debugger
            if (publisherArray.length === 2) {
                publisher = publisherArray[0];
            } else {
                publisher = publisherArray[1];
            }

            const newSnippet = {
                author: article.author,
                publisher: publisher,
                currentsId: article.id,
                title: article.title,
                description: article.description,
                url: article.url,
                userTitle: "",
                content: "",
                image: article.image,
                language: article.language,
                published: article.published,
                // objectivity: "",
                // sentimentality: "",
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
            console.log(newSnippet);
            // addSnippet(newSnippet);
        } else {
            console.log(snippetOptions[selectedSnippetIndex]);
        }
    };

    const handleArticleClick = (e) => {
        e.preventDefault();
        debugger
        if (articleOptions[selectedSnippetIndex] === 'View Article Details') {
            console.log(articleOptions[selectedSnippetIndex]);
        } else {
            console.log(articleOptions[selectedSnippetIndex]);
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
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={(article.image !== "None") ? article.image : "https://source.unsplash.com/random/?newspaper"}
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                    {article.title}
                </Typography>
                <Typography>
                    <strong>Author:</strong> {article.author}
                    <strong>Published:</strong> {formatedDate}
                </Typography>
            </CardContent>
            <CardActions>
                <ButtonGroup variant="contained" color="primary" ref={articleAnchorRef} aria-label="split button">
                    <Button onClick={handleArticleClick}>{articleOptions[selectedArticleIndex]}</Button>
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
                <ButtonGroup variant="contained" color="primary" ref={snippetAnchorRef} aria-label="split button">
                    <Button onClick={handleSnippetClick}>{snippetOptions[selectedSnippetIndex]}</Button>
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

{/* 
                            <Link href={article.url} target="_blank" size="small">Visit Article</Link>
                        </CardActions>
                    </Typography>
                    <Typography variant="h5" component="h2" className={classes.author} color="textSecondary" >
                        Author: {article.author}
                    </Typography>
                    <Typography component={'ul'} className={classes.pos} color="textSecondary">
                        {
                            (article.category).map((c, idx) => <li key={article.category[idx]} style={{ display: 'inline', margin: '0 0.5em' }}>{c}</li>)
                        }
                    </Typography>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                        >
                            <Typography className={classes.heading}>Additional Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', }}>
                            {
                                (article.image !== "None")
                                    ? <div><img style={{ maxWidth: '75%', maxHeight: 'auto', }} src={article.image} alt="photograph" /></div>
                                    : ""
                            }
                            <Typography component={'div'} style={{ maxWidth: '50%', textAlign: 'left', textIndent: '1em' }}>
                                {
                                    (article.description !== "")
                                        ? <p>{article.description}</p>
                                        : ""
                                }
                            </Typography>
                            <Typography component={'div'}>
                                {formatedDate}
                            </Typography>
                            
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        </Paper> */}