import React from 'react';
import { Link } from 'react-router-dom';

import {
    Button,
    ButtonGroup,
    Menu,
    MenuItem,
    FormControlLabel,
    Checkbox,
    InputBase,
    Grid,
    FormGroup,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyle from './Table-nav-style';

const pathToAddProductPage = '/productadd';

const TableNav = () => {
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    return (
        <Grid className={classes.tableNav} container spacing={3} justify="center" alignItems="center">
            <Grid item xs={2}>
                <Button component={Link} to={pathToAddProductPage} variant="contained" color="primary" size="small">
                    NEW PRODUCT
                </Button>
            </Grid>
            <Grid item xs={4}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button size="small" aria-controls="simple-menu" onClick={handleClick}>
                        Catalogs
                    </Button>
                    <Menu
                        elevation={0}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <FormGroup column>
                            <MenuItem>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedA}
                                            onChange={handleChange('checkedA')}
                                            value="checkedA"
                                            size="small"
                                        />
                                    }
                                    label="Secondary"
                                    size="small"
                                />
                            </MenuItem>
                            <MenuItem>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedB}
                                            onChange={handleChange('checkedB')}
                                            value="checkedB"
                                            size="small"
                                        />
                                    }
                                    label="Secondary"
                                />
                            </MenuItem>
                            <MenuItem>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedC}
                                            onChange={handleChange('checkedC')}
                                            value="checkedC"
                                            size="small"
                                        />
                                    }
                                    label="Secondary"
                                />
                            </MenuItem>
                            <MenuItem>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedD}
                                            onChange={handleChange('checkedD')}
                                            value="checkedD"
                                            size="small"
                                        />
                                    }
                                    label="Secondary"
                                />
                            </MenuItem>
                        </FormGroup>
                    </Menu>
                    <Button size="small">Categories</Button>
                    <Button size="small">Brands</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default TableNav;
