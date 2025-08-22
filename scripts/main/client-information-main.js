import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"
import { AdminDashboardModel } from "../models/client-information-model.js";
import { AdminDashboardView } from "../views/client-information-view.js";
import { AdminDashboardContr } from "../controllers/client-information-contr.js";
import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

await checkSession(adminSessionData);

await loadNavLayout();
await loadHeaderLayout(adminSessionData);

const contr = new AdminDashboardContr(new AdminDashboardModel(), new AdminDashboardView());

await contr.init();

await removeSession('admin-session');