import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../../config';

export const useStyles = makeStyles(theme => ({
    content: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
        },
        marginTop: 65,
        padding: theme.spacing(2),
        width: '100%',
    },
}));
