import React, { useState } from 'react';
import { News } from './News';
import { SnippetSaveDialog } from '../dialog/SnippetSaveDialog';
import { SnippetAppendDialog } from '../dialog/SnippetAppendDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    resultsInfo: {
        fontSize: '3rem',
        margin: 'auto',
    }
}));

export const NewsList = props => {
    const classes = useStyles();
    const news = props.news;
    const categories = props.categories;
    const [openModal, setOpenModal] = useState(false);
    const [dialogNewsState, setDialogNewsState] = useState(null);
    const [openSnippetAppendModal, setOpenSnippetAppendModal] = useState(false);
    const [dialogSnippetAppendState, setDialogSnippetAppendState] = useState(null);

    const handleSnippetAppendModalChange = () => {
        setOpenSnippetAppendModal(!openSnippetAppendModal);
    }

    const handleModalChange = () => {
        setOpenModal(!openModal);
    }

    return (
        <>
            <SnippetAppendDialog
                categories={categories}
                dialogSnippetAppendState={dialogSnippetAppendState}
                handleSnippetAppendModalChange={handleSnippetAppendModalChange}
                openSnippetAppendModal={openSnippetAppendModal}
            />
            <SnippetSaveDialog
                categories={categories}
                dialogNewsState={dialogNewsState}
                handleModalChange={handleModalChange}
                openModal={openModal}
            />
            {
                (news.length > 0)
                    ? news.map((a, idx) => {
                        return <News
                            key={idx}
                            article={a}
                            categories={categories}
                            handleModalChange={handleModalChange}
                            handleSnippetAppendModalChange={handleSnippetAppendModalChange}
                            setDialogNewsState={setDialogNewsState}
                            setDialogSnippetAppendState={setDialogSnippetAppendState}
                        />
                    })
                    : <div className={classes.resultsInfo}>No Results Match Your Search</div>
            }
        </>
    )
}