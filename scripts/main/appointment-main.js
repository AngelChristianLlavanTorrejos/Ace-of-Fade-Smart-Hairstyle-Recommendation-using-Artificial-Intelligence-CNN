import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"
import { AppointmentModel } from "../models/appointment-model.js";
import { AppointmentView } from "../views/appointment-view.js";
import { AppointmentContr } from "../controllers/appointment-contr.js";

await loadNavLayout();
await loadHeaderLayout();

const contr = new AppointmentContr(new AppointmentModel(), new AppointmentView());

await contr.init();