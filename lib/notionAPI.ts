import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md'
import { NotionAPI } from 'notion-client';
import { isDev } from './config';

export interface Tag {
    id: string;
    name: string;
    color: string;
}

export interface Post {
    id: string;
    title: string;
    date: string;
    tags: Tag[];
    description?: string;
    slug: string;
}
interface GetAllPosts {
    (): Promise<Post[]>;
}

interface GetPageMetaData {
    (post: any): Post;
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const n2md = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts: GetAllPosts = async () => {
    let posts;
    if (isDev) {
        posts = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            page_size: 100,
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });
    } else {
        posts = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            page_size: 100,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });
    }
    const allPosts = posts.results;
    return allPosts.map((post) => {
        return getPageMetaData(post);
    });
};

const getPageMetaData: GetPageMetaData = (post) => {
    return {
        id: post.id,
        title: post.properties.Name.title[0].text.content,
        date: post.properties.Date.date.start,
        tags: post.properties.Tags.multi_select.map((tag) => tag),
        description: post.properties.Description.rich_text[0].text.content,
        slug: post.properties.Slug.rich_text[0].text.content,
    };
}

export const getSinglePost = async (slug) => {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: 'Slug',
            formula: {
                string: {
                    equals: slug,
                }
            },
        },
    });
    const page = response.results[0];
    const md = await n2md.pageToMarkdown(page.id);
    const mdString = n2md.toMarkdownString(md);
    const metadata = getPageMetaData(page);
    return {
        metadata,
        mdString,
    };
};

export const getSearchedPosts = async (pageID) => {
    const page = await notion.pages.retrieve({ page_id: pageID });
    const md = await n2md.pageToMarkdown(page.id);
    const mdString = n2md.toMarkdownString(md);
    const metadata = getPageMetaData(page);
    return {
        metadata,
        mdString,
    };
};


export const getAllTags = async () => {
    const posts = await getAllPosts();
    const allTags = posts.map((post) => post.tags);
    const mergedTags = [].concat.apply([], allTags);
    const uniqueTags = mergedTags.filter((tag, index, self) => {
        return index === self.findIndex((t) => (
            t.name === tag.name
        ));
    });
    return uniqueTags;
}

export const getPageDetails = async (id: string) => {
    const notion = new NotionAPI();
    return await notion.getPage(id);
}