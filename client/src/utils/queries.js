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
// This query will need to be updated
export const QUERY_ALL_PARKS = gql`
  query AllParks {
    allParks {
      _id
      name
      activities
    }
  }
`;
