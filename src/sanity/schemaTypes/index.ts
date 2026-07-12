import type { SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { project } from "./project";
import { skillGroup } from "./skillGroup";
import { experience } from "./experience";
import { education } from "./education";
import { certification } from "./certification";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  project,
  skillGroup,
  experience,
  education,
  certification,
];
