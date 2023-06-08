// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { Post, Tag } from "../lib/notionAPI";
import { ExtendedRecordMap } from "../lib/types";

export interface MapDetail {
  allPosts: Post[];
  allTags?: Tag[];
  recordMap: ExtendedRecordMap;
}