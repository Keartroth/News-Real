import React, {
    useContext,
    useEffect,
    useState,
    useRef
} from 'react';
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns';
import { NewsContext } from '../../providers/NewsProvider';
import { SearchContext } from '../../providers/SearchProvider';
import {
    Button,
    Checkbox,
    CssBaseline,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
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
import FindInPageIcon from '@material-ui/icons/FindInPage';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: 'auto',
    },
    inputDatePicker: {
        margin: '2% 11%',
        padding: '0',
        width: '-webkit-fill-available',
    },
    inputSelect: {
        margin: '2% 5%',
        padding: '0',
        width: '-webkit-fill-available',
    },
    inputField: {
        display: 'block',
        height: '35px',
        margin: '2% 5%',
        padding: '0',
        width: '-webkit-fill-available',
    },
    searchList: {
        paddingTop: '0px'
    },
    searchMemo: {
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        marginLeft: '-18px',
    },
    searchTitle: {
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
    },
}));

export const Search = (props) => {
    const classes = useStyles();
    const { open, toggleDrawerChange, categories } = props;
    const { setNewsReady, getNewsByDefinedParameters } = useContext(NewsContext);
    const {
        searchParameters, searchParametersReady, searchParameterReady,
        getSearchParameters, getSearchParameterById, addSearchParameter,
        deleteSearchParameter, updateSearchParameter
    } = useContext(SearchContext);
    const [checkState, setCheckState] = useState(false);
    const searchTitle = useRef();
    const toggleCheckState = () => {
        setCheckState(!checkState);
    }

    useEffect(() => {
        getSearchParameters();
    }, []);

    useEffect(() => {
        console.log(searchParameters);
    }, [searchParameters]);

    const initialSearchState = {
        language: "en",
        category: "",
        keywords: "",
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

    const isEquivalent = (a, b) => {
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);

        if (aProps.length !== bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        return true;
    }

    const submitSearchCriteria = (e) => {
        e.preventDefault();
        const bool = isEquivalent(searchState, initialSearchState);

        if (searchState.domain.includes('www.') || searchState.domain_not.includes('www.')) {
            alert('Please remove domain prefix from search criteria: e.g. www.cnn.com becomes cnn.com')
        } else if (bool) {
            toggleDrawerChange();
            alert('No parameters selected.')
        } else {
            if (startDate !== null && startDate !== "") {
                searchState.start_date = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            if (endDate !== null && endDate !== "") {
                searchState.end_date = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            let searchCriteriaString = ""

            Object.keys(searchState).forEach((key, idx) => {
                if (searchState[key] !== null && searchState[key] !== "") {
                    if (idx === 0) {
                        searchCriteriaString = `${key}=${searchState[key]}`
                    } else {
                        searchCriteriaString = searchCriteriaString + `&${key}=${searchState[key]}`
                    }
                }
            });

            setNewsReady(false);
            getNewsByDefinedParameters(searchCriteriaString).then(toggleDrawerChange);
        }
    };

    const submitSaveSearchCriteria = (e) => {
        e.preventDefault();

        const bool = isEquivalent(searchState, initialSearchState);

        if (searchState.domain.includes('www.') || searchState.domain_not.includes('www.')) {
            alert('Please remove domain prefix from search criteria: e.g. www.cnn.com becomes cnn.com')
        } else if (bool) {
            toggleDrawerChange();
            alert('Cannot save blank search parameters.');
        } else if (searchTitle.current.value === "") {
            alert('Saved search criteria requires a title.');
        } else {
            if (startDate !== null && startDate !== "") {
                searchState.start_date = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            if (endDate !== null && endDate !== "") {
                searchState.end_date = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            searchState.primary = 0;
            searchState.startDate = searchState.start_date;
            searchState.endDate = searchState.end_date;
            searchState.pageNumber = searchState.page_number;
            searchState.domainNot = searchState.domain_not;
            searchState.title = searchTitle.current.lastChild.value;
            debugger
            addSearchParameter(searchState);
        }
    };

    return (
        <>
            <CssBaseline />
            <List className={classes.searchList}>
                {
                    (open)
                        ? <div>
                            <ListItem>
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
                            </ListItem>
                            <ListItem className={classes.inputDatePicker}>
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
                            <ListItem className={classes.inputDatePicker}>
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
                            <ListItem>
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
                            </ListItem>
                            <ListItem>
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
                            </ListItem>
                            <ListItem>
                                <FormControl className={classes.inputField}>
                                    <InputLabel id="searchFilter--domain">Keywords</InputLabel>
                                    <Input
                                        variant="outlined"
                                        margin="none"
                                        fullWidth
                                        name="keywords"
                                        type="text"
                                        id="searchFilter--keywords"
                                        title="Less is more"
                                        placeholder="Less is more"
                                        onChange={handleChange}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <FindInPageIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </ListItem>
                            <ListItem>
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
                            </ListItem>
                            <ListItem>
                                <FormControl className={classes.inputSelect}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkState}
                                                onChange={toggleCheckState}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Save Criteria"
                                    />
                                </FormControl>
                            </ListItem>
                            {
                                checkState && <ListItem>
                                    <FormControl className={classes.inputField}>
                                        <InputLabel id="searchFilter--domain">Search Title</InputLabel>
                                        <Input
                                            variant="outlined"
                                            margin="none"
                                            fullWidth
                                            name="searchTitle"
                                            type="text"
                                            id="searchFilter--searchTitle"
                                            ref={searchTitle}
                                        />
                                    </FormControl>
                                </ListItem>
                            }
                            <ListItem>
                                {
                                    checkState
                                        ? <Button variant="contained" color="primary" className={classes.button} onClick={submitSaveSearchCriteria}>Save Search Criteria</Button>
                                        : <Button variant="contained" color="primary" className={classes.button} onClick={submitSearchCriteria}>Search By Criteria</Button>
                                }
                            </ListItem>
                        </div>
                        : <Button onClick={toggleDrawerChange}><span className={classes.searchTitle}>News Filter Criteria</span></Button>
                }
            </List>
            <Divider />
            {
                !open && searchParametersReady && <div><ListSubheader inset>Saved Search Criteria</ListSubheader>
                    {
                        searchParameters.map(sp => {
                            // if (sp.primary) {
                            return (
                                <ListItem button>
                                    <ListItemIcon title={sp.title}>
                                        <AssignmentIcon onClick={(e) => {
                                            e.preventDefault();
                                            setSearchState(sp);
                                            submitSearchCriteria();
                                        }} />
                                    </ListItemIcon>
                                    <ListItemText primary={sp.title} />
                                </ListItem>
                            )
                            // }
                        })
                    }
                </div>
            }
            {/* {
                open && searchParametersReady && <ListItem>
                <FormControl className={classes.inputSelect}>
                    <InputLabel id="savedSearchSelect--label">Saved Search Parameters</InputLabel>
                    <Select
                        labelId="savedSearchSelect--label"
                        id="savedSearchSelect"
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
            </ListItem>
            } */}
        </>
    );
};