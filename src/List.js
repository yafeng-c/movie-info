import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import "./List.css";
import { api_key } from "./requests";
import axios from "./axios";
import { Redirect } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

function List() {
  const [{ userId }, dispatch] = useStateValue();
  const [list, setList] = useState([]);
  const [media, setMedia] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    // let isSubscribed = true;
    if (userId) {
      var listRef = db.ref("users/" + userId + "/list");
      listRef.once("value").then(function (snapshot) {
        var data = snapshot.val();
        if (data) {
          setList(data);
        }
      });
      // db.collection("users")
      //   .doc(userId)
      //   .collection("list")
      //   .orderBy("addtime", "desc")
      //   .onSnapshot((snapshot) => {
      //     if (isSubscribed) {
      //       setList(snapshot.docs.map((doc) => doc.data()));
      //     }
      //   });
    }
    // return () => (isSubscribed = false);
  }, [list]);

  useEffect(() => {
    async function fetchData() {
      if (videoId !== "") {
        const request = await axios.get(
          `/${media}/${videoId}?api_key=${api_key}`
        );
        return request;
      }
    }
    fetchData().then((request) => {
      if (request) {
        dispatch({
          type: "SELECT_VIDEO",
          selectedVideo: request.data,
        });
      }
    });
  }, [videoId]);

  const handleClick = (item) => {
    setMedia(item.mediatype);
    setVideoId(item.videoid);
  };

  if (videoId) return <Redirect to={`/video/${videoId}`} />;

  const handleDelete = (videoid) => {
    db.ref("users/" + userId + "/list/" + videoid).remove();
    // db.collection("users")
    //   .doc(userId)
    //   .collection("list")
    //   .doc(videoid)
    //   .delete()
    //   .then(window.alert("Deleted"));
  };
  return (
    <div className="listPage">
      <div className="listRow">
        {list &&
          Object.entries(list).map(([key, item]) => (
            <div className="listItem">
              <img src={item.poster} />
              <div className="listItem_sub">
                <p onClick={() => handleClick(item)}>{item.videoname}</p>
                <CloseIcon onClick={() => handleDelete(item.videoid)} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default List;
