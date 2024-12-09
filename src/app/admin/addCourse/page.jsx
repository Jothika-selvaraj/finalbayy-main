'use client';

import axios from 'axios';
import  { useState } from 'react';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const [data, setData] = useState({
    title: '',
    content: '',
    author: '',
    image: null,
  });

  // Handle input field changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(`[DEBUG] Updated field "${name}": ${value}`);
  };

  // Handle image selection and set the file object
  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('[DEBUG] Image file details:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      setData((prev) => ({ ...prev, image: file }));
    }
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!data.title || !data.content || !data.author || !data.image) {
      toast.error('All fields (title, content, author, image) are required');
      console.log('[DEBUG] Validation failed: Missing fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('author', data.author);
    formData.append('image', data.image);

    // Debug FormData contents
    console.log('[DEBUG] Form submission data:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? {
        name: value.name,
        type: value.type,
        size: value.size
      } : value);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/courses', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        },
      });
    
      if (response.status === 201) {
        // Log the entire response to see its structure
        console.log('[DEBUG] Full response:', response);
        console.log('[DEBUG] Response data:', response.data);

        // Check the correct path to the image URL in the response
        const courseData = response.data.course || response.data;
        console.log('[DEBUG] Course data:', courseData);

        // Check for image URL in different possible locations
        const imageUrl = courseData.image || courseData.imageUrl || courseData.imageURL;
        console.log('[DEBUG] Image URL:', imageUrl);
    
        if (!imageUrl) {
          console.warn('[DEBUG] Image URL is missing in response');
        }
    
        toast.success('Course added successfully!');
        setData({ title: '', content: '', author: '', image: null });
      } else {
        toast.error('Error adding course');
        console.error('[DEBUG] Unexpected response:', response);
      }
    } catch (error) {
      console.error('[DEBUG] Error during course submission:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || 'Failed to add course. Please try again.');
    }
  };

  return (
    
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        {/* Image Upload */}
        <p className='mt-4'>Upload Thumbnail</p>
        <label htmlFor="image" className="mt-4 block cursor-pointer">
        <img
          className="mt-4"
          src={data.image ? URL.createObjectURL(data.image) : '/'} 
          alt="Thumbnail"
          width={140}
          height={70}
        />
        </label>
        <input onChange={onImageChange} type="file" id="image" hidden />

        {/* Blog Title */}
        <p className="text-xl mt-4">Course Title</p>
        <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Enter title"
      />

      {/* Blog Content */}
      <p className="text-xl mt-4">Course Description</p>
      <textarea
        name="content"
        onChange={onChangeHandler}
        value={data.content}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Enter content"
        rows={6}
      />

      {/* Blog Author */}
      <p className="text-xl mt-4">Author</p>
      <input
        name="author"
        onChange={onChangeHandler}
        value={data.author}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Enter author name"
      />

      {/* Submit Button */}
      <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
        Add Course
      </button>
      </form>
    
  );
};

export default AddCourse;
