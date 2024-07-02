import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import Image from "next/image";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className=" h-screen flex justify-center items-center -mt-14 ">
        <div className="container flex flex-col gap-4 lg:px-14 ">
          <div className=" flex justify-center items-center gap-4">
            <div className=" flex flex-col gap-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance text-center lg:text-left ">
                Hello, I&apos;m {""}
                <span className=" bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
                  Ronaldo
                </span>
              </h1>
              <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center lg:text-left ">
                Welcome to
                <span className=" font-bold text-primary"> CodeCraft</span>.
                Here, you&apos;ll find
                <span className=" italic font-bold">
                  {" "}
                  simple and practical insights{" "}
                </span>
                on HTML, CSS, JavaScript, React, and TypeScript. Built with
                Next.js 14, shadcn, Tailwind, and Velite, this blog offers
                <span className=" font-bold"> knowledge </span>
                for developers at all levels.
              </p>

              {/* buttons */}
              <div className="flex flex-col justify-center lg:justify-start gap-4 sm:flex-row">
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full sm:w-fit text-muted font-bold "
                  )}
                >
                  View my blog
                </Link>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full sm:w-fit font-bold"
                  )}
                >
                  GitHub
                </Link>
              </div>
            </div>

            <Image
              src="/undraw_website.svg"
              width={300}
              height={300}
              alt=""
              className=" hidden lg:block"
            />
          </div>
        </div>
      </section>
      <section className=" container max-w-4xl flex flex-col">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li key={post.slug} className="first:border-t first:border-border">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
