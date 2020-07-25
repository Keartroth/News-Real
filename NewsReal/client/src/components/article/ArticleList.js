import React from 'react';
import { Article } from './Article';

export const ArticleList = props => {
    const news = props.news;

    return (
        <>
            {
                news.map(a => {
                    return <Article key={a.id} article={a} />
                })
            }
        </>
    )
}