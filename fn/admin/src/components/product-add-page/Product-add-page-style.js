import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        paddingTop: 70,
    },
    textfield: {
        margin: 10,
    },
}));
