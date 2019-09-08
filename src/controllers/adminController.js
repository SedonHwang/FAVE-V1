//Global Router Controller
export const login = (req, res) => res.render("admin_login");
export const postLogin = (req, res) => {
  const { id, pw } = req.body;
  console.log(`id is ${id} and pw is ${pw}`);
};
export const logout = (req, res) => res.send("logout");
export const adminNotice = (req, res) => res.send("admin notice");
export const adminGame = (req, res) => res.send("admin game");
