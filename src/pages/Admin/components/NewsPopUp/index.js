import React, { useState, useEffect } from 'react';
// import './BlogPopUp.css';
import styles from './BlogPopUp.module.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Link } from 'react-router-dom';
// import PostApi from '../../Apis/PostApi';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';

function BlogPopup({ type, setType, updatePost, setUpdatePost }) {
  const [thumbnail, setThumbnail] = useState();
  const [title, setTitle] = useState();
  const [linkPost, setLinkPost] = useState();
  const [content, setContent] = useState();

  // const handleCreatePost = async () => {
  //   let thumbnailUrl = '';
  //   const formData = new FormData();
  //   await formData.append('image', thumbnail);
  //   await PostApi.uploadImageToFirebase({
  //     image: formData,
  //   }).then((res) => {
  //     thumbnailUrl = res.url;
  //   });

  //   await PostApi.createPost({
  //     title: title,
  //     image: thumbnailUrl,
  //     linkPost: linkPost,
  //     content: content,
  //   })
  //     .then((res) => {
  //       Swal.fire({
  //         position: 'top',
  //         icon: 'success',
  //         title: 'Tạo bài viết thành công!',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleUpdatePost = async () => {
  //   let thumbnailUrl = '';
  //   if (thumbnail === updatePost.image) {
  //     thumbnailUrl = thumbnail;
  //   } else {
  //     const formData = new FormData();
  //     await formData.append('image', thumbnail);
  //     await PostApi.uploadImageToFirebase({
  //       image: formData,
  //     }).then((res) => {
  //       thumbnailUrl = res.url;
  //     });
  //   }

  //   await PostApi.updatePost({
  //     postId: updatePost._id,
  //     title: title,
  //     image: thumbnailUrl,
  //     linkPost: linkPost,
  //     content: content,
  //   })
  //     .then((res) => {
  //       Swal.fire({
  //         position: 'top',
  //         icon: 'success',
  //         title: 'Cập nhật bài viết thành công!',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       setUpdatePost({});
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    if (updatePost !== {}) {
      setTitle(updatePost.title);
      setContent(updatePost.content);
      setThumbnail(updatePost.image);
      }
  }, [updatePost]);

  return (
    <>
      {type === 'create' && (
        <div className={styles.bPopup}>
          <CancelIcon className={styles.bPopup__close} onClick={() => setType('')} />
          <h3>Thêm bài đăng</h3>
          <label htmlFor="title">
            Tiêu đề<span style={{ color: 'red' }}>*</span>
          </label>
          <br />
          <input id="title" type="text" placeholder="Nhập tiêu đề..." onChange={(e) => setTitle(e.target.value)} />
          <br />
          <label htmlFor="thumbnail">Thumbnail</label>
          <br />
          <input id="thumbnail" type="file" title="Thêm ảnh" onChange={(e) => setThumbnail(e.target.files[0])} />
          <br />
          <label htmlFor="link">Link bài viết</label>
          <br />
          <input
            id="link"
            type="text"
            placeholder="Nhập link bài viết nếu có..."
            onChange={(e) => setLinkPost(e.target.value)}
          />
          <br />
          <label>Nội dung:</label>
          <br />
          <CKEditor
            editor={ClassicEditor}
            config={{
              // plugins: [CKFinder],
              ckfinder: {
                uploadUrl: 'http://localhost:5000/posts/uploads',
              },
            }}
            onChange={async (event, editor) => {
              const data = await editor.getData();
              setContent(data);
            }}
          />
          <div className={styles.bPopup__button}>
            {/* <button type="button" onClick={handleCreatePost}>
              Đăng bài
            </button> */}
            <Link to="/">Hủy</Link>
          </div>
        </div>
      )}
      {type === 'update' && (
        <div className={styles.bPopup}>
          <CancelIcon className={styles.bPopup__close} onClick={() => setType('')} />
          <h3>Cập nhật bài đăng</h3>
          <label htmlFor="title">
            Tiêu đề<span style={{ color: 'red' }}>*</span>
          </label>
          <br />
          <input id="title" type="text" placeholder={updatePost.title} onChange={(e) => setTitle(e.target.value)} />
          <br />
          <label htmlFor="thumbnail">Thumbnail</label>
          <br />
          <input id="thumbnail" type="file" title="Thêm ảnh" onChange={(e) => setThumbnail(e.target.files[0])} />
          <br />
          <img style={{ maxWidth: '200px' }} src={updatePost.image} alt="img" />
          <br />
          <label htmlFor="link">Link bài viết</label>
          <br />
          <input
            id="link"
            type="text"
            placeholder={updatePost.linkPost}
            onChange={(e) => setLinkPost(e.target.value)}
          />
          <br />
          <label>Nội dung:</label>
          <br />
          <CKEditor
            editor={ClassicEditor}
            data={updatePost.content}
            config={{
              // plugins: [CKFinder],
              ckfinder: {
                uploadUrl: 'http://localhost:5000/posts/uploads',
              },
            }}
            onChange={async (event, editor) => {
              const data = await editor.getData();
              setContent(data);
            }}
          />
          <div className={styles.bPopup__button}>
            {/* <button type="button" onClick={handleUpdatePost}>
              Cập nhật
            </button> */}
            <Link to="/">Hủy</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPopup;
