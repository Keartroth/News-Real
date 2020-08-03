import React from 'react';
import { Snippet } from './Snippet';
import { SnippetEditDialog } from '../dialog/SnippetEditDialog';
import { DeleteSnackbar } from '../dialog/DeleteSnackbar';

export const SnippetList = (props, { openSnippetEditModal }) => {
    const snippets = props.snippets;
    const searching = props.searching;
    const snackOpen = props.snackState.snackOpen;

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
                    : (searching) ? <div>No Results Match Your Search</div> : <div>You have no saved snippets</div>
            }
        </>
    )
}