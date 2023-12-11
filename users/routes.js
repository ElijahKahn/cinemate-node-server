import * as dao from "./dao.js";
function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  app.post("/api/users", createUser);

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;

    res.json(status);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (!currentUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  
  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };

  const account = async (req, res) => {
    res.json(req.session["currentUser"]);
  };

//   app.post('/api/profile/watchlist/add', async (req, res) => {
//     const { userId, mediaItem } = req.body; 

//     try {
//         await User.updateOne(
//             { _id: userId },
//             { $push: { watchlist: mediaItem } }
//         );
//         res.status(200).send('Added to watchlist');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });


// app.post('/api/profile/watchlist/remove', async (req, res) => {
//   const { userId, mediaId } = req.body;

//   try {
      
//       await User.updateOne(
//           { _id: userId },
//           { $pull: { watchlist: { media_id: mediaId } } }
//       );
//       res.status(200).send('Removed from watchlist');
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//   }
// });


// app.get('/api/profile/watchlist/:userId', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//       const user = await User.findById(userId);
//       res.status(200).json(user.watchlist);
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//   }
// });


  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;
