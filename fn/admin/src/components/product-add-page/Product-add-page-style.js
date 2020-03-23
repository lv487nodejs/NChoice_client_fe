import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../../config';

export const useStyles = makeStyles(theme => ({
    content: {
        // display: 'flex',
        // flexDirection: 'column',
        // flexGrow: 1,
        marginTop: 90,
        margin: theme.spacing(2),
        minHeight: '80vh',
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
        },
    },
    textfield: {
        textTransform: 'uppercase',
        margin: theme.spacing(1),
        minWidth: 200,
    },
    productPropetries: {
        margin: 10,
        padding: 10,
    },
}));
