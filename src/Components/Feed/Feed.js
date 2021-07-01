import React, { useState, useEffect, useRef } from 'react';
import "./Feed.css";
import InputOption from "./InputOption"
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from "./Post";
import {db} from "../../firebase";
import firebase from "firebase";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


function Feed() {
    const textRef = useRef();
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(()=>{
      db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    },[])

    const sendPost = (e) => {
        e.preventDefault();

        if(textRef.current.value){
          db.collection("posts").add({
            name: user.displayName, 
            description:"Post", 
            message: textRef.current.value,
            photoURL:user?.photoURL || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });

          textRef.current.value="";
        }
    }

    return (
      <div className="feed">
        <div className="feed__inputContainer">
          <div className="feed__input">
            <CreateIcon className="feed__icon" />
            <form>
              <input
                ref={textRef}
                placeholder="What is up"
                type="text"
              />
              <button onClick={sendPost} type="submit">
                Send
              </button>
            </form>
          </div>
          <div className="feed__inputOptions">
            <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
            <InputOption
              Icon={SubscriptionsIcon}
              title="Video"
              color="#E7A33E"
            />
            <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
            <InputOption
              Icon={CalendarViewDayIcon}
              title="Write article"
              color="#7FC15E"
            />
          </div>
        </div>

        {/*Post*/}
        {posts.map((post) => {
          const {
            id,
            data: { name, description, message, photoURL },
          } = post;
          return (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoURL}
            />
          );
        })}
      </div>
    );
}

export default Feed
