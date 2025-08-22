import { clientSessionData } from "../../../session/client.js";
import { loadNavLayout } from "../../layouts/client-layouts/navigation-layout.js"
import { loadHeaderLayout } from "../../layouts/client-layouts/header-layout.js"
import { BarberReviewModel } from "../../models/client-model/barber-review-model.js";
import { BarberReviewView } from "../../views/client-view/barber-review-view.js";
import { BarberReviewContr } from "../../controllers/client-controllers/barber-review-contr.js";

import { removeSession } from "../../general/logout.js";
import { checkSession } from "../../general/login.js";

await checkSession(clientSessionData);

await loadNavLayout();
await loadHeaderLayout(clientSessionData);

const contr = new BarberReviewContr(new BarberReviewModel(), new BarberReviewView(), clientSessionData.userId);

await contr.init();

await removeSession('client-session');