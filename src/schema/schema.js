const graphql = require('graphql');
const { type } = require('os');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const PlayerModel = require('../models/players');

// Définition du joueur
const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    class: { type: GraphQLString },
    level: { type: GraphQLInt },
    specialization: { type: GraphQLString },
    renowmLevel: { type: GraphQLInt },
  }),
});

// Définition des Query GraphQL
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Les champs qu'on peut get côté front
    // Nous allons définir le champ " Player " avec une ID
    player: {
      type: PlayerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code pour chopper les données en DB
      }, //fonction resolver,
    }, // fin de la query player,
    players: {
      type: new graphql.GraphQLList(PlayerType),
      resolve(parent, args) {
        return PlayerModel.find({});
      },
    },
  }, // fin des champs,
});

// Définition des Mutation GraphQL

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPlayer: {
      type: PlayerType,
      args: {
        name: { type: GraphQLString },
        class: { type: GraphQLString },
        level: { type: GraphQLInt },
        specialization: { type: GraphQLString },
        renowmLevel: { type: GraphQLInt },
      },
    },
  },
});

//exporting 'GraphQLSchema with RootQuery' for GraphqlHTTP middleware.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
