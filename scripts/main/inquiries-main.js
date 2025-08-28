import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"
import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

import { InquiriesModel } from "../models/inquiries-model.js";
import { InquiriesView } from "../views/inquiries-view.js";
import { InquiriesContr } from "../controllers/inquiries-contr.js";

const getQueryParam = (idKey, initialKey) => {
  const param = new URLSearchParams(window.location.search);
  const convoDetails = {
    roomId: param.get(idKey),
    clientName: param.get(initialKey),
  }

  return convoDetails;
}

document.addEventListener('DOMContentLoaded', async () => {
  await checkSession(adminSessionData);

  await loadNavLayout();
  await loadHeaderLayout(adminSessionData);

  const convoDetails = getQueryParam('id', 'name');

  const contr = new InquiriesContr(new InquiriesModel(), new InquiriesView(), convoDetails);

  contr.init();

  await removeSession('admin-session');
})