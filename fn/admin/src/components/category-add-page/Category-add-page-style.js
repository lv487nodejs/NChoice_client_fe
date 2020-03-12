import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        paddingTop: 70,
    },
    textfield: {
        textTransform: 'uppercase',
        margin: 10,
        width: 300,
    },
}));
