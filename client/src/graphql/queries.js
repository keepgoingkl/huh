import gql from "graphql-tag";

export default {
    IS_LOGGED_IN: gql`
      query isUserLoggedIn {
          isLoggedIn @client
      }
    `
};
 
