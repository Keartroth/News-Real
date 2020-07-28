import React from 'react';
import { Snippet } from './Snippet';

export const SnippetList = props => {
    const snippets = props.snippets;
    const searching = props.searching

    return (
        <>
            {
                (snippets.length > 0)
                    ? snippets.map((s, idx) => {
                        return <Snippet key={s.id} snippet={s} idx={idx} />
                    })
                    : (searching) ? <div>No Results Match Your Search</div> : <div>You have no saved snippets</div>
            }
        </>
    )
}