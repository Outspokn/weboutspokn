import Header from "@/Components/Blog/Header/Header";
import LatestPost from "@/Components/Blog/LatestPost/LatestPost";
import PostList from "@/Components/Blog/PostList/PostList";
import SubscribeSection from "@/Components/Blog/SubscribeSection/SubscribeSection";
import WhoIsOutspokn from "@/Components/Blog/WhoIsOutspokn/WhoIsOutspokn";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { getSortedPostsData } from "@/lib/blogPost/post";
import { sortByDate } from "@/utilis";
import React, { useState } from "react";

const Index = ({ allPostsData }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleFilter = (filtered) => {
    setFilteredPosts(filtered);
  };

  const initialLatestPosts =
    filteredPosts.length > 0
      ? filteredPosts.slice(0, 5)
      : allPostsData.slice(0, 5);

  const remainingPosts = filteredPosts.length > 5 ? filteredPosts.slice(5) : [];

  return (
    <div>
      <Navbar />
      <Header posts={allPostsData} onFilter={handleFilter} />
      {/* <Slider posts={allPostsData.slice(0, 3)} />  */}
      <LatestPost
        posts={
          filteredPosts.length > 0 && filteredPosts.length <= 5
            ? filteredPosts
            : initialLatestPosts
        }
      />
      {remainingPosts.length > 0 && <PostList posts={remainingPosts} />}

      <WhoIsOutspokn lottieUrl="https://outspokn-fr.s3.us-east-2.amazonaws.com/chat/age-screen-cat.json" />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default Index;

export async function getStaticProps(_context) {
  const allPostsData = getSortedPostsData();
  const sortedPosts = allPostsData.sort(sortByDate);

  return {
    props: {
      allPostsData: sortedPosts,
    },
  };
}
