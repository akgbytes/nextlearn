import { Link } from "react-router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useGetCoursesQuery } from "@/features/admin/adminApi";
import AdminCourseCard from "@/features/admin/components/admin-course-card";

const AdminCourses = () => {
  const { data, error, isLoading } = useGetCoursesQuery();
  console.log("data", data);

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Failed to load courses</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Courses</h2>

        <Link to="/admin/courses/create" className={cn(buttonVariants())}>
          Create Course
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
        {data?.data.map((course) => (
          <li key={course.id}>
            <AdminCourseCard course={course} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminCourses;
