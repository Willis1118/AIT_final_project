import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
let SQLiteStore = require("connect-sqlite3")(expressSession);

export const getSession = nextSession({
  name: "WIB_SESSION",
  store: promisifyStore(
    new SQLiteStore({ dir: "./tmp/", table: "wiberSessions" })
  ),
  cookie: {
    secure: true,
  },
  autoCommit: false
});