import type { ElementType } from "react";
import { BookOpen, Layers, BarChart3, Users } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: ElementType;
};

export const features: Feature[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Explore a wide range of carefully curated courses created by industry experts.",
    icon: BookOpen,
  },
  {
    title: "Interactive Learning",
    description:
      "Learn by doing with quizzes, assignments, and interactive content that keeps you engaged.",
    icon: Layers,
  },
  {
    title: "Progress Tracking",
    description:
      "Track your growth with detailed analytics, personalized dashboards, and achievement milestones.",
    icon: BarChart3,
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate, discuss, and share knowledge.",
    icon: Users,
  },
];
