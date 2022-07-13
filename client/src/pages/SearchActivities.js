import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Button,
} from 'react-bootstrap';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useMutation } from '@apollo/client';
import { SAVE_ACTIVITY } from '../utils/mutations';
import { saveActivityIds, getSavedActivityIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchActivities = () => {
  // create state for holding returned google api data
  const [searchedActivities, setSearchedActivities] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved activityId values
  const [savedActivityIds, setSavedActivityIds] = useState(getSavedActivityIds());

  const [saveActivity, { error }] = useMutation(SAVE_ACTIVITY);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveActivityIds(savedActivityIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const activityData = items.map((activity) => ({
        actvityId: activity.id,
        park: activity.activityInfo.park || ['No park info to display'],
        title: activity.activityInfo.title,
        description: activity.activityInfo.description,
        image: activity.activityInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedActivities(activityData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveActivity = async (activityId) => {
    // find the book in `searchedBooks` state by the matching id
    const activityToSave = searchedActivities.find((activity) => activity.activityId === activityId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveActivity({
        variables: { activityData: { ...activityToSave } },
      });
      console.log(savedActivityIds);
      setSavedActivityIds([...savedActivityIds, activityToSave.activityId]);
    } catch (err) {
      console.error(err);
    }
  };

  /*const ActivitiesCard = (props) => {
    const { title, description, startTime, endTime } = props.activity; */
  return (
    <>
      <Jumbotron fluid className="text-light bg-success">
        <Container>
          <Typography variant="h3">
            Search for Activities!
          </Typography>

        </Container>
      </Jumbotron>

      <Container>
        <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div">
          {searchedActivities.length
            ? `Viewing ${searchedActivities.length} results:`
            : 'Search for a park to begin'}
        </Typography>
          {searchedActivities.map((activity) => {
            return (
              <Grid item xs={4} sm={4} md={4}>
                <Card key={activity.activityId} sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {activity.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.startTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.endTime}
                    </Typography>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedActivityIds?.some(
                          (savedId) => savedId === activity.activityId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveActivity(activity.activityId)}
                      >
                        {savedActivityIds?.some((savedId) => savedId === activity.activityId)
                          ? 'Activity Already Saved!'
                          : 'Save This Activity!'}
                      </Button>
                      )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Container>
    </>
  );
};

export default SearchActivities;
