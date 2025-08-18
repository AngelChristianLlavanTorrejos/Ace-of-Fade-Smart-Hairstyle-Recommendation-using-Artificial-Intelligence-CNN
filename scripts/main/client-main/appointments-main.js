import { clientSessionData } from "../../../session/client.js";
import { loadNavLayout } from "../../layouts/client-layouts/navigation-layout.js"
import { loadHeaderLayout } from "../../layouts/client-layouts/header-layout.js"
import { AppointmentsModel } from "../../models/client-model/appointments-model.js";
import { AppointmentsView } from "../../views/client-view/appointments-view.js";
import { AppointmentsContr } from "../../controllers/client-controllers/appointments-contr.js"; 

await loadNavLayout();
await loadHeaderLayout(clientSessionData);
const controller = new AppointmentsContr(new AppointmentsModel(), new AppointmentsView(), clientSessionData.userId);
controller.init();