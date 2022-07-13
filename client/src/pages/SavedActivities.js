import React from 'react';
import {
  Jumbotron,
  Container,
  Card,
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
          {userData.savedActivities?.length
            ? `Viewing ${userData.savedActivities.length} saved ${
                userData.savedActivities.length === 1 ? 'activity' : 'activities'
              }:`
            : 'You have no saved activities!'}
        </Typography>
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
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteActivity(activity.activityId)}
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
