export default function EmptyState() {
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
            d="M50 35V65M35 50H65"
            stroke="#633CFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2">Let's get you started</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Use the "Add new link" button to get started. Once you have more than
        one link, you can reorder and edit them. We're here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
}
