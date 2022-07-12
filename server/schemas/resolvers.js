const { AuthenticationError } = require('apollo-server-express');
const { User, Activity } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLTimestamp } = require('graphql-scalars');

const resolvers = {
  Timestamp: GraphQLTimestamp,

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        .populate({
          path: 'activities',
          select: '-__v',
          populate: {
            path: 'park',
            select: 'name _id'
          }
        });

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    allActivities: async (parent, args) => {
      const activitiesData = await Activity.find({})
        .select('-__v')
        .populate({
          path: 'park',
          select: 'name _id'
        });
      return activitiesData;
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    
    saveActivity: async (parent, { activityId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { activities: activityId } },
          { new: true }
        )
          .populate({
            path: 'activities',
            select: '-__v',
            populate: {
              path: 'park',
              select: 'name _id'
            }
          });

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeActivity: async (parent, { activityId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { activities: activityId} },
          { new: true }
        )
        .populate({
          path: 'activities',
          select: '-__v',
          populate: {
            path: 'park',
            select: 'name _id'
          }
        });

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
