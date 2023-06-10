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

export interface SearchResults {
  object: string;
  results: Page[];
  next_cursor: null | string;
  has_more: boolean;
  type: string;
  page_or_database: object;
}

export interface Page {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  cover: Cover;
  icon: Icon;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

export interface User {
  object: string;
  id: string;
}

export interface Cover {
  type: string;
  external: External;
}

export interface External {
  url: string;
}

export interface Icon {
  type: string;
  emoji: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  Description: {
      id: string,
      type: string,
      rich_text: Array<{
          type: string,
          text: {
              content: string,
              link: string | null
          },
          annotations: {
              bold: boolean,
              italic: boolean,
              strikethrough: boolean,
              underline: boolean,
              code: boolean,
              color: string
          },
          plain_text: string,
          href: string | null
      }>
  },
  Published: {
      id: string,
      type: string,
      checkbox: boolean
  },
  Tags: {
      id: string,
      type: string,
      multi_select: Array<{
          id: string,
          name: string,
          color: string
      }>
  },
  Slug: {
      id: string,
      type: string,
      rich_text: Array<{
          type: string,
          text: {
              content: string,
              link: string | null
          },
          annotations: {
              bold: boolean,
              italic: boolean,
              strikethrough: boolean,
              underline: boolean,
              code: boolean,
              color: string
          },
          plain_text: string,
          href: string | null
      }>
  },
  Date: {
      id: string,
      type: string,
      date: {
          start: string,
          end: string | null,
          time_zone: string | null
      }
  },
  img: {
      id: string,
      type: string,
      files: Array<{
          name: string,
          type: string,
          file: {
              url: string,
              expiry_time: string
          }
      }>
  },
  Name: {
      id: string,
      type: string,
      title: Array<{
          type: string,
          text: {
              content: string,
              link: string | null
          },
          annotations: {
              bold: boolean,
              italic: boolean,
              strikethrough: boolean,
              underline: boolean,
              code: boolean,
              color: string
          },
          plain_text: string,
          href: string | null
      }>
  }
}
