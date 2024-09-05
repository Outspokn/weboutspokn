import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    // console.log(matterResult, "checking content");

    return {
      id,
      ...matterResult.data,
      body: matterResult.content,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  const html = marked(content);

  // Combine the data with the id
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
  };
}

export function getAllPostIds() {
  const allPosts = getSortedPostsData();
  return allPosts.map((post) => ({
    params: { id: post.id.toString() }, // Ensure 'id' is a string and nested under 'params'
  }));
}
