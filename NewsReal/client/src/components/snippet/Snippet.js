import React from 'react';
import { parseISO } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
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
    expandedDetails: {
        width: '75%',
    },
    pos: {
        marginBottom: 12,
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'nowrap',
    },
});

export const Snippet = ({ article, idx }) => {
    const classes = useStyles();
    const formatedDate = parseISO(article.published).toDateString();;

    return (
        <Paper id={`articleDetails--${idx}`} elevation={3} variant="outlined" style={{ width: '40%', minWidth: '450px', margin: '2rem' }}>
            <Card className={classes.root} style={{ height: '100%', }}>
                <CardContent>
                    <Typography component={'div'} style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                        {article.title}
                        <CardActions component={'p'} style={{ minWidth: 'max-content', }}>
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
                    {
                        (article.description !== "")
                            ? <Accordion>
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
                                        {article.description}
                                    </Typography>
                                    <Typography component={'div'}>
                                        {formatedDate}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            : ""
                    }
                </CardContent>
            </Card>
        </Paper>
    )
}