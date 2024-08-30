import FaqSection from "@/Components/Blog/FaqSection/FaqSection";
import Header from "@/Components/Blog/Header/Header";
import LatestPost from "@/Components/Blog/LatestPost/LatestPost";
import PostList from "@/Components/Blog/PostList/PostList";
import Slider from "@/Components/Blog/Slider/Slider";
import SubscribeSection from "@/Components/Blog/SubscribeSection/SubscribeSection";
import WhoIsOutspokn from "@/Components/Blog/WhoIsOutspokn/WhoIsOutspokn";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { getSortedPostsData } from "@/lib/blogPost/post";
import { sortByDate } from "@/utilis";
import React from "react";

const index = ({ allPostsData }) => {

  return (
    <div>
      <Navbar />
      <Header />
      <Slider posts={allPostsData} />
      <LatestPost />
      <PostList />
      <WhoIsOutspokn />
      <FaqSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default index;
export async function getStaticProps(_context) {
  const allPostsData = getSortedPostsData();
  const sortedPosts = allPostsData.sort(sortByDate);

  return {
    props: {
      allPostsData: sortedPosts,
    },
  };
}
