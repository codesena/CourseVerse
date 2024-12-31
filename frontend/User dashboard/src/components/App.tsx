import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import UserDashboard from "./userDashboard";
import Register from "./register";
import Login from "./login";
import Courses from "./courses";
import PurchasedCourses from "./purchasedCourses";
import BuyCourse from "./buyCourse";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { coursesState, loginState } from "../recoil/myatoms";

const getCoursesURL = "http://localhost:3000/user/courses";

function App() {
  const isLoggedin = useRecoilValue(loginState);
  const setCourses = useSetRecoilState(coursesState);

  useEffect(() => {
    if (isLoggedin) {
      axios
        .get(getCoursesURL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        })
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          console.error("Error in fetching courses data.", err);
        });
    }
  }, [isLoggedin, setCourses]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/buy" element={<BuyCourse />} />
          <Route path="/courses/purchased" element={<PurchasedCourses />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
