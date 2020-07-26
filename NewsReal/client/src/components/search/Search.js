import React, { useContext, useState, useEffect } from 'react';
import { CssBaseline, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClassIcon from '@material-ui/icons/Class';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { NewsContext } from '../../providers/NewsProvider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CategoryContext } from '../../providers/CategoryProvider';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DomainIcon from '@material-ui/icons/Domain';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';

const useStyles = makeStyles((theme) => ({
    searchTitle: {
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
    },
}));

export const SearchItems = ({ open, handleDrawerChange }) => {
    const classes = useStyles();
    const { getNewsByDefinedParameters } = useContext(NewsContext);
    const { categories, getCategories } = useContext(CategoryContext);

    useEffect(() => {
        getCategories();
    }, []);

    const [searchState, setSearchState] = useState({
        language: "en",
        category: "",
        start_date: "",
        end_date: "",
        country: "us",
        page_number: 1,
        domain: "",
        domain_not: "",
        type: "",
    });

    const handleChange = (e) => {
        const updatedSearchState = { ...searchState };
        updatedSearchState[e.target.name] = e.target.value;
        setSearchState(updatedSearchState);
    }

    return (
        <>
            <CssBaseline />
            <List>
                {
                    (open)
                        ? <div>
                            <ListSubheader inset>News Filter Criteria</ListSubheader>
                            <ListItem button>
                                <ListItemIcon>
                                    <ClassIcon />
                                </ListItemIcon>
                                <InputLabel id="searchFilter--categoryLabel">Category</InputLabel>
                                <Select
                                    labelId="searchFilter--categoryLabel"
                                    id="searchFilter--category"
                                    value={searchState.category}
                                    onChange={handleChange}
                                    label="Category"
                                    name="category"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        categories.map(c => <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)
                                    }
                                </Select>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DateRangeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Start Date" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DateRangeIcon />
                                </ListItemIcon>
                                <ListItemText primary="End Date" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DomainIcon />
                                </ListItemIcon>
                                <ListItemText primary="Domain Exclusive" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DomainDisabledIcon />
                                </ListItemIcon>
                                <ListItemText primary="Exclude Domain" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PlaylistAddIcon />
                                </ListItemIcon>
                                <InputLabel id="searchFilter--pageNumberLabel">Pages Returned</InputLabel>
                                <Select
                                    labelId="searchFilter--pageNumberLabel"
                                    id="searchFilter--pageNumber"
                                    value={searchState.page_number}
                                    onChange={handleChange}
                                    label="Pages Returned"
                                    name="page_number"
                                >
                                    <MenuItem value={1}>Max 30</MenuItem>
                                    <MenuItem value={2}>Max 60</MenuItem>
                                    <MenuItem value={3}>Max 90</MenuItem>
                                    <MenuItem value={4}>Max 120</MenuItem>
                                    <MenuItem value={5}>Max 150</MenuItem>
                                </Select>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <FileCopyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search By Criteria" />
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