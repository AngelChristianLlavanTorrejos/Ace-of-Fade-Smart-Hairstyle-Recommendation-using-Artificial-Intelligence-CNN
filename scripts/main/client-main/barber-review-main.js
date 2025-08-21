import { clientSessionData } from "../../../session/client.js";
import { loadNavLayout } from "../../layouts/client-layouts/navigation-layout.js"
import { loadHeaderLayout } from "../../layouts/client-layouts/header-layout.js"
import { BarberReviewModel } from "../../models/client-model/barber-review-model.js";
import { BarberReviewView } from "../../views/client-view/barber-review-view.js";
import { BarberReviewContr } from "../../controllers/client-controllers/barber-review-contr.js";

await loadNavLayout();
await loadHeaderLayout(clientSessionData);

const contr = new BarberReviewContr(new BarberReviewModel(), new BarberReviewView(), clientSessionData.userId);

await contr.init();