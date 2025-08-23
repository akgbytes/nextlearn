import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/data/features";

import { cn } from "@/lib/utils";

import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge>Next-Gen Learning Platform</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Learn smarter with interactive courses, real-time progress tracking,
            and a supportive community. Access world-class education anytime, on
            any device.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              to="/"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "outline",
                })
              )}
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ title, description, icon: Icon }, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">
                <Icon className="size-8" />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-32"></section>
    </>
  );
};

export default Home;
