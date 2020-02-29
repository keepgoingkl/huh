const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        token: { type: GraphQLString },
        loggedIn: { type: GraphQLBoolean }
    })
});

module.exports = UserType;