import React from 'react';
import { News } from './News';

export const NewsList = props => {
    const news = props.news;

    return (
        <>
            {
                (news.length > 0)
                    ? news.map((a, idx) => {
                        return <News key={a.id} article={a} idx={idx} />
                    })
                    : <div>No Results Match Your Search</div>
            }
        </>
    )
}