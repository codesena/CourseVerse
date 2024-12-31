import Course from "./course";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { coursesState } from "../recoil/myatoms";
import { courseType } from "@adityakumar172001/courselling_types";

const getCoursesURL = "http://localhost:3000/admin/courses";

export default function Courses() {
  const [courses, setCourses] = useRecoilState<courseType[]>(coursesState);
  useEffect(() => {
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
  }, [setCourses]);

  return (
    <div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {courses.map((course) => (
          <Course
            key={course._id}
            _id={course._id!}
            title={course.title}
            description={course.description}
            imageURL={course.imageURL}
          />
        ))}
      </div>
    </div>
  );
}
