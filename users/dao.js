import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const addToWatchlist = async (userId, media) => {
  return await model.updateOne(
    { _id: userId },
    { $push: { watchlist: media } }
  );
};

export const getWatchlist = async (userId) => {
  const user = await model.findById(userId);
  return user.watchlist;
};

export const removeFromWatchlist = async (userId, mediaId) => {
  return await model.updateOne(
    { _id: userId },
    { $pull: { watchlist: { media_id: mediaId } } }
  );
};
