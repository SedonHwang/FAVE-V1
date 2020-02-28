import routes from "../routes";

export const getStore = (req, res) => res.render("store");
export const getStoreKr = (req, res) => res.render("store_kr");
export const getStoreJp = (req, res) => res.render("store_jp");

export const getFave350 = (req, res) => res.send("Fave 350");
export const getFave350Kr = (req, res) => res.send("Fave 350 Kr");
export const getFave350Jp = (req, res) => res.send("Fave 350 Jp");
export const getFave450 = (req, res) => res.send("Fave 450");
export const getFave450Kr = (req, res) => res.send("Fave 450 Kr");
export const getFave450jp = (req, res) => res.send("Fave 450 Jp");
