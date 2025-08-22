import { clientSessionData } from "../../../session/client.js";
import { loadNavLayout } from "../../layouts/client-layouts/navigation-layout.js"
import { loadHeaderLayout } from "../../layouts/client-layouts/header-layout.js"
import { RecommendationModel } from "../../models/client-model/recommendation-model.js";
import { RecommendationView } from "../../views/client-view/recommendation-view.js";
import { RecommendationContr } from "../../controllers/client-controllers/recommendation-contr.js";
import { removeSession } from "../../general/logout.js";
import { checkSession } from "../../general/login.js";

await checkSession(clientSessionData);

await loadNavLayout();
await loadHeaderLayout(clientSessionData);

const controller = new RecommendationContr(new RecommendationModel(), new RecommendationView());

await controller.init();

await removeSession('client-session');