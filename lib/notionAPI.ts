import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

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
    const posts = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        page_size: 100,
    });
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

// export const getPostsForTopPage = async (pageNum,pageSize?) => {
//     pageSize = pageSize || 4;
//     const currentPageNum = pageNum + pageSize;
//     const allPosts = await getAllPosts();
//     const slicedPost = allPosts.slice(currentPageNum, currentPageNum + pageSize);
//     return slicedPost;
// };