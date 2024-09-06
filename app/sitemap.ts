import type { MetadataRoute } from 'next';
import { sitemapQuery } from '../sanity/lib/queries'; // Adjust the import according to your project structure
import { loadQuery } from '../sanity/loader/loadQuery'; // Adjust the import according to your project structure
import { SitemapResponse } from '@/types'; // Ensure this import is correct based on your project structure
import { loadSitemap } from '../sanity/loader/loadQuery'; 

type SitemapEntry = {
    url: string;
    lastModified?: string | Date;
    changeFrequency?: "yearly" | "monthly" | "weekly" | "always" | "hourly" | "daily" | "never";
    priority?: number;
  };
  
  export default async function sitemap(): Promise<SitemapEntry[]> {
    // Fetch data using the sitemapQuery
    const response = await loadSitemap();
    console.log('Sitemap Response:', response);
    
    // Extract the data from the response
    const homePage = response.data.homePage ? response.data.homePage : null;
    const pages = response.data.pages || [];
    const posts = response.data.posts || [];
    
    // Base URL of your site
    const baseUrl = 'https://yourdomain.com';
    
    // Generate URL for the homepage
    const homePageUrl: SitemapEntry[] = homePage ? [{
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    }] : [];
    
    // Map through pages and posts to generate URLs
    const pageUrls: SitemapEntry[] = pages.map((page: { slug: string }) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
    
    const postUrls: SitemapEntry[] = posts.map((post: { slug: string }) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }));
    
    // Return all URLs, including static ones
    return [
      ...homePageUrl, // Home page
      ...pageUrls, // Dynamic pages
      ...postUrls, // Dynamic posts
    ];
  }
  