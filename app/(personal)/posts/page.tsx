import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import Link from 'next/link';

// Define a type for the fetched posts
export interface Post {
  title: string;
  slug: {
    current: string;
  }
  excerpt: string;
  coverImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  date: string;
  author: {
    name: string;
    picture?: {
      asset: {
        url: string;
      };
      alt?: string;
    };
  };
}

// Fetch all the posts
export async function getPosts() {
  const posts = await client.fetch(allPostsQuery);
  return posts;
}

// Posts Page Component
export default async function PostsPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="container mx-auto px-4 m-2 mb-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug.current} className="border rounded-lg p-4 shadow-lg">
            <Link href={`/posts/${post.slug.current}`}>
              {post.coverImage && (
                <img
                  src={post.coverImage.asset.url}
                  alt={post.coverImage.alt || post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-gray-500">By {post.author.name} on {new Date(post.date).toLocaleDateString()}</p>
              <p className="mt-2">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
