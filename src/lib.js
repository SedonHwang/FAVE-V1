import { text } from "express";

export const throwFlashMsg = (req, res, Msg, redirect) => {
  res.status(400);
  req.flash("errorMessage", Msg);
  res.redirect(redirect);
};

export const makePassword = () => {
  let password = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 8; i++) {
    password += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return password;
};
