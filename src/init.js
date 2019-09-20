import "./db";
import app from "./app";

import "./models/users";
import "./models/games";
import "./models/notices";

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
