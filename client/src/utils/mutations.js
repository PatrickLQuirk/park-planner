import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_ACTIVITY = gql`
  mutation saveActivity($activityData: ActivityInput!) {
    saveActivity(activityData: $activityData) {
      _id
      username
      email
      activities {
        _id
        title
        description
        startTime
        endTime
        park {
          name
          _id
        }
      }
    }
  }
`;

export const REMOVE_ACTIVITY = gql`
  mutation removeActivity($activityId: ID!) {
    removeActivity(activityId: $activityId) {
      _id
      username
      email
      activities {
        _id
        startTime
        title
        description
        park {
          name
          _id
        }
      }
    }
  }
`;
