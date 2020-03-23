import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: 10,
        height: '100%'
    },
    img: {
        display: 'block',
        margin: '0 auto',
    }
}));
