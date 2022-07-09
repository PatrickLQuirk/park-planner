import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_ACTIVITY } from '../utils/mutations';
import { removeActivityId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedActivities = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

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
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s activities!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedActivities?.length
            ? `Viewing ${userData.savedActivities.length} saved ${
                userData.savedActivities.length === 1 ? 'activity' : 'activities'
              }:`
            : 'You have no saved activities!'}
        </h2>
        <CardColumns>
          {userData.savedActivities?.map((activity) => {
            return (
              <Card key={activity.activityId} border="dark">
                {activity.image ? (
                  <Card.Img
                    src={activity.image}
                    alt={`The image for ${activity.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{activity.title}</Card.Title>
                  <p className="small">Activity: {activity.park}</p>
                  <Card.Text>{activity.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteActivity(activity.activityId)}
                  >
                    Delete this Activity!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedActivities;
