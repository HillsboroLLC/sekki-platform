import React, { useState } from 'react';
import './Blog.css';
import Topbar from './components/layout/Topbar';
import Footer from './components/layout/Footer';
import FabButton from './components/layout/FabButton';
import BlogHero from './components/sections/BlogHero';
import StatsBar from './components/sections/StatsBar';
import Banner from './components/sections/Banner';
import SearchFilter from './components/sections/SearchFilter';
import CategoryTags from './components/sections/CategoryTags';
import FeaturedArticles from './components/sections/FeaturedArticles';
import TrendingTopics from './components/sections/TrendingTopics';
import LatestInsights from './components/sections/LatestInsights';
import NewsletterSignup from './components/sections/NewsletterSignup';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // Static data; replace with real source or props
  const stats = [
    { number: '500+', label: 'Expert Articles' },
    { number: '50K+', label: 'Monthly Readers' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Fresh Content' },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'validation', label: 'Business Validation' },
    { value: 'strategy', label: 'Strategy & Growth' },
    { value: 'competitive', label: 'Competitive Intelligence' },
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'tools', label: 'Tools & Templates' },
    { value: 'case-studies', label: 'Case Studies' },
  ];

  const tags = categories;
  const trending = [
    'AI Market Analysis', 'Startup Validation', 'Competitive Intelligence',
    'Growth Hacking', 'Market Research', 'Business Strategy',
    'Customer Discovery', 'Product-Market Fit'
  ];

  // TODO: fetch real posts data
  const featuredPosts = [];
  const recentPosts = [];

  return (
    <div>
      <div className="reading-progress" id="reading-progress" />
      <Topbar />
      <BlogHero />
      <StatsBar stats={stats} />
      <Banner />
      <SearchFilter
        onSearch={setSearchTerm}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <CategoryTags tags={tags} selected={category} onSelect={setCategory} />
      <FeaturedArticles posts={featuredPosts} />
      <TrendingTopics topics={trending} onSelect={setSearchTerm} />
      <LatestInsights posts={recentPosts} />
      <NewsletterSignup />
      <Footer />
      <FabButton />
    </div>
  );
}
