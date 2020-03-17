import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'fixed',
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
}));
