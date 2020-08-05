import React from 'react';
import { Snippet } from './Snippet';
import { SnippetEditDialog } from '../dialog/SnippetEditDialog';
import { DeleteSnackbar } from '../dialog/DeleteSnackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    resultsInfo: {
        backgroundColor: 'rgba(169, 169, 169, 0.3)',
        borderRadius: '25px',
        fontSize: '3rem',
        margin: 'auto',
        padding: '2rem',
    }
}));

export const SnippetList = (props) => {
    const classes = useStyles();
    const { snippets, snackState, searching, openSnippetEditModal } = props;
    const { snackOpen } = snackState;

    return (
        <>
            {
                (snackOpen)
                    ? <DeleteSnackbar {...props} />
                    : ""
            }
            {
                (openSnippetEditModal)
                    ? <SnippetEditDialog {...props} />
                    : ""
            }
            {
                (snippets.length > 0)
                    ? snippets.map((s, idx) => {
                        return <Snippet
                            key={idx}
                            snippet={s}
                            {...props}
                        />
                    })
                    : (searching) ? <div className={classes.resultsInfo}>No Results Match Your Search</div> : <div className={classes.resultsInfo}>You have no saved snippets</div>
            }
        </>
    )
}