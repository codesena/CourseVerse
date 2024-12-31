import PurchasedCourse from "./purchasedCourse";
import NoPurchasedCourseFound from "./noCoursePurchased";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { purchasedCoursesState } from "../recoil/myatoms";

const getPurchasedCoursesURL = "http://localhost:3000/user/purchasedCourses";

export default function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useRecoilState(
    purchasedCoursesState
  );
  useEffect(() => {
    axios
      .get(getPurchasedCoursesURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      .then((res) => {
        setPurchasedCourses(res.data);
      })
      .catch((err) => {
        console.error("Error in fetching courses data.", err);
      });
  }, [setPurchasedCourses]);

  return (
    <div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {purchasedCourses.length === 0 ? (
          <NoPurchasedCourseFound />
        ) : (
          purchasedCourses.map((course) => (
            <PurchasedCourse
              key={course._id}
              title={course.title}
              description={course.description}
              imageURL={course.imageURL}
            />
          ))
        )}
      </div>
    </div>
  );
}
