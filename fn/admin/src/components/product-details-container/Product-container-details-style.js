import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingTop: 64,
        margin: 10,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 5,
    },
    img: {
        display: 'block',
        margin: 'auto',
    },
    textField: {
        margin: 10,
        disabledColor: 'black',
    },
    disabled: {},
}));
