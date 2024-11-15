import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyle from "./styles.js";
import { createPost, updatePost } from "../../actions/posts.js";

// get the current id

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''})
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
  const classes = useStyle();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData)

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate()))
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    }

    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Vui lòng đăng nhập để đăng bài và tương tác
        </Typography>
      </Paper>
    )
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({ title: '', message: '', tags: '', selectedFile: ''  })
  }

  return (
      <Paper className={classes.paper} elevation={6}>
        <form
            autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
        >
          <Typography variant="h6">{ currentId ? 'Sửa' : 'Tạo'} bài viết</Typography>

          <TextField name="title" variant="outlined" label="Tiêu đề" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
          <TextField name="message" variant="outlined" label="Nội dung" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
          <TextField name="tags" variant="outlined" label="Tag" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>

          <div className={classes.fileInput}>
            <FileBase
                type = "file"
                multiple = {false}
                onDone = {(base64) => setPostData({ ...postData, selectedFile: base64 })}
            />
          </div>

          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Đăng</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Làm mới</Button>
        </form>
      </Paper>
  );
};

export default Form;
