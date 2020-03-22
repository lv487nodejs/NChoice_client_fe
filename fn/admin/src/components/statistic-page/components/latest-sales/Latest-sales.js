import React from 'react';
import { connect } from 'react-redux';

import { Bar } from 'react-chartjs-2';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    useTheme,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';

import { setDaysValue } from '../../../../actions';
import { useStyles } from './Latest-sales-style';
import { chartBarOptions, daysCount, chartBarDataSet, chartData } from './Latest-sales-helpers';

const chartTitle = 'Latest Sales';
const daysOptions = [7, 14, 30];
const optionsLabel = 'Days';

const selectStyle = {
    size: 'small',
    variant: 'outlined',
    native: true,
};

const LatestSales = ({ setDaysValue, daysValue }) => {
    const classes = useStyles();
    const theme = useTheme();

    const daysChartDate = chartData.slice(0, daysValue).reverse();
    const chartLabels = daysCount(daysValue);
    const options = chartBarOptions(theme);
    const data = chartBarDataSet(theme, chartLabels, daysChartDate);

    const handleOptionChange = event => {
        const value = parseInt(event.target.value);
        setDaysValue(value);
    };

    const chartDaysOptionsField = (daysOptions, label) => {
        const { size, variant, native } = selectStyle;

        return (
            <FormControl size={size} variant={variant} className={classes.formControl}>
                <InputLabel>{label}</InputLabel>
                <Select
                    native={native}
                    value={daysValue}
                    label={label}
                    onChange={handleOptionChange}
                >
                    {daysOptions.map(option => (
                        <option value={option}>{`${option} ${label}`}</option>
                    ))}
                </Select>
            </FormControl>
        );
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                action={chartDaysOptionsField(daysOptions, optionsLabel)}
                title={chartTitle}
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Bar data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};

const mapStateToProps = ({ chartsState: { daysValue } }) => ({
    daysValue,
});
const mapDispatchToProps = {
    setDaysValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestSales);
