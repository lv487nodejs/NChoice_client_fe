import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Posts } from './components/Posts';
import PaginationJs from './components/Pagination';
import PagesButtonGroup from './components/postsPerPageButtons';



function Render() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);


  useEffect(() => {
    const fechPosts = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
    }
    fechPosts()
  }, []);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change view
  const paginateMethod = (event, value) => setCurrentPage(value);
  const changeItemsMethod = (number) => setPostsPerPage(number);
  const changePagination = () => setCurrentPage(1)

  return (
    <>
      <Posts posts={currentPosts} />
      <PaginationJs postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginateMethod} />
      <PagesButtonGroup changeItems={changeItemsMethod} changeCurrentPage={changePagination} />
    </>
  );
}

export default Render;
