import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

import { Resource } from "sst";

export const database = () => {
  return drizzle(Resource.d1, { schema });
};
