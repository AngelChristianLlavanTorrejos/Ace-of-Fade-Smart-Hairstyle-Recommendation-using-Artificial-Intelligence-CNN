import { clientSessionData } from "../../../session/client.js";
import { loadNavLayout } from "../../layouts/client-layouts/navigation-layout.js"
import { loadHeaderLayout } from "../../layouts/client-layouts/header-layout.js"



import { removeSession } from "../../general/logout.js";
import { checkSession } from "../../general/login.js";

await checkSession(clientSessionData);

await loadNavLayout();
await loadHeaderLayout(clientSessionData);

await removeSession('client-session');