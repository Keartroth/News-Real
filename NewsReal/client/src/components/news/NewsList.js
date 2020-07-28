import React, { useState } from 'react';
import { News } from './News';
import { NewsDialog } from './NewsDialog';

export const NewsList = props => {
    const news = props.news;
    const categories = props.categories;
    const [openModal, setOpenModal] = useState(false);
    const [dialogNewsState, setdialogNewsState] = useState(null);

    const handleModalChange = () => {
        setOpenModal(!openModal);
    }

    return (
        <>
            <NewsDialog openModal={openModal} categories={categories} handleModalChange={handleModalChange} dialogNewsState={dialogNewsState} />
            {
                (news.length > 0)
                    ? news.map((a, idx) => {
                        return <News key={idx} article={a} categories={categories} handleModalChange={handleModalChange} setdialogNewsState={setdialogNewsState} />
                    })
                    : <div>No Results Match Your Search</div>
            }
        </>
    )
}