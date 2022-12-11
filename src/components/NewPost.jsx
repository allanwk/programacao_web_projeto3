import PuffLoader from "react-spinners/PuffLoader";
import { useState } from "react";
import api from "../services/api";

export default function NewPost({ open, setOpen }) {
  const [post, setPost] = useState({});
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  function handleFieldChange(e) {
    post[e.target.name] = e.target.value;
    setPost(post);
  }

  function handleFileChange(e) {
    setImage(e.target.files[0]);
    document.getElementById("image-preview").src = URL.createObjectURL(
      e.target.files[0]
    );
  }

  async function handleSubmit(e) {
    setMessage(<PuffLoader color="white" />);
    e.preventDefault();
    const { title, description, author, category, url } = post;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("url", url);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const resp = await api.post("/post", formData, config);
      window.location.reload();
    } catch (err) {
      setMessage(err.response.data.error || err.response.data.message);
    }
  }

  if (open) {
    return (
      <div id="modal-container">
        <form className="new-post" onSubmit={handleSubmit}>
          <div className="modal-title">
            <h1 id="new-post-title">New post</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              onClick={() => setOpen(false)}
            >
              <path
                fill="#ffffff"
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
              />
            </svg>
          </div>
          <div className="news-fields">
            <div>
              <label htmlFor="news-title">Title</label>
              <input
                required
                id="news-title"
                name="title"
                onChange={handleFieldChange}
              />
              <label htmlFor="news-description">Description</label>
              <input
                required
                id="news-description"
                name="description"
                onChange={handleFieldChange}
              />
              <label htmlFor="news-author">Author</label>
              <input
                required
                id="news-author"
                name="author"
                onChange={handleFieldChange}
              />
            </div>
            <div>
              <label htmlFor="news-category">Category</label>
              <input
                required
                id="news-category"
                name="category"
                onChange={handleFieldChange}
              />
              <label htmlFor="news-url">Link</label>
              <input
                required
                id="news-url"
                name="url"
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <label htmlFor="news-image">Image</label>
          <div className="image-upload">
            <input
              required
              type="file"
              accept="image/*"
              id="news-image"
              onChange={handleFileChange}
            />
            <img id="image-preview" src="#" alt="" />
          </div>
          {message ? <h3 className="status-message">{message}</h3> : null}
          <button type="submit">Create post</button>
        </form>
      </div>
    );
  }
}
