"use client";

import { LinkIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

// export default function Header({ activeTab, setActiveTab }) {
//   const { user, logout } = useAuth();
//   //   const router = useRouter();

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//   };

//   const handleLogin = () => {
//     // router.push("/login");
//     navigate("/login");
//   };

//   return (
//     <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl p-4 shadow-sm">
//       <div className="flex items-center">
//         <div className="flex items-center gap-1 text-xl font-bold text-purple-600">
//           <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
//             <span className="text-white">d</span>
//           </div>
//           <span>devlinks</span>
//         </div>
//       </div>

//       <div className="flex bg-[#FAFAFA] rounded-lg p-1">
//         <button
//           onClick={() => setActiveTab("links")}
//           className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
//             activeTab === "links"
//               ? "bg-purple-600 text-white"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <LinkIcon size={20} />
//           <span className="hidden sm:inline">Links</span>
//         </button>
//         <button
//           onClick={() => setActiveTab("profile")}
//           className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
//             activeTab === "profile"
//               ? "bg-purple-600 text-white"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <User size={20} />
//           <span className="hidden sm:inline">Profile Details</span>
//         </button>
//       </div>

//       <div className="flex gap-2">
//         {user ? (
//           <>
//             <button
//               onClick={handleLogout}
//               className="border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
//             >
//               Logout
//             </button>
//             <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
//               Preview
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={handleLogin}
//             className="border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </header>
//   );
// }
export default function Header({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center">
        <div className="flex items-center gap-1 text-xl font-bold text-purple-600">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white">d</span>
          </div>
          <span>devlinks</span>
        </div>
      </div>

      <div className="flex bg-[#FAFAFA] rounded-lg p-1">
        <button
          onClick={() => setActiveTab("links")}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
            activeTab === "links"
              ? "bg-purple-600 text-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <LinkIcon size={20} />
          <span className="hidden sm:inline">Links</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
            activeTab === "profile"
              ? "bg-purple-600 text-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <User size={20} />
          <span className="hidden sm:inline">Profile Details</span>
        </button>
      </div>

      <div className="flex gap-2">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Logout
            </button>
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Preview
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
