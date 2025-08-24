import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"

import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

await checkSession(adminSessionData);

await loadNavLayout();
await loadHeaderLayout(adminSessionData);

await removeSession('admin-session');