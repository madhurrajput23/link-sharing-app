// "use client";

// import { useState, useEffect } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";
// import { useAuth } from "../context/auth-context";
// import MobileMockup from "../components/MobileMockup";
// import Header from "../components/Header";
// import LinkForm from "../components/LinkForm";
// import LinkList from "../components/LinkItem";
// import EmptyState from "../components/EmptyState";
// import LoginPrompt from "../components/LoginPrompt";

// // Multi-backend setup with a simpler approach
// const DndProviderWithBackend = ({ children }) => {
//   const [isTouchDevice, setIsTouchDevice] = useState(false);

//   useEffect(() => {
//     // Check if it's a touch device
//     setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
//   }, []);

//   // Use the appropriate backend based on device type
//   const backend = isTouchDevice ? TouchBackend : HTML5Backend;

//   return <DndProvider backend={backend}>{children}</DndProvider>;
// };

// export default function Home() {
//   const [links, setLinks] = useState([]);
//   const [activeTab, setActiveTab] = useState("links");
//   const [editingLink, setEditingLink] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     // Load links from localStorage based on user
//     if (user) {
//       const savedLinks = localStorage.getItem(`links_${user.id}`);
//       if (savedLinks) {
//         setLinks(JSON.parse(savedLinks));
//       }
//     } else {
//       setLinks([]);
//     }
//   }, [user]);

//   // Save links to localStorage whenever they change
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`links_${user.id}`, JSON.stringify(links));
//     }
//   }, [links, user]);

//   const addLink = (newLink) => {
//     setLinks([...links, { ...newLink, id: Date.now().toString() }]);
//     setEditingLink(null);
//   };

//   const updateLink = (id, updatedLink) => {
//     setLinks(
//       links.map((link) => (link.id === id ? { ...updatedLink, id } : link))
//     );
//     setEditingLink(null);
//   };

//   const removeLink = (id) => {
//     setLinks(links.filter((link) => link.id !== id));
//   };

//   const moveLink = (dragIndex, hoverIndex) => {
//     const newLinks = [...links];
//     const draggedLink = newLinks[dragIndex];
//     newLinks.splice(dragIndex, 1);
//     newLinks.splice(hoverIndex, 0, draggedLink);
//     setLinks(newLinks);
//   };

//   const startEditing = (link) => {
//     setEditingLink(link);
//   };

//   return (
//     <main className="min-h-screen bg-white">
//       <DndProviderWithBackend>
//         <div className="container mx-auto px-4 py-4 max-w-6xl">
//           <Header activeTab={activeTab} setActiveTab={setActiveTab} />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//             <div className="hidden lg:flex justify-center items-start pt-8 bg-[#FAFAFA] rounded-xl">
//               <MobileMockup links={links} user={user} />
//             </div>

//             <div className="bg-[#FAFAFA] rounded-xl p-6">
//               {!user ? (
//                 <LoginPrompt />
//               ) : activeTab === "links" ? (
//                 <>
//                   <h2 className="text-2xl font-bold mb-2">
//                     Customize your links
//                   </h2>
//                   <p className="text-gray-500 mb-6">
//                     Add/edit/remove links below and then share all your profiles
//                     with the world!
//                   </p>

//                   <LinkForm
//                     addLink={addLink}
//                     editingLink={editingLink}
//                     updateLink={updateLink}
//                     cancelEdit={() => setEditingLink(null)}
//                   />

//                   {links.length > 0 ? (
//                     <LinkList
//                       links={links}
//                       updateLink={updateLink}
//                       removeLink={removeLink}
//                       moveLink={moveLink}
//                       startEditing={startEditing}
//                     />
//                   ) : (
//                     <EmptyState />
//                   )}
//                 </>
//               ) : (
//                 <div className="p-4">
//                   <h2 className="text-2xl font-bold mb-2">Profile Details</h2>
//                   <p className="text-gray-500 mb-6">
//                     Add your details to create a personal touch to your profile.
//                   </p>
//                   {/* Profile details form would go here */}
//                   <div className="bg-white rounded-lg p-8 flex items-center justify-center">
//                     <p className="text-gray-500">
//                       Profile details coming soon!
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </DndProviderWithBackend>
//     </main>
//   );
// }

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useAuth } from "../context/auth-context";
import MobileMockup from "../components/MobileMockup";
import Header from "../components/Header";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkItem";
import EmptyState from "../components/EmptyState";
import LoginPrompt from "../components/LoginPrompt";

// Multi-backend setup with a simpler approach
const DndProviderWithBackend = ({ children }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Use the appropriate backend based on device type
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

  return <DndProvider backend={backend}>{children}</DndProvider>;
};

export default function Home() {
  const [links, setLinks] = useState([]);
  const [activeTab, setActiveTab] = useState("links");
  const [editingLink, setEditingLink] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Load links from localStorage based on user
    if (user) {
      const savedLinks = localStorage.getItem(`links_${user.id}`);
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } else {
      setLinks([]);
    }
  }, [user]);

  // Save links to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`links_${user.id}`, JSON.stringify(links));
    }
  }, [links, user]);

  const addLink = (newLink) => {
    setLinks([...links, { ...newLink, id: Date.now().toString() }]);
    setEditingLink(null);
  };

  const updateLink = (id, updatedLink) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...updatedLink, id } : link))
    );
    setEditingLink(null);
  };

  const removeLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const moveLink = (dragIndex, hoverIndex) => {
    const newLinks = [...links];
    const draggedLink = newLinks[dragIndex];
    newLinks.splice(dragIndex, 1);
    newLinks.splice(hoverIndex, 0, draggedLink);
    setLinks(newLinks);
  };

  const startEditing = (link) => {
    setEditingLink(link);
  };

  return (
    <main className="min-h-screen bg-white">
      <DndProviderWithBackend>
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="hidden lg:flex justify-center items-start pt-8 bg-[#FAFAFA] rounded-xl">
              <MobileMockup links={links} user={user} />
            </div>

            <div className="bg-[#FAFAFA] rounded-xl p-6">
              {!user ? (
                <LoginPrompt />
              ) : activeTab === "links" ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">
                    Customize your links
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Add/edit/remove links below and then share all your profiles
                    with the world!
                  </p>

                  <LinkForm
                    addLink={addLink}
                    editingLink={editingLink}
                    updateLink={updateLink}
                    cancelEdit={() => setEditingLink(null)}
                  />

                  {links.length > 0 ? (
                    <LinkList
                      links={links}
                      updateLink={updateLink}
                      removeLink={removeLink}
                      moveLink={moveLink}
                      startEditing={startEditing}
                    />
                  ) : (
                    <EmptyState />
                  )}
                </>
              ) : (
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">Profile Details</h2>
                  <p className="text-gray-500 mb-6">
                    Add your details to create a personal touch to your profile.
                  </p>
                  {/* Profile details form would go here */}
                  <div className="bg-white rounded-lg p-8 flex items-center justify-center">
                    <p className="text-gray-500">
                      Profile details coming soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DndProviderWithBackend>
    </main>
  );
}
