import { useRouter } from "next/router";
import { getSortedPostsData } from "@/lib/blogPost/post";
import MainContent from "@/Components/BlogPage/MainContent/MainContent";
import Navbar from "@/Components/Navbar/Navbar";
import Header from "@/Components/BlogPage/Header/Header";
import { useEffect, useState } from "react";

const BlogPage = ({ initialPost, initialRelatedPosts, allPostData }) => {
  const router = useRouter();
  const { id } = router.query;

  const [mainPost, setMainPost] = useState(initialPost);
  const [relatedPosts, setRelatedPosts] = useState(initialRelatedPosts);

  useEffect(() => {
    if (id) {
      const selectedPost = allPostData.find((p) => p.id === id);
      setMainPost(selectedPost);

      if (selectedPost) {
        const newRelatedPosts = allPostData
          .filter((p) => p.tag === selectedPost.tag && p.id !== selectedPost.id)
          .slice(0, 3);
        setRelatedPosts(newRelatedPosts);
      }
    }
  }, [id, allPostData]);

  if (!mainPost) return <div>Loading...</div>;

  const tags = [...new Set(allPostData.map((post) => post.tag))];

  return (
    <div>
      <Navbar />
      <Header
        tags={tags}
        allPostData={allPostData} 
        setMainPost={setMainPost} 
        setRelatedPosts={setRelatedPosts} 
      />
      <MainContent post={mainPost} relatedPosts={relatedPosts} />
    </div>
  );
};

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData();
  const post = allPostsData.find((post) => post.id === params.id);

  const relatedPosts = allPostsData
    .filter((p) => p.tag === post.tag && p.id !== post.id)
    .slice(0, 3);

  return {
    props: {
      initialPost: post,
      initialRelatedPosts: relatedPosts,
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
    fallback: true,
  };
}

export default BlogPage;
