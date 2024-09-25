import { useRouter } from "next/router";
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "@/lib/blogPost/post";
import MainContent from "@/Components/BlogPage/MainContent/MainContent";
import Navbar from "@/Components/Navbar/Navbar";
import { useState } from "react";
import Footer from "@/Components/Footer/Footer";
import FaqSection from "@/Components/Blog/FaqSection/FaqSection";

const BlogPage = ({ postData, posts }) => {
  const router = useRouter();
  const [mainPost, setMainPost] = useState(postData);

  return (
    <div>
      <Navbar />
      {/* <Header
        tags={categoryPostTag}
        allPostData={posts}
        setMainPost={setMainPost}
        setRelatedPosts={setRelatedPosts}
      /> */}
      <MainContent key={mainPost.id} post={mainPost} />

      {mainPost.FAQ && mainPost.FAQ.length > 0 && (
        <FaqSection faqData={mainPost.FAQ} />
      )}

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
