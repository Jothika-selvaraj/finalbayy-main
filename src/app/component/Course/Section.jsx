'use client'; // Ensure this component runs on the client

import React, { useEffect, useState } from 'react';

const Section = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Fetch the courses from the API
    const fetchSections = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/courses'); // Adjust endpoint if needed
        if (response.ok) {
          const data = await response.json();
          setSections(data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchSections();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <div
            key={section._id}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? '' : 'md:flex-row-reverse'
            } items-stretch gap-8 max-w-6xl mx-auto`}
          >
            {/* Image Container */}
            <div className="w-full md:w-1/2 flex items-center justify-center ">
              <div className="w-full aspect-[4/3] relative">
                <img
                  src={section.image || 'default-image-path.jpg'}
                  alt={section.title}
                  className="absolute inset-0 w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
            {/* Text Container */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 p-4">
              <h3 className="text-lg font-semibold text-gray-800 uppercase">
                {section.title || 'Uncategorized'}
              </h3>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f14d5d]">
                {section.title}
              </h2>
              <p className="text-gray-600">
                {section.content || 'No description available.'}
              </p>
              <div className="pt-4">
                <button className="bg-blue-500 text-white px-8 py-3 rounded-md shadow hover:bg-blue-600 transition duration-300 w-full md:w-auto">
                  Enroll Today
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">No sections available.</div>
      )}
    </div>
  );
};

export default Section;
