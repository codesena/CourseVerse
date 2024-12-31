import { useEffect } from "react";
import AdminDashboard from "./adminDashboard";
import Courses from "./courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormAddCourse from "./form-add-course";
import FormUpdateCourse from "./form-update-course";
import Register from "./register";
import Login from "./login";
import Layout from "./layout";
import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { coursesState, loginState } from "../recoil/myatoms";

const getCoursesURL = "http://localhost:3000/admin/courses";

function App() {
  const isLoggedin = useRecoilValue(loginState);
  const setCourses = useSetRecoilState(coursesState);

  useEffect(() => {
    if (isLoggedin) {
      axios
        .get(getCoursesURL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
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
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/add" element={<FormAddCourse />} />
          <Route path="/courses/update" element={<FormUpdateCourse />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
