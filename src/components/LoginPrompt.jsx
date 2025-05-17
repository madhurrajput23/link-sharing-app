import { useNavigate } from "react-router-dom";

export default function LoginPrompt() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center text-center border border-gray-200">
      <div className="w-32 h-32 mb-6">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="50" fill="#EFEBFF" />
          <path
            d="M65 50H35M35 50L45 40M35 50L45 60"
            stroke="#633CFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2">Login to manage your links</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        You need to be logged in to create and manage your links. Login or
        create an account to get started.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  );
}
