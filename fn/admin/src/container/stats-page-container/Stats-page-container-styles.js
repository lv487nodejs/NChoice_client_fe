import { makeStyles } from '@material-ui/core/styles';

import { DRAWER_WIDTH } from '../../config';

export const useStyles = makeStyles(() => ({
    statsPageContainer: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        position: 'static',
    },
}));
