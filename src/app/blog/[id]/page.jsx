"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setIsLoading(true);
        
        if (!id || id.length !== 24) {
          toast.error('Invalid blog ID');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Blog post not found');
          } else {
            toast.error('Failed to load blog details');
          }
          return;
        }

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        toast.error('Failed to load blog details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse text-center">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <div className="flex items-center text-gray-600 mb-8">
        <span>By {blog.author}</span>
        <span className="mx-2">•</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700">{blog.content}</p>
      </div>
    </div>
  );
}