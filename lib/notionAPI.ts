import {Client} from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});
export const getAllPosts = async () => {
    const posts = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        page_size: 100,
    });
    const allPosts = posts.results;
    return allPosts.map((post) => {
        return getPageMetaData(post);
    });
};

const getPageMetaData = (post) => {
    return {
        id: post.id,
        title: post.properties.Name.title[0].text.content,
        date: post.properties.Date.date.start,
        tags: post.properties.Tags.multi_select.map((tag) => tag.name),
        description: post.properties.Description.rich_text[0].text.content,
        slug: post.properties.Slug.rich_text[0].text.content,
    };
}