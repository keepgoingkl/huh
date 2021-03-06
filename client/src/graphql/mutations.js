import gql from "graphql-tag";

export default {
    REGISTER_USER: gql`
        mutation RegisterUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
            register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
                token
                loggedIn
            }
        }
    `,
    LOGIN_USER: gql`
        mutation LoginUser($email: String!, $password: String!) {
            login(email: $email, password: $password) {
            token
            loggedIn
            }
        }
    `,
    VERIFY_USER: gql`
        mutation VerifyUser($token: String!) {
            verifyUser(token: $token) {
            loggedIn
            }
        }
    `
}