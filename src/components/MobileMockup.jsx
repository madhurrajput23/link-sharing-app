export default function MobileMockup({ links, user }) {
  return (
    <div className="relative w-[308px] h-[632px] bg-white rounded-[32px] shadow-xl border-[12px] border-black overflow-hidden">
      {/* Phone notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-10"></div>

      {/* Phone content */}
      <div className="h-full overflow-y-auto bg-gray-50 pt-16 pb-8 px-6">
        {/* Profile section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
          <h2 className="text-xl font-bold mb-1">
            {user ? user.name : "Your Name"}
          </h2>
          <p className="text-gray-500 mb-4">
            {user ? user.email : "your.email@example.com"}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.length > 0 ? (
            links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3 px-4 rounded-lg text-white font-medium ${link.platform.color} hover:opacity-90 transition-opacity flex items-center justify-between`}
              >
                <span>{link.platform.name}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.66699 8.00004H13.3337M13.3337 8.00004L8.00033 2.66671M13.3337 8.00004L8.00033 13.3334"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No links added yet</p>
              <p className="text-sm mt-2">Your links will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
