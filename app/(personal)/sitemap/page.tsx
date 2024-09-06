import { sitemapQuery } from '../../../sanity/lib/queries';
import { client } from '@/sanity/lib/client';

const Sitemap = async () => {
  const sitemapData = await client.fetch(sitemapQuery);

  return (
    <div className="text-center font-sans mt-4">
      <h1 className="text-4xl mb-4">Sitemap</h1>
      <ul className="list-none p-0">
        <li className="my-4">
          <a href={`${process.env.NEXT_PUBLIC_SITE_URL}`} className="text-blue-500 no-underline hover:underline">Home</a>
        </li>
        <li className="my-4">
          <span className="font-bold block mb-2 underline">Pages</span>
          <ul className="list-none pl-4 text-left inline-block">
            {sitemapData.pages.map((page) => (
              <li key={page.slug} className="my-2">
                <a href={`${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}`} className="text-blue-500 no-underline hover:underline">{page.slug}</a>
              </li>
            ))}
          </ul>
        </li>
        <li className="my-4">
          <span className="font-bold block mb-2 underline">Posts</span>
          <ul className="list-none pl-4 text-left inline-block">
            {sitemapData.posts.map((post) => (
              <li key={post.slug} className="my-2">
                <a href={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`} className="text-blue-500 no-underline hover:underline">{post.slug}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;
