import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"

import { DashboarModel } from "../models/dashboard-model.js";
import { DashboardView } from "../views/dashboard-view.js";
import { DashboardContr } from "../controllers/dashboard-contr.js";

import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

await checkSession(adminSessionData);

await loadNavLayout();
await loadHeaderLayout(adminSessionData);

const contr = new DashboardContr(new DashboarModel(), new DashboardView());
await contr.init();

await removeSession('admin-session');