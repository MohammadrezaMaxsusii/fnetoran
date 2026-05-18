import { z } from "zod";
import type { locationFormSchema } from "../schemas";

export type Location = z.infer<typeof locationFormSchema>;

export type LocationTree = Location & {
  children: LocationTree[];
};
