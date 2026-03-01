import React from 'react';
import PostCard from '../ui/PostCard';
import './FeaturedArticles.css';

export default function FeaturedArticles({ posts }) {
  return (
    <section className="featured-articles" id="featured">
      <div className="section-header">
        <h2 className="section-title">Featured Articles</h2>
        <p className="section-subtitle">Our most popular and impactful content to accelerate your business growth</p>
      </div>
      <div className="featured-grid">
        {posts.map(post => (
          <PostCard
            key={post.id}
            image={post.image}
            category={post.category}
            readingTime={post.readingTime}
            author={post.author}
            date={post.date}
            title={post.title}
            excerpt={post.excerpt}
            onReadMore={() => window.location.assign(post.url)}
          />
        ))}
      </div>
    </section>
  );
}
