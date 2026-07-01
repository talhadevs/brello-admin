export type BlogStatus = "Published" | "Draft" | "Scheduled";
export type BlogCategory =
  | "Weight Loss"
  | "Medication"
  | "Nutrition"
  | "Fitness"
  | "Community";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: BlogCategory;
  status: BlogStatus;
  date: string;
  views: number;
  readTime: number;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "5 Tips to Maximize Your GLP-1 Journey",
    excerpt: "Simple, provider-backed habits that help you get the most out of your weight loss plan.",
    author: "Dr. Sarah Lane",
    category: "Weight Loss",
    status: "Published",
    date: "2026-06-28",
    views: 4210,
    readTime: 6,
  },
  {
    id: "b2",
    title: "Semaglutide vs Tirzepatide: What's the Difference?",
    excerpt: "A clear breakdown of how these two popular medications compare for wellness goals.",
    author: "Dr. Mia Chen",
    category: "Medication",
    status: "Published",
    date: "2026-06-25",
    views: 6890,
    readTime: 8,
  },
  {
    id: "b3",
    title: "NAD+ and Longevity: What the Science Says",
    excerpt: "Exploring the role of NAD+ in energy, aging, and overall vitality.",
    author: "Dr. Sarah Lane",
    category: "Medication",
    status: "Published",
    date: "2026-06-21",
    views: 3120,
    readTime: 5,
  },
  {
    id: "b4",
    title: "How Brello Rise Supports Your Fitness Goals",
    excerpt: "Yoga, boxing, pilates and more — included with every wellness plan.",
    author: "Coach Amy Ross",
    category: "Fitness",
    status: "Draft",
    date: "2026-06-19",
    views: 0,
    readTime: 4,
  },
  {
    id: "b5",
    title: "Nutrition Habits That Actually Stick",
    excerpt: "Practical, no-pressure nutrition tips to build a routine you can keep.",
    author: "Coach Amy Ross",
    category: "Nutrition",
    status: "Scheduled",
    date: "2026-07-05",
    views: 0,
    readTime: 7,
  },
  {
    id: "b6",
    title: "Member Story: Losing 62 Pounds with Brello",
    excerpt: "Norma shares her six-month transformation and what kept her going.",
    author: "Brello Team",
    category: "Community",
    status: "Published",
    date: "2026-06-15",
    views: 9540,
    readTime: 6,
  },
  {
    id: "b7",
    title: "Sermorelin Explained: Benefits & Basics",
    excerpt: "Everything you need to know about our newest wellness medication.",
    author: "Dr. Mia Chen",
    category: "Medication",
    status: "Published",
    date: "2026-06-11",
    views: 1870,
    readTime: 5,
  },
  {
    id: "b8",
    title: "Staying Motivated in Your Wellness Community",
    excerpt: "How our private community keeps members accountable and encouraged.",
    author: "Brello Team",
    category: "Community",
    status: "Draft",
    date: "2026-06-08",
    views: 0,
    readTime: 4,
  },
];

export const CATEGORY_STYLES: Record<BlogCategory, string> = {
  "Weight Loss": "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  Medication: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Nutrition: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Fitness: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Community: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
};

export const STATUS_STYLES: Record<BlogStatus, string> = {
  Published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Draft: "bg-muted text-muted-foreground",
  Scheduled: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
};
