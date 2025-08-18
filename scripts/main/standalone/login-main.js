import { LoginModel } from "../../models/standalone/login-model.js";
import { LoginView } from "../../views/standalone/login-view.js";
import { LoginContr } from "../../controllers/standalone/login-contr.js";

const loginContr = new LoginContr(new LoginModel(), new LoginView());

await loginContr.init();