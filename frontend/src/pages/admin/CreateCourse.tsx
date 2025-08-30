import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { toast } from "sonner";
import { capitalize } from "@/utils/capitalize";

export const courseFormSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),

  description: z
    .string()
    .min(50, { error: "Description must be at least 50 characters long" }),

  shortDescription: z
    .string()
    .min(25, {
      error: "Short description must be at least 25 characters long",
    })
    .max(250, {
      error: "Short description must be at most 250 characters long",
    }),

  thumbnailUrl: z.string().min(1, { error: "Thumbnail is required" }),

  price: z.coerce
    .number<number>()
    .min(0, { error: "Price must be not be negative" }),

  duration: z.coerce
    .number<number>()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(500, { error: "Duration must be at most 500 hours" }),

  category: z.enum(CourseCategory, {
    error: (issue): string =>
      `Invalid level, expected ${CourseCategory}, received ${issue.input}`,
  }),

  slug: z
    .string()
    .min(3, { error: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      error: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),

  level: z.enum(CourseLevel, {
    error: (issue) =>
      `Invalid level, Expected ${Object.values(CourseLevel).join(
        " | "
      )}, Received ${issue.input}`,
  }),

  status: z.enum(CourseStatus, {
    error: (issue) =>
      `Invalid level, Expected ${Object.values(CourseStatus).join(
        " | "
      )}, Received ${issue.input}`,
  }),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;

const CourseCreation = () => {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      shortDescription: "",
      thumbnailUrl: "",
      price: 0,
      duration: 1,
      category: "Teaching",
      slug: "",
      level: "beginner",
      status: "draft",
    },
  });

  function onSubmit(values: CourseFormValues) {}

  return (
    <>
      <h2 className="text-2xl font-bold">Create Course</h2>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the essential details for your course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              return toast.error("Fill a valid title first");
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
                      <Uploader value={field.value} onChange={field.onChange} />
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

              <Button type="submit">
                Create Course <Plus className="size-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseCreation;
