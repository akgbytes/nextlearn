import { Link } from "react-router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useGetCoursesQuery } from "@/features/admin/adminApi";

const AdminCourses = () => {
  const { data, error, isLoading } = useGetCoursesQuery();
  console.log("data", data);

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Failed to load courses</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Courses</h2>
          <ul>
            {data?.data.map((course) => (
              <li key={course.id}>
                {course.title} — ₹{course.price}
              </li>
            ))}
          </ul>
        </div>
        <Link to="/admin/courses/create" className={cn(buttonVariants())}>
          Create Course
        </Link>
      </div>
    </>
  );
};

export default AdminCourses;
