import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "#site/content";
import { slug } from "github-slugger";

//cn function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//format date
export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

//para ordenar los posts por fecha de forma descendente
export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  return tags;
}

//how?
export function sortTagsByCount(tags: Record<string, number>) {
  console.log(tags);
  console.log(Object.keys(tags).sort((a, b) => tags[b] - tags[a]));
  return Object.keys(tags).sort((a, b) => {
    console.log(a, b);
    return tags[b] - tags[a];
  });
}

//how?
export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}
