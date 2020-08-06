import React from 'react';
import {
    Container,
    CssBaseline,
    Link,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://keartroth.github.io/" target="_blank" rel="noopener noreferrer">
                Michael Carroll
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        width: '100%',
        height: '60px',
        outline: 'solid 1px darkgray',
        position: 'absolute',
        flexShrink: '0',
        padding: theme.spacing(1.5, 2),
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <CssBaseline />
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </footer>
    );
};