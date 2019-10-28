export const throwFlashMsg = (req, res, Msg, redirect) => {
  res.status(400);
  req.flash("errorMessage", Msg);
  res.redirect(redirect);
};
