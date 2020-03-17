import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    tableNav: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
}));

export default useStyles;
