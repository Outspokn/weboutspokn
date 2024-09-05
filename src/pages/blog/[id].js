import { useRouter } from "next/router";
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "@/lib/blogPost/post";
import MainContent from "@/Components/BlogPage/MainContent/MainContent";
import Navbar from "@/Components/Navbar/Navbar";
import Header from "@/Components/BlogPage/Header/Header";
import { useEffect, useState } from "react";

const BlogPage = ({ postData, posts }) => {
  const router = useRouter();
  const { tag } = router.query;
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (tag) {
      const relatedPosts = posts
        .filter((post) => post.tag === tag)
        .slice(0, 10); // Get the first 10 related posts

      setRelatedPosts(relatedPosts);
    }
  }, [tag, posts]);
  let singleCategoryPost = posts.map((post) => {
    return post.tag;
  });
  let categoryPostTag = Array.from(new Set(singleCategoryPost));
  let permalink = `https://blog.skillslash.com/${postData.id}`;
  return (
    <div>
      <Navbar />
      <Header tags={categoryPostTag} />
      <MainContent post={postData} relatedPosts={relatedPosts} />
    </div>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getSortedPostsData();

  const postData = getPostData(params.id);

  return {
    props: {
      postData,
      posts,
    },
  };
}

export default BlogPage;
