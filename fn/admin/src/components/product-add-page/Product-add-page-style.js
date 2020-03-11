import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        paddingTop: 70,
    },
    textfield: {
        margin: 10,
        width: 200,
    },
}));
