"use client"

import{ useState, useEffect } from 'react'

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  // Add delete handler function
  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`http://88.222.215.48:3001/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Update the UI by removing the deleted course
        setCourses(courses.filter(course => course._id !== courseId));
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  useEffect(() => {
    // Add your fetch logic here
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://88.222.215.48:3001/api/courses'); // Adjust the API endpoint
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">All Courses</h1>
    
    {/* Changed shadow-md to shadow-lg and adjusted overflow handling */}
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Adjusted padding for better mobile display */}
            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author Name</th>
            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(courses) ? (
            courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                {/* Adjusted cell padding for better mobile display */}
                <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{course.author}</td>
                <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{course.title}</td>
                <td className="px-2 sm:px-4 py-3 text-sm text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-4 py-3 text-sm text-gray-500">
                  {course.image ? (
                    <img 
                      src={course.image} 
                      className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg" // Adjusted image size for mobile
                      alt={course.title}
                    />
                  ) : (
                    <span className="text-gray-400">No image available</span>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-3 text-sm">
                  <button 
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                No Courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default CourseList