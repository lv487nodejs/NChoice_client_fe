import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useTheme } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider, Typography } from '@material-ui/core';

import { useStyles } from './Sales-by-style';
import { dataSets, chartOptions, salesRatio, chartsColors } from './Sales-by-helpers';

const chartTitle = 'Sales By Catalog';

const mensSale = 372;
const womensSale = 465;
const kidsSale = 230;

const ratioOptions = [mensSale, womensSale, kidsSale];
const salesLabel = ['Men', 'Women', 'Kids'];

const SalesBy = () => {
    const classes = useStyles();
    const theme = useTheme();

    const chartData = [salesLabel, salesRatio(...ratioOptions), chartsColors];

    const chartLegends = salesLabel.map((data, index) => {
        const title = chartData[0][index];
        const value = chartData[1][index];
        const color = chartData[2][index];

        return {
            title,
            value,
            color,
        };
    });

    const labels = chartData[0];
    const data = chartData[1];
    const options = chartOptions(theme);

    const chartLegendsItems = chartLegends.map(legend => (
        <div className={classes.legend} key={legend.title}>
            <Typography>{legend.title}</Typography>
            <Typography style={{ color: legend.color }} variant="h2">
                {legend.value}%
            </Typography>
        </div>
    ));

    return (
        <Card className={classes.root}>
            <CardHeader title={chartTitle} />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Doughnut data={dataSets(theme, data, labels)} options={options} />
                </div>
                <div className={classes.stats}>{chartLegendsItems}</div>
            </CardContent>
        </Card>
    );
};

export default SalesBy;
