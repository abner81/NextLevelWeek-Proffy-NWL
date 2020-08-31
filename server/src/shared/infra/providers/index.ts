import { container } from "tsyringe";

import IEmailService from "./email/models/IEmailService";
import EmailService from "./email/implementations/EmailService";

container.registerSingleton<IEmailService>("emailProvider", EmailService);
