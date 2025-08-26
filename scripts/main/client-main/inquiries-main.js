import { clientSessionData } from "../../../session/client.js";
import { loadNavLayout } from "../../layouts/client-layouts/navigation-layout.js"
import { loadHeaderLayout } from "../../layouts/client-layouts/header-layout.js"

import { InquiriesModel } from "../../models/client-model/inquiries-model.js";
import { InquiriesView } from "../../views/client-view/inquiries-view.js";
import { InquiriesContr } from "../../controllers/client-controllers/inquiries-contr.js";

import { removeSession } from "../../general/logout.js";
import { checkSession } from "../../general/login.js";

await checkSession(clientSessionData);

await loadNavLayout();
await loadHeaderLayout(clientSessionData);

const contr = new InquiriesContr(new InquiriesModel(), new InquiriesView(), clientSessionData);
await contr.init();

await removeSession('client-session');