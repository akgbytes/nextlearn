import { Link } from "react-router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AdminCourses = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Courses</h2>
        <Link to="/admin/courses/create" className={cn(buttonVariants())}>
          Create Course
        </Link>
      </div>
    </>
  );
};

export default AdminCourses;
