// src/types/express.d.ts (o en la raíz del proyecto si no tienes la carpeta @types)

import { User } from "@prisma/client";
import { Request } from "src/types/express";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Aquí añades la propiedad 'user', que puede ser del tipo que necesites
    }
  }
}
