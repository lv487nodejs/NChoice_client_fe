import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import wrapWithAdminService from '../../wrappers';

import { useStyles } from './Latest-orders-style';
import { setOrders, ordersLoadingStatus } from '../../../actions';
import LoadingBar from '../../loading-bar';

const tableTitles = ['Order ID', 'Customer', 'Date', 'Status'];
const DATE_FORMAT = 'DD MMM YYYY';
const TABLE_TITLE = 'Latest Orders';

const LatestOrders = ({ orders, loading, adminService, setOrders, ordersLoadingStatus }) => {
    const classes = useStyles();
    const { ordersService } = adminService;

    useEffect(() => {
        ordersLoadingStatus();
        ordersService.getAllOrders().then(res => setOrders(res));
    }, [ordersService, setOrders, ordersLoadingStatus]);

    if (loading) {
        return <LoadingBar />;
    }

    console.log(orders);

    const tableHeaders = tableTitles.map(title => <TableCell>{title}</TableCell>);

    const tableRows = orders.sort().map(order => (
        <TableRow hover key={order._id}>
            <TableCell>{order._id}</TableCell>
            <TableCell>{order.userId.email}</TableCell>
            <TableCell>{moment(order.date).format(DATE_FORMAT)}</TableCell>
            <TableCell>
                <div className={classes.statusContainer}>
                    <span className={classes[order.status]} />
                    {order.status}
                </div>
            </TableCell>
        </TableRow>
    ));

    return (
        <Card className={classes.root}>
            <CardHeader title={TABLE_TITLE}/>
            <Divider />
            <CardContent className={classes.content}>
                <div className={classes.inner}>
                    <Table>
                        <TableHead>
                            <TableRow>{tableHeaders}</TableRow>
                        </TableHead>
                        <TableBody>{tableRows}</TableBody>
                    </Table>
                </div>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <Button color="default" size="small" variant="text">
                    View all <ArrowRightIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = ({ ordersState: { orders, loading } }) => ({
    orders,
    loading,
});
const mapDispatchToProps = {
    setOrders,
    ordersLoadingStatus,
};

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(LatestOrders));
