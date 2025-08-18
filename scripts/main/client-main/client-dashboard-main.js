import { clientSessionData } from "../../../session/client.js";
import { loadNavLayout } from "../../layouts/client-layouts/navigation-layout.js"
import { loadHeaderLayout } from "../../layouts/client-layouts/header-layout.js"
import { clientDashboardModel } from "../../models/client-model/client-dashboard-model.js";
import { clientDashboardView } from "../../views/client-view/client-dashboard-view.js";
import { clientDashboardContr } from "../../controllers/client-controllers/client-dashboard-contr.js";

await loadNavLayout();
await loadHeaderLayout(clientSessionData);

await clientDashboardContr.init(clientDashboardModel, clientDashboardView, clientSessionData.userId);