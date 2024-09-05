import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
  const allPosts = getSortedPostsData();
  return allPosts.find((post) => post.id === id);
}

export function getAllPostIds() {
  const allPosts = getSortedPostsData();
  return allPosts.map((post) => ({
    params: { id: post.id.toString() }, // Ensure 'id' is a string and nested under 'params'
  }));
}
