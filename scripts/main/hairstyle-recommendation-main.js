import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"

import { HairstyleRecommendationModel } from "../models/hairstyle-recommendation-model.js";
import { HairstyleRecommendationView } from "../views/hairstyle-recommendation-view.js";
import { HairstyleRecommendationContr } from "../controllers/hairstlye-recommendation-contr.js"

import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

await checkSession(adminSessionData);

await loadNavLayout();
await loadHeaderLayout(adminSessionData);

const contr = new HairstyleRecommendationContr(new HairstyleRecommendationModel(), new HairstyleRecommendationView());

await contr.init();

await removeSession('admin-session');