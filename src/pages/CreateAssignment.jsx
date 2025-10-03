import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
// import AssignmentTable from '../components/AssignmentTable'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createAssignmentSchema } from '../utils/validators/createAssignmentSchema';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';

// MAIN PAGE: Assignment management
// Flow: App -> CreateAssignment -> [AssignmentTable, Button, Input]
// Manages state and coordinates between all components
const CreateAssignment = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [serverError, setServerError] = useState('')
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false)
  const [assignments, setAssignments] = useState([])
  const [createdAssignments, setCreatedAssignments] = useState([]) // Store created assignments

  // FORM HANDLING: Manages form state, validation, and submission
  const {
    register: createAssignmentRegister,
    handleSubmit: createAssignmentHandle,
    formState: { errors: createAssignmentError },
    reset: resetCreateForm,
  } = useForm({
    resolver: zodResolver(createAssignmentSchema),
  });

  const handleCloseModal = () => {
    setShowCreateAssignmentModal(false);
    resetCreateForm();
    setServerError('');
  };

  // DATA FETCHING: Loads assignments when component mounts
  const fetchAssignment = async () => {
    try {
      const data = {
        url: apis().getAssignment,
      }
      const result = await httpAction(data);
      if (result.success) {
        setAssignments(result.assignments)
      }
    } catch (error) {
      setServerError(error.message || 'Server Error');
      setTimeout(() => {
        setServerError("");
      }, 2000);
    }
  }

  useEffect(() => {
    fetchAssignment();
  }, [])

  // FORM SUBMISSION: Handles assignment creation
  const handleCreateAssignmentSubmit = async (data) => {
    try {
      console.log('Form submitted with data:', data);
      
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("dueDate", data.dueDate);
      formData.append("totalMarks", data.totalMarks);
      formData.append("assignmentFile", data.assignmentFile[0]);

      // Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const values = {
        url: apis().createAssignment,
        method: 'POST',
        body: formData,
      };

      const result = await httpAction(values);

      if (result.success) {
        // Create new assignment object
        const newAssignment = {
          id: Date.now(), // Simple ID generation
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          totalMarks: data.totalMarks,
          fileName: data.assignmentFile[0]?.name || 'No file'
        };

        // Update both states
        setCreatedAssignments(prev => [newAssignment, ...prev]);
        setAssignments(prev => [newAssignment, ...prev]);
        
        setShowCreateAssignmentModal(false);
        setSuccessMessage('Assignment created Successfully!');
        
        console.log('New assignment created:', newAssignment);
        console.log('All assignments:', [...assignments, newAssignment]);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      setServerError(error.message || 'Server Error');
      setTimeout(() => {
        setServerError('');
      }, 2000);
    }
  };

//   const handleEditAssignment = (assignment) => {
//     console.log('Edit assignment:', assignment);
//     alert(`Edit functionality for: ${assignment.title}`);
//   };

//   const handleDeleteAssignment = (id) => {
//     console.log('Delete assignment ID:', id);
//     setAssignments(prev => prev.filter(assignment => assignment.id !== id));
//     setCreatedAssignments(prev => prev.filter(assignment => assignment.id !== id));
//     setSuccessMessage('Assignment deleted successfully!');
//     setTimeout(() => setSuccessMessage(''), 2000);
//   };

  return (
    <div className='flex h-screen bg-gray-100'>
      
      <main className='flex-1 p-6 overflow-auto mt-10 ml-64'>
        <h1 className="text-2xl font-bold mb-4">Assignment Management</h1>

        {/* SUCCESS/ERROR MESSAGES */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {serverError}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-64 px-4 py-2 rounded-lg bg-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
            onClick={() => setShowCreateAssignmentModal(true)}
          >
            Create Assignment
          </button>
        </div>

        {/* ASSIGNMENT TABLE: Displays all assignments */}
        {/* <AssignmentTable 
          assignments={assignments}
          onEdit={handleEditAssignment}
          onDelete={handleDeleteAssignment}
        /> */}

        {/* CREATED ASSIGNMENTS DISPLAY */}
        {createdAssignments.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-green-600">
               Recently Created Assignments (Check Console for Details)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {createdAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-lg">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.description}</p>
                  <div className="flex justify-between text-xs mt-2">
                    <span>Due: {assignment.dueDate}</span>
                    <span>Marks: {assignment.totalMarks}</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">File: {assignment.fileName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CREATE ASSIGNMENT MODAL */}
        {showCreateAssignmentModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
            onClick={handleCloseModal}
          >
            <div className='bg-white p-6 rounded-lg w-96 shadow-lg relative max-h-90vh overflow-y-auto'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl'
              >
                ✕
              </button>
              <h1 className='text-xl font-bold mb-4'>Create New Assignment</h1>

            {/* input form */}
              <form className='space-y-4' onSubmit={createAssignmentHandle(handleCreateAssignmentSubmit)}>
                <div>
                  <Input
                    type='text'
                    placeholder='Enter title'
                    {...createAssignmentRegister('title')}
                  />
                  {createAssignmentError.title && (
                    <p className="text-red-500 text-sm mt-1">{createAssignmentError.title.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type='text'
                    placeholder='Enter description'
                    {...createAssignmentRegister('description')}
                  />
                  {createAssignmentError.description && (
                    <p className="text-red-500 text-sm mt-1">{createAssignmentError.description.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type='date'
                    {...createAssignmentRegister('dueDate')}
                  />
                  {createAssignmentError.dueDate && (
                    <p className="text-red-500 text-sm mt-1">{createAssignmentError.dueDate.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Enter total marks"
                    {...createAssignmentRegister("totalMarks")}
                  />
                  {createAssignmentError.totalMarks && (
                    <p className="text-red-500 text-sm mt-1">{createAssignmentError.totalMarks.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type='file'
                    {...createAssignmentRegister('assignmentFile')}
                  />
                  {createAssignmentError.assignmentFile && (
                    <p className="text-red-500 text-sm mt-1">
                      {createAssignmentError.assignmentFile.message}
                    </p>
                  )}
                </div>

                <Button type='submit'>Create Assignment</Button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CreateAssignment;