import React, { useState } from 'react';
import { News } from './News';
import { SnippetSaveDialog } from '../dialog/SnippetSaveDialog';
import { SnippetAppendDialog } from '../dialog/SnippetAppendDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    resultsInfo: {
        backgroundColor: 'rgba(169, 169, 169, 0.3)',
        borderRadius: '25px',
        fontSize: '3rem',
        margin: '10% auto',
        padding: '2rem',
    }
}));

export const NewsList = props => {
    const classes = useStyles();
    const { news, categories } = props;
    const [openModal, setOpenModal] = useState(false);
    const [dialogNewsState, setDialogNewsState] = useState(null);
    const [openSnippetAppendModal, setOpenSnippetAppendModal] = useState(false);
    const [dialogSnippetAppendState, setDialogSnippetAppendState] = useState(null);

    const toggleSnippetAppendModalChange = () => {
        setOpenSnippetAppendModal(!openSnippetAppendModal);
    }

    const toggleModalChange = () => {
        setOpenModal(!openModal);
    }

    return (
        <>
            {
                categories && <SnippetAppendDialog
                    categories={categories}
                    dialogSnippetAppendState={dialogSnippetAppendState}
                    toggleSnippetAppendModalChange={toggleSnippetAppendModalChange}
                    openSnippetAppendModal={openSnippetAppendModal}
                />
            }
            {
                categories && <SnippetSaveDialog
                    categories={categories}
                    dialogNewsState={dialogNewsState}
                    toggleModalChange={toggleModalChange}
                    openModal={openModal}
                />
            }
            {
                (news.length > 0)
                    ? news.map((a, idx) => {
                        return <News
                            key={idx}
                            article={a}
                            categories={categories}
                            toggleModalChange={toggleModalChange}
                            toggleSnippetAppendModalChange={toggleSnippetAppendModalChange}
                            setDialogNewsState={setDialogNewsState}
                            setDialogSnippetAppendState={setDialogSnippetAppendState}
                        />
                    })
                    : <div className={classes.resultsInfo}>No Results Match Your Search</div>
            }
        </>
    )
}