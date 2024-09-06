import { sitemapQuery } from '../../sanity/lib/queries';
import { client } from '@/sanity/lib/client'

export default async function handler(req, res) {
  const data = await client.fetch(sitemapQuery);

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_SITE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${data.pages
        .map(
          (page) => `
        <url>
          <loc>${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
      ${data.posts
        .map(
          (post) => `
        <url>
          <loc>${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
