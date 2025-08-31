import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";
import {
  ArrowRight,
  Eye,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";

interface Props {
  course: Course;
}

const AdminCourseCard = ({ course }: Props) => {
  return (
    <Card className="group relative py-0 gap-0">
      {/* absolute dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to={`/courses/${course.slug}`}>
                <Eye className="size-4 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to={`/admin/courses/${course.id}/edit`}>
                <Pencil className="size-4 mr-2" />
                Edit Course
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to={`/admin/courses/${course.id}/delete`}>
                <Trash2 className="size-4 mr-2" />
                Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img
        src={course.thumbnailUrl}
        alt="thumbnail"
        className="w-full h-72 rounded-t-xl aspect-video object-cover"
      />

      <CardContent className="p-4">
        <Link
          to={`/admin/courses/${course.id}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.title}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {course.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.duration}h</p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.level}</p>
          </div>
        </div>

        <Link
          to={`/admin/courses/${course.id}/edit`}
          className={cn(buttonVariants({ className: "w-full mt-4" }))}
        >
          Edit Course <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdminCourseCard;
