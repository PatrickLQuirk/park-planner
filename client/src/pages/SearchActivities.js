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

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PARK } from '../utils/queries';
import { SAVE_ACTIVITY } from '../utils/mutations';
import { saveActivityIds, getSavedActivityIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchActivities = () => {
  // create state for holding returned api data
  // const [searchedActivities, setSearchedActivities] = useState([]);

  // create state to hold saved activityId values
  const [savedActivityIds, setSavedActivityIds] = useState(getSavedActivityIds());

  const [saveActivity, { error }] = useMutation(SAVE_ACTIVITY);

  // set up useEffect hook to save `savedActivityIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveActivityIds(savedActivityIds);
  });

  // this query is hardcoded currently. This will need to change before deployment
  const { loading, data } = useQuery(QUERY_SINGLE_PARK, { variables: { parkId: "62cf4431e4b3c35326b12868" } })

  const activitiesData = data?.singlePark.activities || [];

  // create function to handle saving an activity to our database
  const handleSaveActivity = async (activityId) => {
    // // find the activity in `searchedActivities` state by the matching id
    // const activityToSave = searchedActivities.find((activity) => activity._id === activityId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveActivity({
        variables: { activityId },
      });
      console.log(savedActivityIds);
      setSavedActivityIds([...savedActivityIds, activityId]);
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
          {activitiesData.length
            ? `Viewing ${activitiesData.length} results:`
            : 'Search for a park to begin'}
        </Typography>
          {activitiesData.map((activity) => {
            return (
              <Grid item key={activity._id} xs={4} sm={4} md={4}>
                <Card sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
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
                          (savedId) => savedId === activity._id
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveActivity(activity._id)}
                      >
                        {savedActivityIds?.some((savedId) => savedId === activity._id)
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
