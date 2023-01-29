import {Route, Routes} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Editing from './Editing';
import Delete from './Delete';
import Update from './Update';
import './App.css';
import Range from "./Range.js";
import RangeType from "./RangeType";
import React, { useEffect } from "react";
import Order from './components/order/Order'
import ControlBar from "./components/control-bar/ControlBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BookingPage from "./BookingPage";
import UserToy from './components/toy-preview/UserToy';

export default function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    console.info('Authenticated user: ' + JSON.stringify(currentUser))
  }, [])

  return (
    <div>
      <ControlBar />

      <Routes>
        <Route exact path="/" element={<Range/>}/>
        <Route exact path="/toys" element={<Range/>}/>
        <Route exact path={`/toys/:pk`} element={<RangeType/>}></Route>
        <Route exact path={"/order"} element={<Order/>}></Route>
        <Route path ="/register" element={<Register/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route exact path={"/add"} element={<Editing/>}></Route>
        <Route exact path={"/delete"} element={<Delete/>}></Route>
        <Route exact path={"/update"} element={<Update/>}></Route>
        <Route path ="/bookingpage" element={<BookingPage/>}/>
        <Route path ="/booking" element={<UserToy/>}/>
      </Routes>
    </div>
  );
}
