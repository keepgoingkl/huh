const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");

const UserType = require("./types/user_type");
const User = mongoose.model("user");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.register(args);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.login(args);
            }
        },
        logout: {
            type: UserType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return AuthService.logout(args)
            }
        },
        verifyUser: {
            type: UserType,
            args: { 
                token: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.verifyUser(args);
            }
        }
    }
})

module.exports = mutation;