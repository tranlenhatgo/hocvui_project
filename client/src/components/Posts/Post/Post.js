import React, { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    ButtonBase,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete.js";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz.js";
import moment from "moment";
import {useDispatch} from "react-redux";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useHistory } from "react-router-dom";

import useStyle from "./styles.js";
import {deletePost, likePost} from "../../../actions/posts.js";

const Post = ({post, setCurrentId}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("profile"));
    const [likes, setLikes] = useState(post?.likes)

    const isPostOwner =
        user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator;

    const handleLike = async () => {
        const userId = user?.result?.googleId || user?.result?._id;
        const hasLikePost = post.likes.find((like) => like.toString() === userId)

        dispatch(likePost(post._id))

        if (hasLikePost) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([...post.likes, userId])
        }
    }

    const Likes = () => {
        console.log(user);
        const userId = user?.result?.googleId || user?.result?._id;

        console.log("Likes:", likes); // Log the likes
        console.log("User ID:", userId); // Log the userId
        console.log("User Object:", user);

        if (likes.length > 0) {
            return likes.find(
                (like) => like.toString() === userId
            ) ? (
                <>
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small"/>
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize="small"/>
                &nbsp;Like
            </>
        );
    };

    const openPost = () => history.push(`/posts/${post._id}`)

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                className={classes.cardAction}
                onClick={openPost}
            >
                <CardMedia
                    className={classes.media}
                    image={post.selectedFile}
                    title={post.title}
                />

                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </div>

                {isPostOwner && (
                    <div className={classes.overlay2}>
                        <Button
                            style={{color: "white"}}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();  // Chặn sự kiện click lan truyền lên ButtonBase
                                setCurrentId(post._id);
                            }}
                        >
                            <MoreHorizIcon fontSize="default"/>
                        </Button>
                    </div>
                )}

                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>

                <Typography className={classes.title} variant="h5" gutterBottom>
                    {post.title}
                </Typography>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    disabled={!user?.result}
                    onClick={handleLike}
                >
                    <Likes/>
                </Button>

                {isPostOwner && (
                    <Button
                        size="small"
                        color="secondary"
                        onClick={() => dispatch(deletePost(post._id))}
                    >
                        <DeleteIcon fontSize="small"/>
                        Xóa
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;
