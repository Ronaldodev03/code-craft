import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css"; //style para el codigo
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";

//type
type PostPageProps = {
  params: {
    slug: string[];
  };
};

//recibe un array de string con los slug, los vuelve un string con join, y con eso filtra los posts
async function getPostFromParams(params: PostPageProps["params"]) {
  //slug sera un string uniendo los elementos del array con "/"
  const slug = params?.slug?.join("/");
  //con el slug se hace un filtrado y se retorna
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

//metadata
//takes the dynamic generated images from /api/og/route.tsx
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

//esto es para el SSG, esta function retorna los slugs
//esto lo colocamos en las rutas con url dinamica
//toda funcion async retorna una promesa
export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

//SSR | params da el pathname
export default async function PostPage({ params }: PostPageProps) {
  console.log(params);

  const post = await getPostFromParams(params);

  //in case we don't have the posts
  if (!post || !post.published) {
    notFound(); //this is a function of next
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      {/* content from .mdx file */}
      <MDXContent code={post.body} />
    </article>
  );
}
