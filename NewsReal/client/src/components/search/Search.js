import React, {
    useContext,
    useState,
    useEffect
} from 'react';
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns';
import { NewsContext } from '../../providers/NewsProvider';
import {
    Button,
    CssBaseline,
    Divider,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select,
} from '@material-ui/core';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ClassIcon from '@material-ui/icons/Class';
import DomainIcon from '@material-ui/icons/Domain';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const useStyles = makeStyles((theme) => ({
    button: {
        // color: 'primary',
        margin: 'auto',
    },
    inputSelect: {
        marginLeft: '16px',
        marginRight: '16px',
        width: '-webkit-fill-available',
    },
    inputField: {
        display: 'block',
        height: '35px',
        margin: '16px 16px',
        width: '-webkit-fill-available',
    },
    searchTitle: {
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
    },
}));

export const Search = ({ categories, open, handleDrawerChange, setNewsReady }) => {
    const classes = useStyles();
    const { getNewsByDefinedParameters } = useContext(NewsContext);

    const initialSearchState = {
        language: "en",
        category: "",
        start_date: null,
        end_date: null,
        country: "us",
        page_number: 1,
        domain: "",
        domain_not: "",
        type: "",
    };

    const [searchState, setSearchState] = useState(initialSearchState);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChange = (e) => {
        const updatedSearchState = { ...searchState };
        updatedSearchState[e.target.name] = e.target.value;
        setSearchState(updatedSearchState);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e);
    };

    useEffect(() => {
        if (!open) {
            setSearchState(initialSearchState);
            setStartDate(null);
            setEndDate(null);
        };
    }, [open]);

    const date = new Date();
    const earliestDate = ((date.getMonth() - 5 > 0) ? (date.getFullYear()) : (date.getFullYear() - 1)) + '-' + ((date.getMonth() - 5 > 0) ? (date.getMonth() - 5) : (date.getMonth() + 7)) + '-' + date.getDate();

    const submitSearchCriteria = (e) => {
        e.preventDefault();

        if (searchState.domain.includes('www.') || searchState.domain_not.includes('www.')) {
            alert('Please remove domain prefix from search criteria: e.g. www.cnn.com becomes cnn.com')
        } else {
            if (startDate !== null && startDate !== "") {
                searchState.start_date = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            if (endDate !== null && endDate !== "") {
                searchState.end_date = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            let searchCriteriaString = ""

            Object.keys(searchState).forEach((key) => {
                if (searchState[key] !== null && searchState[key] !== "") {
                    searchCriteriaString = searchCriteriaString + `&${key}=${searchState[key]}`
                }
            });

            setNewsReady(false);
            getNewsByDefinedParameters(searchCriteriaString).then(handleDrawerChange);
        }
    };

    return (
        <>
            <CssBaseline />
            <List>
                {
                    (open)
                        ? <div>
                            <ListSubheader inset>News Filter Criteria</ListSubheader>
                            <FormControl className={classes.inputSelect}>
                                <InputLabel id="searchFilter--categoryLabel">Category</InputLabel>
                                <Select
                                    labelId="searchFilter--categoryLabel"
                                    id="searchFilter--category"
                                    value={searchState.category}
                                    onChange={handleChange}
                                    label="Category"
                                    name="category"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <ClassIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        categories.map(c => <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            <ListItem>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="none"
                                            id="start-date-picker-inline"
                                            label="Date Range Start"
                                            name="start_date"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            autoOk={true}
                                            disableFuture={true}
                                            minDate={earliestDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </ListItem>
                            <ListItem>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="none"
                                            id="end-date-picker-inline"
                                            label="Date Range End"
                                            name="end_date"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            autoOk={true}
                                            disableFuture={true}
                                            minDate={earliestDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                                position: 'start',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </ListItem>
                            <FormControl className={classes.inputField}>
                                <InputLabel id="searchFilter--domain">Domain: Exclusive</InputLabel>
                                <Input
                                    variant="outlined"
                                    margin="none"
                                    fullWidth
                                    name="domain"
                                    type="text"
                                    id="searchFilter--domain"
                                    title="exclude prefix (e.g. www)"
                                    onChange={handleChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <DomainIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl className={classes.inputField}>
                                <InputLabel id="searchFilter--domain">Domain: Exclusion</InputLabel>
                                <Input
                                    variant="outlined"
                                    margin="none"
                                    fullWidth
                                    name="domain_not"
                                    type="text"
                                    id="searchFilter--domainNot"
                                    title="exclude prefix (e.g. www)"
                                    onChange={handleChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <DomainDisabledIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl className={classes.inputSelect}>
                                <InputLabel id="searchFilter--pageNumberLabel">Pages Returned</InputLabel>
                                <Select
                                    labelId="searchFilter--pageNumberLabel"
                                    id="searchFilter--pageNumber"
                                    value={searchState.page_number}
                                    onChange={handleChange}
                                    name="page_number"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PlaylistAddIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value={1}>Max 30</MenuItem>
                                    <MenuItem value={2}>Max 60</MenuItem>
                                    <MenuItem value={3}>Max 90</MenuItem>
                                    <MenuItem value={4}>Max 120</MenuItem>
                                    <MenuItem value={5}>Max 150</MenuItem>
                                </Select>
                            </FormControl>
                            <ListItem>
                                <Button variant="contained" color="primary" className={classes.button} onClick={submitSearchCriteria}>Search By Criteria</Button>
                            </ListItem>
                        </div>
                        : <Button onClick={handleDrawerChange}><span className={classes.searchTitle}>News Filter Criteria</span></Button>
                }
            </List>
            <Divider />
            <List>
                <div>
                    <ListSubheader inset>Saved Search Criteria</ListSubheader>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Current month" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Last quarter" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Year-end sale" />
                    </ListItem>
                </div>
            </List>
        </>
    );
};