import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import slugify from "slugify";
import { CourseCategory, CourseLevel, CourseStatus } from "@/lib/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Tiptap from "@/components/text-editor/tiptap";

import { Plus, Sparkle } from "lucide-react";
import { Uploader } from "@/components/uploader";

import { capitalize } from "@/utils/capitalize";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "@/features/admin/adminApi";

import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";
import Spinner from "@/components/spinner";
import { courseFormSchema, type CourseFormValues } from "./CreateCourse";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect } from "react";
import { tryCatch } from "@/utils/try-catch";
import { handleApiError } from "@/utils/error";

const EditCourse = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCourseQuery({ id: id! });
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  console.log("data:", data);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: data?.data.title ?? "",
      description: data?.data.description ?? "",
      shortDescription: data?.data.shortDescription ?? "",
      thumbnailUrl: data?.data.thumbnailUrl ?? "",
      price: data?.data.price ?? 0,
      duration: data?.data.duration ?? 1,
      category: "Design",
      slug: data?.data.slug ?? "",
      level: data?.data.level ?? "beginner",
      status: data?.data.status ?? "draft",
    },
  });

  async function onSubmit(values: CourseFormValues) {
    console.log("course form data: ", values);

    const { data: updatedCourse, error } = await tryCatch(
      updateCourse({ ...values, id: data!.data.id }).unwrap()
    );

    if (error) {
      handleApiError(error);
    }

    if (updatedCourse) {
      enqueueSnackbar(updatedCourse.message || "Course updated successfully", {
        variant: "success",
      });
      form.reset();
      navigate("/admin/courses");
      console.log("success :", updatedCourse);
    }
  }

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data as CourseFormValues);
    }
  }, [data, form]);

  if (isLoading) return <p>Loading course...</p>;
  if (error) return <p>Failed to load course</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Edit course:{" "}
        <span className="text-primary underline">{data?.data.title}</span>
      </h1>
      <Tabs defaultValue="">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Complete Web Development Bootcamp"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 items-end">
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Course URL Slug</FormLabel>

                          <div className="flex gap-4">
                            <FormControl>
                              <Input
                                placeholder="Used in the course URL, must be unique"
                                {...field}
                              />
                            </FormControl>

                            <Button
                              type="button"
                              className="w-fit"
                              onClick={() => {
                                const title = form.getValues("title");
                                if (!title || title.length < 2) {
                                  return enqueueSnackbar(
                                    "Fill a valid title first",
                                    { variant: "error" }
                                  );
                                }
                                const slug = slugify(title, { lower: true });
                                form.setValue("slug", slug, {
                                  shouldValidate: true,
                                });
                              }}
                            >
                              Generate Slug <Sparkle className="size-4 ml-1" />
                            </Button>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g. A beginner-friendly guide to web development."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Tiptap field={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail Image</FormLabel>
                        <FormControl>
                          <Uploader
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CourseCategory.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select course level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(CourseLevel).map((level) => (
                                <SelectItem key={level} value={level}>
                                  {capitalize(level)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (hours)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 40" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 499" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(CourseStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {capitalize(status)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        Updating ...
                        <Spinner />
                      </>
                    ) : (
                      <>
                        Updating Course <Plus className="size-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditCourse;
