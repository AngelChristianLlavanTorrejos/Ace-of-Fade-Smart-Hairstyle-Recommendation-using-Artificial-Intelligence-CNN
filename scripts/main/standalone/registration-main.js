import { RegistrationModel } from '../../models/standalone/registration-model.js';
import { RegistrationView } from '../../views/standalone/registration-view.js';
import { RegistrationContr } from '../../controllers/standalone/registration-contr.js';

const registrationContr = new RegistrationContr(new RegistrationModel(), new RegistrationView());

await registrationContr.init();