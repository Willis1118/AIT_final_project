import path from 'path';
import nextSession from "next-session";

import { expressSession, promisifyStore } from "next-session/lib/compat";
let SQLiteStore = require("connect-sqlite3")(expressSession);

const __path = path.join(process.cwd(), 'tmp');

export const getSession = nextSession({
  name: "WIB_SESSION",
  store: promisifyStore(
    new SQLiteStore({ dir: __path, table: "wiberSessions" })
  ),
  cookie: {
    secure: true,
  },
  autoCommit: false
});