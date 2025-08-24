import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"

import { ClientDetailsModel } from "../models/client-details-model.js";
import { ClientDetailsView } from "../views/client-details-view.js";
import { ClientDetailsContr } from "../controllers/client-details-contr.js";

import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

const getQueryParam = (key) => {
  return new URLSearchParams(window.location.search).get(key);
}

document.addEventListener('DOMContentLoaded', async () => {
  await checkSession(adminSessionData);

  await loadNavLayout();
  await loadHeaderLayout(adminSessionData);

  await removeSession('admin-session');

  const userId = getQueryParam('id');

  if (!userId) return;

  const controller = new ClientDetailsContr(new ClientDetailsModel(), new ClientDetailsView(), userId);

  controller.init();
})