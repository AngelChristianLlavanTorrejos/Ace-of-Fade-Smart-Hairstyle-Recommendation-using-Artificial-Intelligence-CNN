import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js";
import { BarberManagementModel } from "../models/barber-management-model.js";
import { BarberManagementView } from "../views/barber-management-view.js";
import { BarberManagementContr } from "../controllers/barber-management-contr.js";

await loadNavLayout();
await loadHeaderLayout();

const controller = new BarberManagementContr(new BarberManagementModel(), new BarberManagementView());

controller.init();