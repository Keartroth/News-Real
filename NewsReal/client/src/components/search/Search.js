import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { NewsContext } from '../../providers/NewsProvider';
import { SearchContext } from '../../providers/SearchProvider';
import {
    AppBar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ClassIcon from '@material-ui/icons/Class';
import DomainIcon from '@material-ui/icons/Domain';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
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
    savedSearchButtonStyleOne: {
        margin: '0.25rem 8%'
    },
    savedSearchButtonStyleTwo: {
        display: 'block',
        margin: '0.5rem auto'
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
    title: {
        display: 'block',
        textAlign: 'center',
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const getRelativeDateFromInteger = (searchParameter) => {
    let dateObject = {};
    if (searchParameter.startDate !== null) {
        const date = new Date();
        date.setDate(date.getUTCDate() - searchParameter.startDate);
        const startDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        dateObject.start_date = startDate;
    }
    if (searchParameter.endDate !== null) {
        const date = new Date();
        date.setDate(date.getUTCDate() - searchParameter.endDate);
        const endDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        dateObject.end_date = endDate;
    }
    return dateObject;
}

export const Search = (props) => {
    const classes = useStyles();
    const { open, toggleDrawerChange, categories, toggleSnack } = props;
    const { setNewsReady, getNewsByDefinedParameters } = useContext(NewsContext);
    const { searchParameters, searchParametersReady, getSearchParameters, addSearchParameter, updateSearchParameter } = useContext(SearchContext);
    const [checkState, setCheckState] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const toggleCheckState = () => {
        setCheckState(!checkState);
    }
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        getSearchParameters();
    }, []);

    useEffect(() => {
        if (!checkState) {
            setSearchState(initialSearchState);
        }
    }, [checkState]);

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

    const handleChange = (e, propertyName) => {
        const updatedSearchState = { ...searchState };
        if (Object.prototype.toString.call(e) === "[object Date]") {
            updatedSearchState[propertyName] = e;
            setSearchState(updatedSearchState);
        } else {
            updatedSearchState[e.target.name] = e.target.value;
            setSearchState(updatedSearchState);
        }
    };

    useEffect(() => {
        if (!open) {
            setSearchState(initialSearchState);
            setCheckState(false);
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
            if (open) {
                toggleDrawerChange();
            }
            alert('No parameters selected.')
        } else if (searchState.start_date > searchState.end_date) {
            alert('Start date must be before end date.')
        } else {
            if (searchState.start_date !== null && searchState.start_date !== "") {
                const startDate = format(searchState.start_date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
                searchState.start_date = startDate;
            }
            if (searchState.end_date !== null && searchState.end_date !== "") {
                const endDate = format(searchState.end_date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
                searchState.end_date = endDate;
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

    const submitSavedSearchCriteria = (e, searchCriteria) => {
        e.preventDefault();
        if (searchCriteria.start_date !== null && searchCriteria.start_date !== "") {
            searchCriteria.start_date = format(new Date(searchCriteria.start_date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        }
        if (searchCriteria.end_date !== null && searchCriteria.end_date !== "") {
            searchCriteria.end_date = format(new Date(searchCriteria.end_date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        }
        let searchCriteriaString = ""

        Object.keys(searchCriteria).forEach((key, idx) => {
            if (searchCriteria[key] !== null && searchCriteria[key] !== "") {
                if (idx === 0) {
                    searchCriteriaString = `${key}=${searchCriteria[key]}`
                } else {
                    searchCriteriaString = searchCriteriaString + `&${key}=${searchCriteria[key]}`
                }
            }
        });

        setNewsReady(false);
        getNewsByDefinedParameters(searchCriteriaString).then(() => {
            if (open) {
                toggleDrawerChange();
            }
        });
    };

    const saveSearchCriteria = (e) => {
        e.preventDefault();

        const bool = isEquivalent(searchState, initialSearchState);

        if (searchState.domain.includes('www.') || searchState.domain_not.includes('www.')) {
            alert('Please remove domain prefix from search criteria: e.g. www.cnn.com becomes cnn.com')
        } else if (bool) {
            toggleDrawerChange();
            alert('Cannot save blank search parameters.');
        } else if (searchState.title === "") {
            alert('Saved search criteria requires a title.');
        } else if (searchState.start_date > searchState.end_date) {
            alert('Start date must be before end date.')
        } else {
            if (searchState.start_date !== null && searchState.start_date !== "") {
                const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                const today = new Date();
                const startDate = new Date(searchState.start_date);
                const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                const utcStart = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const diffUTCDays = Math.floor((utcToday - utcStart) / _MS_PER_DAY);
                searchState.startDate = diffUTCDays
            }
            if (searchState.end_date !== null && searchState.end_date !== "") {
                const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                const today = new Date();
                const endDate = new Date(searchState.end_date);
                const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                const utcEnd = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                const diffUTCDays = Math.floor((utcToday - utcEnd) / _MS_PER_DAY);
                searchState.endDate = diffUTCDays;
            }

            searchState.pageNumber = searchState.page_number;
            searchState.domainNot = searchState.domain_not;

            if (searchState.id) {
                updateSearchParameter(searchState.id, searchState).then(toggleDrawerChange);
            } else {
                let totalPrimary;
                if (searchParametersReady) {
                    totalPrimary = searchParameters.filter(sp => sp.primary === true).length;
                }

                if (totalPrimary < 5) {
                    searchState.primary = true;
                } else {
                    searchState.primary = false;
                }
                addSearchParameter(searchState).then(toggleDrawerChange);
            }
        }
    };

    const togglePrimarySavedSearchParameter = (searchParameter) => {
        const id = searchParameter.id;
        searchParameter.primary = !searchParameter.primary;

        updateSearchParameter(id, searchParameter);
    }

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
                                        value={searchState.category || ""}
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
                                            label={checkState ? "Start of Relative Range " : "Date Range Start"}
                                            name="start_date"
                                            value={searchState.start_date || null}
                                            onChange={(e) => { handleChange(e, "start_date") }}
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
                                            label={checkState ? "End of Relative Range " : "Date Range End"}
                                            name="end_date"
                                            value={searchState.end_date || null}
                                            onChange={(e) => { handleChange(e, "end_date") }}
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
                                        value={searchState.domain || ""}
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
                                        value={searchState.domain_not || ""}
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
                                        value={searchState.keywords || ""}
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
                                        value={searchState.page_number || 1}
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
                                        <InputLabel id="searchFilter--title">Search Title</InputLabel>
                                        <Input
                                            variant="outlined"
                                            margin="none"
                                            fullWidth
                                            name="title"
                                            type="text"
                                            id="title"
                                            value={searchState.title || ""}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </ListItem>
                            }
                            <ListItem>
                                {
                                    checkState
                                        ? <Button variant="contained" color="primary" className={classes.button} onClick={saveSearchCriteria}>Save Search Criteria</Button>
                                        : <Button variant="contained" color="primary" className={classes.button} onClick={submitSearchCriteria}>Search By Criteria</Button>
                                }
                            </ListItem>
                        </div>
                        : <Button onClick={toggleDrawerChange}><span className={classes.searchTitle}>News Filter Criteria</span></Button>
                }
            </List>
            <Divider />
            {
                !open && searchParametersReady && <div><ListItem><ListItemIcon title="Saved Search Criteria"><SearchOutlinedIcon /></ListItemIcon></ListItem>
                    {
                        searchParameters.sort(sp => sp.title).map((sp, idx) => {
                            if (sp.primary) {
                                return (
                                    <ListItem key={idx} button>
                                        <ListItemIcon title={sp.title}>
                                            <AssignmentIcon onClick={(e) => {
                                                e.preventDefault();
                                                let savedSearchState = {
                                                    language: sp.language,
                                                    category: sp.category,
                                                    keywords: sp.keywords,
                                                    start_date: null,
                                                    end_date: null,
                                                    country: sp.country,
                                                    page_number: sp.pageNumber,
                                                    domain: sp.domain,
                                                    domain_not: sp.domainNot,
                                                    type: sp.type,
                                                };

                                                let dateObject = {};
                                                if (sp.startDate !== null || sp.endDate !== null) {
                                                    dateObject = getRelativeDateFromInteger(sp);
                                                    savedSearchState.start_date = dateObject.start_date;
                                                    savedSearchState.end_date = dateObject.end_date;
                                                }
                                                submitSavedSearchCriteria(e, savedSearchState);
                                            }} />
                                        </ListItemIcon>
                                        <ListItemText primary={sp.title} />
                                    </ListItem>
                                )
                            }
                        })
                    }
                </div>
            }
            {
                open && searchParametersReady && <div>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="scrollable force tabs example"
                            >
                                {
                                    searchParameters.sort(sp => sp.title).map((sp, idx) => {
                                        return (
                                            <Tab key={idx} label={sp.title} icon={<AssignmentIcon />} {...a11yProps(idx)} />
                                        )
                                    })
                                }
                            </Tabs>
                        </AppBar>
                        {
                            searchParameters.sort(sp => sp.title).map((sp, idx) => {
                                return (
                                    <TabPanel key={idx} value={tabValue} index={idx} component="div">
                                        <span className={classes.title}>{sp.title}</span>
                                        <Button variant="contained" color="primary" className={classes.savedSearchButtonStyleTwo} onClick={(e) => {
                                            e.preventDefault();

                                            let savedSearchState = {
                                                keywords: sp.keywords,
                                                language: sp.language,
                                                start_date: null,
                                                end_date: null,
                                                type: sp.type,
                                                country: sp.country,
                                                category: sp.category,
                                                page_number: sp.pageNumber,
                                                domain: sp.domain,
                                                domain_not: sp.domainNot,
                                            };

                                            let dateObject = {};
                                            if (sp.startDate !== null || sp.endDate !== null) {
                                                dateObject = getRelativeDateFromInteger(sp);
                                                savedSearchState.start_date = dateObject.start_date;
                                                savedSearchState.end_date = dateObject.end_date;
                                            }

                                            submitSavedSearchCriteria(e, savedSearchState);
                                        }}>Search By Criteria</Button>
                                        <Button variant="contained" color="primary" className={classes.savedSearchButtonStyleOne} onClick={(e) => {
                                            e.preventDefault();

                                            let savedSearchState = {
                                                id: sp.id,
                                                userProfileId: sp.userProfileId,
                                                start_date: null,
                                                end_date: null,
                                                primary: sp.primary,
                                                title: sp.title,
                                                keywords: sp.keywords,
                                                language: sp.language,
                                                type: sp.type,
                                                country: sp.country,
                                                category: sp.category,
                                                page_number: sp.pageNumber,
                                                domain: sp.domain,
                                                domain_not: sp.domainNot,
                                            };
                                            if (!checkState) {
                                                toggleCheckState();
                                            }

                                            let dateObject = {};
                                            if (sp.startDate !== null || sp.endDate !== null) {
                                                dateObject = getRelativeDateFromInteger(sp);
                                                savedSearchState.start_date = dateObject.start_date;
                                                savedSearchState.end_date = dateObject.end_date;
                                            }

                                            setSearchState(savedSearchState);
                                        }}>Edit</Button>
                                        <Button variant="contained" color="primary" className={classes.savedSearchButtonStyleOne} onClick={() => { toggleSnack(sp) }}>Delete</Button>
                                        {
                                            sp.primary
                                                ? <Button variant="contained" color="primary" className={classes.savedSearchButtonStyleTwo} onClick={(e) => { togglePrimarySavedSearchParameter(sp) }}>Unselect as Default</Button>
                                                : <Button variant="contained" color="primary" className={classes.savedSearchButtonStyleTwo} onClick={(e) => {
                                                    e.preventDefault();
                                                    let totalPrimary;
                                                    if (searchParametersReady) {
                                                        totalPrimary = searchParameters.filter(sp => sp.primary === true).length;
                                                    }
                                                    if (totalPrimary >= 5) {
                                                        alert(`Unable to set ${sp.title} as a default search parameter. \n Only five search parameters can be selected as default at a time. \n Please deselect another search parameter first.`)
                                                    } else {
                                                        togglePrimarySavedSearchParameter(sp);
                                                    }
                                                }}>Select as Default</Button>
                                        }
                                    </TabPanel>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
};