import React, { useState } from "react";
import "./CommentCard.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function CommentCard({ comment, videoid }) {
  const [{ currentUser, userId }] = useStateValue();
  const [isExist, setIsExist] = useState(false);
  const handleClick = () => {
    if (!currentUser) {
      alert("Please login first");
    } else {
      const key = comment.username;
      var likedMovieCommentRef = db.ref(
        "users/" + userId + "/likedcomments/" + videoid + "/" + key
      );
      likedMovieCommentRef.once("value").then(function (snapshot) {
        if (snapshot.val()) {
          setIsExist(true);
        } else {
          setIsExist(false);
        }
      });
      if (isExist) {
        db.ref("videos/")
          .child(videoid)
          .child("comments")
          .child(comment.commentuserid)
          .child("likes")
          .set(firebase.database.ServerValue.increment(-1))
          .then(likedMovieCommentRef.remove());
      } else {
        likedMovieCommentRef.set({ comment: comment.comment });
        db.ref("videos/")
          .child(videoid)
          .child("comments")
          .child(comment.commentuserid)
          .child("likes")
          .set(firebase.database.ServerValue.increment(1));
      }
    }

    // const docRef = db
    //   .collection("users")
    //   .doc(userId)
    //   .collection("likedComments")
    //   .doc(comment.docid);
    // docRef.get().then((doc) => setIsExist(doc.exists));
    // if (currentUser && !isExist) {
    //   db.collection("videos")
    //     .doc(videoid)
    //     .collection("comments")
    //     .doc(comment.docid)
    //     .update({
    //       likes: firebase.firestore.FieldValue.increment(1),
    //     })
    //     .then(
    //       docRef.set({
    //         ...comment,
    //       })
    //     );
    // } else if (!currentUser) {
    //   window.alert("please login in first");
    // } else if (isExist) {
    //   db.collection("videos")
    //     .doc(videoid)
    //     .collection("comments")
    //     .doc(comment.docid)
    //     .update({
    //       likes: firebase.firestore.FieldValue.increment(-1),
    //     })
    //     .then(docRef.delete());
    // }
  };
  return (
    <div className="comment_card">
      <p className="comment">{comment.comment}</p>
      <div className="comment_info">
        <p className="comment_user">
          by {comment.username ? comment.username : "unknown"}
        </p>
        <p className="post_time">
          at {new Date(comment.posttime).toDateString()}
        </p>
        <p className="comment_likes">
          {comment.likes ? comment.likes : 0} likes
        </p>
        <FavoriteBorderIcon className="likeButton" onClick={handleClick} />
      </div>
    </div>
  );
}

export default CommentCard;
