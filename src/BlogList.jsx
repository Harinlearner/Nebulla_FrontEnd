import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogList.css';
import { Navigate, useNavigate } from 'react-router-dom';

function BlogList() {
  let localUserData = JSON.parse(localStorage.getItem('userData'));
  let localUserName = localUserData.Username;
  let cto = "";
  const [blogs, setBlogs] = useState([]);
  const [postButton, setPostButton] = useState("");
  const [username, setUser] = useState(localUserName);
  const [image, setImage] = useState("");
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ author: '', content: '', image: '' });
  const [navigateButton, setNavigateButton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!showAddPostForm) {
      setPostButton("Add a post");
    }
    else {
      setPostButton("Exit post");
    }
    axios.get('https://nebulla-backend.onrender.com/blogs')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, [showAddPostForm]);

  const handleLike = (id) => {
    axios.post(`https://nebulla-backend.onrender.com/blogs/${id}/like`)
      .then(response => {
        setBlogs(prevBlogs =>
          prevBlogs.map(blog => blog._id === id ? { ...blog, likes: response.data.likes } : blog)
        );
      })
      .catch(error => console.error('Error liking the post:', error));
  };

  const handleComment = (id, comment) => {
    axios.post(`https://nebulla-backend.onrender.com/blogs/${id}/comment`, comment)
      .then(response => {
        setBlogs(prevBlogs =>
          prevBlogs.map(blog => blog._id === id ? { ...blog, comments: response.data } : blog)
        );
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  const toggleComments = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };
  const handleAddPost = (e) => {
    e.preventDefault();
    axios.post('https://nebulla-backend.onrender.com/blogs', { ...newPost, image })
      .then(response => {
        setBlogs([response.data, ...blogs]);
        setNewPost({ author: '', content: '', image: '' });
        setImage("");
        setShowAddPostForm(false);
      })
      .catch(error => console.error('Error adding post:', error));
  };

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
      setNewPost({ ...newPost, image: reader.result });
    };
    reader.onerror = error => {
      console.log("Error ", error);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  function tit(author) {
    if (author == "Harin") {
      cto = "*CTO"
    }
    else if (author == "Jpntheace") {
      cto = "*COO"
    }
    else if (author == "Guhan") {
      cto = "*CMO"
    }
    else {
      cto = "";
    }
  }
  return (
    <div className="page-container">
       <div className="sidebar">
        <center>
          <div className='logomain'></div>
          <h1 className='nebulla'>Nebulla</h1>
        </center>
        <button onClick={scrollToTop}>Home</button>
        <button onClick={() => { setShowAddPostForm(!showAddPostForm); scrollToTop(); }}>{postButton}</button>
        <button>Following</button>
        <button>Followers</button>
        <button onClick={() => navigate("/")}>Log Out</button>
      </div>
      <div className="blog-container">
        <h1 className="blog-title"> Whats Happening!!</h1>
        <div className='usernames'>{username}{ }</div>
        {showAddPostForm && (
          <form onSubmit={handleAddPost} className="add-post-form">
            <h2 style={{ color: "white" }} onClick={tit(username)}>@{newPost.author = username}{" " + cto}</h2>
            {/* <input
              type="text"
              name="author"
              placeholder="Your name"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              required
              className="post-input"
            /> */}
            <textarea
              name="content"
              placeholder="Your blog post"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value, cto })}
              required
              className="post-input"
            />
            <input type="file" accept="image/*" onChange={convertToBase64} />
            <button type="submit" className="post-button">Submit Post</button>
          </form>
        )}
        {blogs.length === 0 ? (
          <p className="no-blogs">No blogs available.</p>
        ) : (
          blogs.map(blog => (
            <div key={blog._id} className="blog-post">
              <div className="blog-author">
                <img src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"} alt="avatar" className="avatar" />
                <h3>{blog.author}</h3>
                <h5 className="cst" onClick={tit(blog.author)}>{cto}</h5>
              </div>
              <p className="blog-content">{blog.content}</p>
              {blog.image && <img src={blog.image} alt="blog visual" className="postImage" />}
              <div className="blog-footer">
                <span className="blog-date">{new Date(blog.createdAt).toLocaleString()}</span>
                <div className="blog-actions">
                    <i className={`fas fa-heart ${blog.likes > 0 ? 'liked' : ''}`}></i>
                  <button className="like-button" onClick={() => handleLike(blog._id)}>
                    <div className='liky'></div>
                    {blog.likes}
                  </button>
                  <button className="comment-button" onClick={() => toggleComments(blog._id)}>
                    {expandedBlogId === blog._id ? 'Hide Comments' : 'Show Comments'}
                  </button>
                </div>
              </div>
              {expandedBlogId === blog._id && (
                <div className="blog-comments">
                  <h4>Comments</h4>
                  {blog.comments.length === 0 ? (
                    <p>No comments yet.</p>
                  ) : (
                    blog.comments.map((comment, index) => (
                      <p key={index}><strong>{comment.user}</strong>: {comment.text}</p>
                    ))
                  )}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const comment = {
                      user: username,
                      text: form.text.value
                    };
                    handleComment(blog._id, comment);
                    form.reset();
                  }} className="comment-form">
                    {/* <input type="text" name="user" placeholder="Your name" required className="comment-input" /> */}
                    <h4 style={{ color: "white" }} onClick={tit(username)}>@{username}{" " + cto}</h4>
                    <input type="text" name="text" placeholder="Your comment" required className="comment-input" />
                    <button type="submit" className="comment-button">Add Comment</button>
                  </form>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogList;