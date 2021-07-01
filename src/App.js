import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Feed from "./Components/Feed/Feed";
import Widgets from "./Components/Widgets/Widgets";
import Login from "./Components/Login/Login";
import { selectUser, login, logout } from "./features/userSlice";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //const user = true;

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }); 

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header user={user} />
          <div className="app__body">
            <Sidebar user={user} />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
