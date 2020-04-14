import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    login: {
        gridColumnStart: 4,
        gridColumnEnd: 10,
        gridRowStart: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        width: '300px'
    }
}));
