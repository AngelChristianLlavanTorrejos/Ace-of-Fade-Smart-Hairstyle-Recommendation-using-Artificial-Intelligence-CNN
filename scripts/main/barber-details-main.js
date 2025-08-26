import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js"
import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

import { BarberDetailsModel } from "../models/barber-details-model.js";
import { BarberDetailsView } from "../views/barber-details-view.js";
import { BarberDetailsContr } from "../controllers/barber-details-contr.js";

const getQueryParam = (key) => {
  return new URLSearchParams(window.location.search).get(key);
}

document.addEventListener('DOMContentLoaded', async () => {
  await checkSession(adminSessionData);

  await loadNavLayout();
  await loadHeaderLayout(adminSessionData);

  await removeSession('admin-session');

  const barberId = getQueryParam('id');

  if (!barberId) return;

  const contr = new BarberDetailsContr(new BarberDetailsModel(), new BarberDetailsView(), barberId);

  await contr.init();
})