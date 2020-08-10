import React from 'react';
import {
    Button,
    Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    snackButton: {
        color: 'red',
    },
    root: {
        color: 'black',
        backgroundColor: 'inherit',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export const DeleteSearchSnackbar = ({ snackState, toggleSnack, nukeSearch }) => {
    const classes = useStyles();
    const { vertical, horizontal, snackOpen, searchParameterTitle, searchParameterId } = snackState;

    return (
        <Snackbar
            className={classes.root}
            anchorOrigin={{ vertical, horizontal }}
            open={snackOpen}
            onClose={toggleSnack}
            message={<><p>Are you certain you wish to delete:</p><p>{searchParameterTitle}</p></>}
            key={vertical + horizontal}
            action={
                <React.Fragment>
                    <Button className={classes.snackButton} size="small" onClick={() => nukeSearch(searchParameterId)}>
                        Yes I am Certain
                    </Button>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={toggleSnack}
                    >
                        <CloseIcon />
                    </IconButton>
                </React.Fragment>
            }
        />
    )
}