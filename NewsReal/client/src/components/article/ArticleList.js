import React from 'react';
import { Article } from './Article';

export const ArticleList = props => {
    debugger
    const news = props.news;

    return (
        <>
            {
                (news.length > 0)
                    ? news.map((a, idx) => {
                        return <Article key={a.id} article={a} idx={idx} />
                    })
                    : <div>No Results Match Your Search</div>
            }
        </>
    )
}