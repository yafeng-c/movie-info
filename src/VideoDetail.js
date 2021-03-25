import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./VideoDetail.css";
import CommentCard from "./CommentCard";
import AddBoxIcon from "@material-ui/icons/AddBox";
import StopIcon from "@material-ui/icons/Stop";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { db } from "./firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function VideoDetail({ history }) {
  const [{ selectedVideo, currentUser, userId }] = useStateValue();
  const [comments, setComments] = useState([]);
  const { videoId } = useParams();
  const [input, setInput] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    let isSubscribed = true;
    if (videoId) {
      var commentsRef = db.ref("videos/" + videoId + "/comments/");
      commentsRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setComments(data);
      });
      // db.collection("videos")
      //   .doc(videoId)
      //   .collection("comments")
      //   .orderBy("posttime", "desc")
      //   .onSnapshot((snapshot) => {
      //     if (isSubscribed) {
      //       setComments(snapshot.docs.map((doc) => doc.data()));
      //     }
      //   });
    }
    return () => (isSubscribed = false);
  }, [videoId]);

  //console.log(comments);

  const handleClick = (movie) => {
    if (!trailerUrl) {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => window.alert(error));
    }
    setTrailerUrl("");
  };

  const sendComment = (e) => {
    e.preventDefault();
    if (!currentUser) history.push("/login");
    db.ref("users/" + userId + "/comments/" + videoId).set({
      comment: input,
      posttime: firebase.database.ServerValue.TIMESTAMP,
      likes: 0,
    });
    db.ref("videos/" + videoId + "/comments/" + userId).set({
      comment: input,
      username: currentUser,
      posttime: firebase.database.ServerValue.TIMESTAMP,
      likes: 0,
      commentuserid: userId,
    });
    setInput("");
  };

  const handleAdd = () => {
    if (!currentUser) {
      history.push("/login");
    } else {
      db.ref("users/" + userId + "/list/" + videoId).set({
        username: currentUser,
        userid: userId,
        videoname: selectedVideo.name || selectedVideo.title,
        addtime: firebase.database.ServerValue.TIMESTAMP,
        poster: base_url + selectedVideo.poster_path,
        videoid: videoId,
        mediatype: selectedVideo.media_type
          ? selectedVideo.media_type
          : "movie",
      });
      // const docRef = db
      //   .collection("users")
      //   .doc(userId)
      //   .collection("list")
      //   .doc(videoId);

      // docRef.get().then((doc) => {
      //   if (!doc.exists) {
      //     docRef
      //       .set({
      //         username: currentUser,
      //         userid: userId,
      //         videoname: selectedVideo.name || selectedVideo.title,
      //         addtime: firebase.firestore.FieldValue.serverTimestamp(),
      //         poster: base_url + selectedVideo.poster_path,
      //         videoid: videoId,
      //         mediatype: selectedVideo.media_type
      //           ? selectedVideo.media_type
      //           : "movie",
      //       })
      //       .then(window.alert("Added!"));
      //   } else {
      //     window.alert("already in your list");
      //   }
      // });
    }
  };

  return (
    <div className="video">
      {selectedVideo && (
        <div className="video_detail">
          <div className="video_info">
            <img
              className="video_poster"
              src={`${base_url}${selectedVideo.poster_path}`}
            />
            <div className="video_text">
              <h2 className="video_name">
                {selectedVideo.name || selectedVideo.title}
              </h2>
              <div className="video_subline">
                <p>
                  {selectedVideo.vote_average} scores ·{" "}
                  {selectedVideo.first_air_date || selectedVideo.release_date}·{" "}
                  {selectedVideo.media_type
                    ? selectedVideo.media_type
                    : "movie"}
                </p>
                <div className="video_icons">
                  <AddBoxIcon onClick={() => handleAdd()} />
                  {trailerUrl ? (
                    <StopIcon onClick={() => handleClick(selectedVideo)} />
                  ) : (
                    <PlayCircleOutlineIcon
                      className="video_playIcon"
                      onClick={() => handleClick(selectedVideo)}
                    />
                  )}
                </div>
              </div>
              <hr />
              <p className="video_overview">{selectedVideo.overview}</p>
            </div>
          </div>
          {trailerUrl !== "" && <YouTube videoId={trailerUrl} opts={opts} />}
          <div className="video_comments">
            <div className="comment_write">
              <input
                type="text"
                placeholder="Write your comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <RateReviewIcon className="commentButton" onClick={sendComment} />
            </div>

            <div className="posted_comments">
              {comments &&
                Object.entries(comments).map(([key, value]) => (
                  <CommentCard comment={value} videoid={videoId} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetail;
