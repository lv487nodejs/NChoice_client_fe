import { makeStyles } from '@material-ui/core/styles';

import { DRAWER_WIDTH } from '../../config';

export const useStyles = makeStyles(theme => ({
    statsPageContainer: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
        },
        marginTop: 65,
        padding: 20,
        width: '100%',
    },
}));
