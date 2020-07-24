import React from 'react';
import { Article } from './Article';

export const ArticleList = props => {
    const news = props.news;
    debugger
    return (
        <>
            {
                news.map(a => {
                    return <Article article={a} />
                })
            }
        </>
    )
}