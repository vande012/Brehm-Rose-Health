import { sitemapQuery } from '../../../sanity/lib/queries';
import { client } from '@/sanity/lib/client';

const Sitemap = async () => {
  const sitemapData = await client.fetch(sitemapQuery);

  return (
    <div className="text-center font-sans mt-4">
      <h1 className="text-4xl mb-4">Sitemap</h1>
  
      {/* Homepage link centered */}
      <div className="my-4">
        <a
          href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
          className="text-blue-500 no-underline hover:underline text-2xl block mb-4"
        >
          Home
        </a>
      </div>
  
      {/* Pages and Posts in two columns */}
      <div className="grid grid-cols-2 gap-8 ">
        {/* Pages column */}
        <div className="text-center">
          <span className="font-bold block mb-2 underline">Pages</span>
          <ul className="list-none pl-4">
            {sitemapData.pages.map((page) => (
              <li key={page.slug} className="my-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}`}
                  className="text-blue-500 no-underline hover:underline"
                >
                  {page.slug}
                </a>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Posts column */}
        <div className="text-center">
          <span className="font-bold block mb-2 underline">Posts</span>
          <ul className="list-none pl-4">
            {sitemapData.posts.map((post) => (
              <li key={post.slug} className="my-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`}
                  className="text-blue-500 no-underline hover:underline"
                >
                  {post.slug}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
