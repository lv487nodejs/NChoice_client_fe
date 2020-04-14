import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateRows: 'repeat(6, 100px)',
        gridTemplateColumns: 'repeat(12, 1fr)',
        justifyContent: 'center',
        justifyItems: 'center',
        width: '100%',
        // marginTop: theme.spacing(20)
    }
}));
