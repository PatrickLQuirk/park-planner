import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      activities {
        _id
        startTime
        endTime
        title
        description
        park {
          _id
          name
        }
      }
    }
  }
`;

// this query does not return the actual activity data, just the ids.
export const QUERY_ALL_PARKS = gql`
  query AllParks {
    allParks {
      _id
      name
      description
      img
      activities
    }
  }
`;

export const QUERY_SINGLE_PARK = gql`
  query singlePark ($parkId: ID!) {
    singlePark(parkId: $parkId) {
      _id
      name
      description
      img
      activities {
        _id
        startTime
        endTime
        title
        description
        park
      }
    }
  }
`;
