// Connected to: CreateAssignment (used in form submission)
const Button = ({ children, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;