import { colors } from '@material-ui/core';

export const chartsColors = [
    colors.indigo[400],
    colors.red[400],
    colors.orange[400],
    colors.green[400],
    colors.brown[400],
];

export const dataSets = (theme, data, labels) => ({
    datasets: [
        {
            data,
            backgroundColor: chartsColors,
            borderWidth: 5,
            borderColor: theme.palette.background.paper,
            hoverBorderColor: theme.palette.background.paper,
        },
    ],
    labels,
});

export const chartOptions = theme => ({
    legend: {
        display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 65,
    layout: { padding: 3 },
    tooltips: {
        enabled: true,
        mode: 'index',
        intersect: false,
        borderWidth: 1,
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.default,
        titleFontColor: theme.palette.text.primary,
        bodyFontColor: theme.palette.text.primary,
        footerFontColor: theme.palette.text.primary,
    },
});

const checkRatio = array => {
    const sum = array.reduce((item, sum) => sum + item);
    return sum === 100;
};

export const salesRatio = (...sales) => {
    const salesArray = [...sales];
    const salesSum = salesArray.reduce((sale, sum) => sum + sale);
    const salesRatio = salesArray.map(sale => Math.round((sale / salesSum) * 100));

    if (!checkRatio(salesRatio)) {
        salesRatio[0] -= 1;
        return salesRatio;
    }

    return salesRatio;
};
