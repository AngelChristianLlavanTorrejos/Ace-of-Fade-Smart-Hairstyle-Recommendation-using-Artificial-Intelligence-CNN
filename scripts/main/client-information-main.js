import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"
import { AdminDashboardModel } from "../models/client-information-model.js";
import { AdminDashboardView } from "../views/client-information-view.js";
import { AdminDashboardContr } from "../controllers/client-information-contr.js";

await loadNavLayout();
await loadHeaderLayout();

const contr = new AdminDashboardContr(new AdminDashboardModel(), new AdminDashboardView());
await contr.init();