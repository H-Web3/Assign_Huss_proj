// import { FaRegEdit } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";

// // TABLE: Displays assignments in a structured table format
// // Connected to: CreateAssignment (receives assignments data as prop)
// // Flow: CreateAssignment -> AssignmentTable (data flow)
// const AssignmentTable = ({ assignments, onEdit, onDelete }) => {
//   return (
//     <div className='overflow-hidden'>
//       <table className='w-full border-collapse'>
//         <thead className='bg-gray-200 text-left'>
//           <tr>
//             <th className='p-3 border-b'>Title</th>
//             <th className='p-3 border-b'>Assignment</th>
//             <th className='p-3 border-b'>Due Date</th>
//             <th className='p-3 border-b'>Total Marks</th>
//             <th className='p-3 border-b'>Submit</th>
//             <th className='p-3 border-b'>Result</th>
//             <th className='p-3 border-b'>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {assignments.map((assignment) => (
//             <tr key={assignment.id}>
//               <td className='p-3 border-b'>{assignment.title}</td>
//               <td className='p-3 border-b'>{assignment.description}</td>
//               <td className='p-3 border-b'>{assignment.dueDate}</td>
//               <td className="p-3 border-b">{assignment.totalMarks}</td>
//               <td className="p-3 border-b">Not Submitted</td>
//               <td className="p-3 border-b">Pending</td>
//               <td className="p-3 border-b">
//                 <div className="flex items-center gap-3">
//                   <button 
//                     className="text-blue-500 hover:text-blue-700 cursor-pointer"
//                     onClick={() => onEdit(assignment)}
//                   >
//                     <FaRegEdit size={18} />
//                   </button>
//                   <button
//                     className="text-red-500 hover:text-red-700 cursor-pointer"
//                     onClick={() => onDelete(assignment.id)}
//                   >
//                     <MdDeleteOutline size={18} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssignmentTable;