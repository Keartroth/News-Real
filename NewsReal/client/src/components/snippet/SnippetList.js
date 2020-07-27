import React from 'react';
import { Snippet } from './Snippet';

export const SnippetList = props => {
    const news = props.news;

    return (
        <>
            {
                (news.length > 0)
                    ? news.map((a, idx) => {
                        return <Snippet key={a.id} article={a} idx={idx} />
                    })
                    : <div>No Results Match Your Search</div>
            }
        </>
    )
}