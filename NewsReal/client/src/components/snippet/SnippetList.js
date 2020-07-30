import React, { useState } from 'react';
import { Snippet } from './Snippet';
import { SnippetEditDialog } from './SnippetEditDialog';

export const SnippetList = props => {
    const snippets = props.snippets;
    const searching = props.searching

    const [openSnippetEditModal, setOpenSnippetEditModal] = useState(false);
    const [snippetEditState, setSnippetEditState] = useState(null);

    const handleSnippetEditModalChange = () => {
        setOpenSnippetEditModal(!openSnippetEditModal);
    }

    return (
        <>
            {
                (openSnippetEditModal)
                    ? <SnippetEditDialog
                        openSnippetEditModal={openSnippetEditModal}
                        snippetEditState={snippetEditState}
                        handleSnippetEditModalChange={handleSnippetEditModalChange}
                    />
                    : ""
            }
            {
                (snippets.length > 0)
                    ? snippets.map((s, idx) => {
                        return <Snippet
                            key={s.id}
                            snippet={s}
                            idx={idx}
                            setSnippetEditState={setSnippetEditState}
                            handleSnippetEditModalChange={handleSnippetEditModalChange}
                        />
                    })
                    : (searching) ? <div>No Results Match Your Search</div> : <div>You have no saved snippets</div>
            }
        </>
    )
}