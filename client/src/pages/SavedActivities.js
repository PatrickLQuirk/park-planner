import React from 'react';
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
import { QUERY_ME } from '../utils/queries';
import { REMOVE_ACTIVITY } from '../utils/mutations';
import { removeActivityId } from '../utils/localStorage';
import { format, toDate } from 'date-fns';

import Auth from '../utils/auth';

const SavedActivities = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeActivity, { error }] = useMutation(REMOVE_ACTIVITY);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteActivity = async (activityId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeActivity({
        variables: { activityId },
      });

      // upon success, remove book's id from localStorage
      removeActivityId(activityId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-success">
        <Container>
          <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div">
            Viewing {userData.username}'s activities!
          </Typography>
        </Container>
      </Jumbotron>
      <Container>
        <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div">
          {userData.activities?.length
            ? `Viewing ${userData.activities.length} saved ${userData.activities.length === 1 ? 'activity' : 'activities'
            }:`
            : 'You have no saved activities!'}
        </Typography>
        {userData.activities.map((activity) => {
          const startTime = toDate(activity.startTime);
          const startTimeString = format(startTime, 'PPPPpppp');
          const endTime = toDate(activity.endTime);
          const endTimeString = format(endTime, 'PPPPpppp');
          return(
        <Grid  key={activity._id} item xs={4} sm={4} md={4}>
          <Card sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {activity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Starts at {startTimeString}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ends at {endTimeString}
              </Typography>
              {Auth.loggedIn() && (
                <Button
                  className="btn-block btn-danger"
                  onClick={() => handleDeleteActivity(activity._id)}
                >
                  Delete this Activity!
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

export default SavedActivities;
