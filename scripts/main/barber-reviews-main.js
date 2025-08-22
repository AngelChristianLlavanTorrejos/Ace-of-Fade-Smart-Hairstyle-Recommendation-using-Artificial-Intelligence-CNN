import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"
import { BarberReviewsModel } from "../models/barber-reviews-model.js";
import { BarberReviewsView } from "../views/barber-reviews-view.js";
import { BarberReviewsContr } from "../controllers/barber-reviews-contr.js";
import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

await checkSession(adminSessionData);

await loadNavLayout();
await loadHeaderLayout(adminSessionData);

const contr = new BarberReviewsContr(new BarberReviewsModel(), new BarberReviewsView());
await contr.init();

await removeSession('admin-session');