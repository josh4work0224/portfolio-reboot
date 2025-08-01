import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "3dvdoh8t",
  dataset: "production",
  apiVersion: "2023-07-25",
  useCdn: true,
});
