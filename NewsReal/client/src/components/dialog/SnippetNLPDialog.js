import React, {
    useContext,
    useState,
    useEffect
} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Typography,
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import { NewsContext } from "../../providers/NewsProvider";
import { SnippetContext } from "../../providers/SnippetProvider";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    buttonContainer: {
        alignSelf: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogContent: {
        margin: '0 10%',
    },
    formControl: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    title: {
        textAlign: 'center',
    },
}));

const DialogTitle = withStyles(useStyles)(({ children, classes, onClose, ...other }) => {
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography className={classes.title} variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export const SnippetNLPDialog = (props) => {
    const classes = useStyles();
    const { id } = useParams();
    const { openNLPModal, article, toggleNLPModal } = props;
    const { getArticleNLPAnalysis } = useContext(NewsContext);
    const { updateSnippet, getSnippetById } = useContext(SnippetContext);
    const [responseFinished, setResponseFinished] = useState(false);
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [responseState, setResponseState] = useState({});


    const updateDatabase = () => {
        if (typeof responseState.objectivity !== "undefined") {
            responseState.objectivity != 0 && (article.objectivity = responseState.objectivity);
            responseState.objectivity === 0 && (article.objectivity = 0);
        } else {
            responseState.sentimentality != 0 && (article.sentimentality = responseState.sentimentality);
            responseState.sentimentality === 0 && (article.sentimentality = 0);
        }
        updateSnippet(article.id, article).then(() => {
            getSnippetById(id);
            toggleNLPModal();
        });
    }

    const declineUpdate = () => {
        setResponseFinished(false);
        setResponseState({});
        toggleNLPModal();
    }

    const NLPSubjectivitySubmition = () => {
        const url = article.url;
        getArticleNLPAnalysis("subjectivity", url).then((resp) => {
            if (resp.successful) {
                const objectivity = parseFloat(resp.subjectivityScoreResult.toFixed(3));
                const objectivityPercentUnrounded = (1 - objectivity) * 100
                const objectivityPercent = parseFloat(objectivityPercentUnrounded.toFixed(3));
                setResponseState({ ...responseState, objectivity: objectivity, objectivityPercent: objectivityPercent });
                setResponseFinished(true);
            } else {
                alert("Article analysis failed.")
            }
        });
    }

    const NLPSentimentalitySubmition = () => {
        const url = article.url;
        getArticleNLPAnalysis("sentimentality", url).then((resp) => {
            if (resp.successful) {
                const sentimentality = parseFloat(resp.sentimentScoreResult.toFixed(3));
                const sentimentClassificationResult = resp.sentimentClassificationResult;
                if (resp.sentimentScoreResult >= 0) {
                    const sentimentalityPercent = sentimentality * 100;
                    setResponseState({ ...responseState, sentimentality: sentimentality, sentimentClassificationResult: sentimentClassificationResult, sentimentalityPercent: sentimentalityPercent });
                    setResponseFinished(true);
                } else {
                    const sentimentalityPercent = sentimentality * -100;
                    setResponseState({ ...responseState, sentimentality: sentimentality, sentimentClassificationResult: sentimentClassificationResult, sentimentalityPercent: sentimentalityPercent });
                    setResponseFinished(true);
                }
            } else {
                alert("Article analysis failed.");
            }
        });
    }

    const AnalysisButtonRender = () => {
        return (
            <>
                {
                    article.objectivity == null && <Button
                        variant="contained"
                        color="primary"
                        disabled={awaitingResponse}
                        onClick={() => {
                            NLPSubjectivitySubmition();
                            setAwaitingResponse(true);
                        }}
                    >
                        Objectivity Analysis
                    </Button>
                }
                {
                    article.sentimentality == null && <Button
                        variant="contained"
                        color="primary"
                        disabled={awaitingResponse}
                        onClick={() => {
                            NLPSentimentalitySubmition();
                            setAwaitingResponse(true);
                        }}
                    >
                        Sentimentality Analysis
                    </Button>
                }
            </>
        )
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={openNLPModal}
            onClose={toggleNLPModal}
            aria-labelledby="customized-dialog-title"
        >
            <DialogTitle classes={classes} id="customized-dialog-title" onClose={toggleNLPModal}>
                Language Analysis: {(article.userTitle) ? `${article.userTitle}` : `${article.title}`}
            </DialogTitle>
            <DialogContent dividers>
                {
                    !responseFinished
                        ? <Typography className={classes.dialogContent} component="div">
                            Articles may be submitted for attempted language analysis. <br />
                            If successful, articles will be given a percentile score out of 100. <br /><br />

                            If submitted for subjectivity, the closer an article's score is to 100%, the more objective the language. <br /><br />

                            If submitted for sentimentality, the closer an article's score is to 0%, the more neutral the language. <br />
                            In addition, the language will be ranked as having either positive or negative sentiment.
                    </Typography>
                        : <Typography className={classes.dialogContent} component="div">
                            {
                                responseState.objectivityPercent && <p>Article's objectivity score: {responseState.objectivityPercent}%</p>
                            }
                            {
                                responseState.sentimentalityPercent && <><p>Article's sentimentality score: {responseState.sentimentalityPercent}%</p><br /><p>Article is considered to be: {responseState.sentimentClassificationResult}</p></>
                            }
                            <p>You may choose to save the result of your analysis.</p>
                        </Typography>
                }
            </DialogContent>
            <DialogActions className={classes.buttonContainer}>
                {
                    !responseFinished
                        ? <AnalysisButtonRender />
                        : <><Button
                            variant="contained"
                            color="primary"
                            onClick={updateDatabase}
                        >
                            Accept and Update Article Profile
                </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={declineUpdate}
                            >
                                Decline
                </Button></>
                }
            </DialogActions>
        </Dialog>
    )
};