import { adminSessionData } from "../../session/admin.js";
import { loadNavLayout } from "../layouts/navigation-layout.js";
import { loadHeaderLayout } from "../layouts/header-layout.js";

import {accountManagementModel} from "../models/account-management-model.js";
import {accountManagementView} from "../views/account-management-view.js";
import {accountManagementContr} from "../controllers/account-management-contr.js";

import { removeSession } from "../general/general-admin/logout.js";
import { checkSession } from "../general/general-admin/login.js";

await checkSession(adminSessionData);

await loadNavLayout();
await loadHeaderLayout(adminSessionData);

await accountManagementContr.init(accountManagementModel, accountManagementView, adminSessionData.userId);

await removeSession('admin-session');