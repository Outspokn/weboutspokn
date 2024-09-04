import { useRouter } from "next/router";
import { getSortedPostsData } from "@/lib/blogPost/post";
import MainContent from "@/Components/BlogPage/MainContent/MainContent";
import Navbar from "@/Components/Navbar/Navbar";
import Header from "@/Components/BlogPage/Header/Header";
import { useEffect, useState } from "react";

const BlogPage = ({ post, relatedPosts, allPostData }) => {
  const router = useRouter();
  const { tag } = router.query;

  const [mainPost, setMainPost] = useState(post);
  const [filteredPosts, setFilteredPosts] = useState(relatedPosts);

  useEffect(() => {
    if (tag) {
      const postByTag = allPostData.find((p) => p.tag === tag);
      if (postByTag) {
        setMainPost(postByTag);
      }

      const relatedPostsByTag = allPostData
        .filter((p) => p.tag === tag && p.id !== postByTag?.id)
        .slice(0, 3);
      setFilteredPosts(relatedPostsByTag);
    } else {
      const relatedPostsByCategory = allPostData
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3);
      setFilteredPosts(relatedPostsByCategory);
    }
  }, [tag, post, allPostData]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const tags = [...new Set(allPostData.map((post) => post.tag))];

  return (
    <div>
      <Navbar />
      <Header tags={tags} />
      <MainContent post={mainPost} relatedPosts={filteredPosts} />
    </div>
  );
};

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData();
  const post = allPostsData.find((post) => post.id === params.id);
  const relatedPosts = allPostsData
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return {
    props: {
      post,
      relatedPosts,
      allPostData: allPostsData,
    },
  };
}

export async function getStaticPaths() {
  const allPostsData = getSortedPostsData();

  const paths = allPostsData.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default BlogPage;
