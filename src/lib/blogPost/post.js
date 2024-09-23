import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    marked.use(gfmHeadingId());
    const html = marked(matterResult.content);

    // Extract headings dynamically for ToC
    // const headings = extractHeadings(matterResult.content);

    return {
      id,
      ...matterResult.data,
      body: html,
      // table: headings,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  marked.use(gfmHeadingId());
  const html = marked(content);

  return {
    id,
    title: data.title,
    mainH1: data.h1,
    desc: data.desc,
    author: data.author,
    time: data.readTime,
    date: data.date,
    tag: data.tag,
    img: data.headerImg,
    position: data.position,
    table: data.tableData,
    avatar: data.avatar,
    body: html,
    FAQ: data.FAQ || [],
    // table: headings,
  };
}

export function getAllPostIds() {
  const allPosts = getSortedPostsData();
  return allPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));
}
