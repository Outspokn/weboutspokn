import { useRouter } from "next/router";
import { getAllPostIds, getPostData, getSortedPostsData } from "@/lib/blogPost/post";
import MainContent from "@/Components/BlogPage/MainContent/MainContent";
import Navbar from "@/Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Footer from "@/Components/Footer/Footer";
import FaqSection from "@/Components/Blog/FaqSection/FaqSection";

const BlogPage = ({ postData, posts }) => {
  const router = useRouter();
  // const { tag } = router.query;
  const [mainPost, setMainPost] = useState(postData);
  // const [relatedPosts, setRelatedPosts] = useState([]);

  // useEffect(() => {
  //   if (tag) {
  //     const relatedPosts = posts
  //       .filter((post) => post.tag === tag && post.id !== mainPost.id)
  //       .slice(0, 6);
  //     setRelatedPosts(relatedPosts);
  //   }
  // }, [tag, posts, mainPost.id]);

  // const handleRelatedPostClick = (clickedPost, index) => {
  //   const updatedRelatedPosts = [...relatedPosts];

  //   updatedRelatedPosts[index] = mainPost;

  //   if (updatedRelatedPosts.length > 6) {
  //     updatedRelatedPosts.pop();
  //   }

  //   setRelatedPosts(updatedRelatedPosts);
  //   setMainPost(clickedPost);

  //   router.push({
  //     pathname: `/blog/${clickedPost.id}`,
  //     query: { tag: clickedPost.tag },
  //   });
  // };

  // let singleCategoryPost = posts.map((post) => post.tag);
  // let categoryPostTag = Array.from(new Set(singleCategoryPost));

  return (
    <div>
      <Navbar />
      {/* <Header
        tags={categoryPostTag}
        allPostData={posts}
        setMainPost={setMainPost}
        setRelatedPosts={setRelatedPosts}
      /> */}
      <MainContent
        key={mainPost.id}
        post={mainPost}
        // relatedPosts={relatedPosts}
        // onRelatedPostClick={handleRelatedPostClick}
      />
      <FaqSection />
      <Footer />
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
