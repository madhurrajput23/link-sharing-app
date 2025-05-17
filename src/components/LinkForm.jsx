"use client";

import { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";

const platforms = [
  { name: "GitHub", color: "bg-black", pattern: "github.com" },
  { name: "Twitter", color: "bg-sky-500", pattern: "twitter.com" },
  { name: "LinkedIn", color: "bg-blue-700", pattern: "linkedin.com" },
  { name: "YouTube", color: "bg-red-600", pattern: "youtube.com" },
  { name: "Facebook", color: "bg-blue-600", pattern: "facebook.com" },
  { name: "Twitch", color: "bg-purple-600", pattern: "twitch.tv" },
  { name: "Dev.to", color: "bg-black", pattern: "dev.to" },
  { name: "CodePen", color: "bg-black", pattern: "codepen.io" },
  { name: "freeCodeCamp", color: "bg-green-600", pattern: "freecodecamp.org" },
  { name: "GitLab", color: "bg-orange-600", pattern: "gitlab.com" },
  { name: "Hashnode", color: "bg-blue-600", pattern: "hashnode.com" },
  {
    name: "Stack Overflow",
    color: "bg-orange-500",
    pattern: "stackoverflow.com",
  },
  { name: "Custom URL", color: "bg-gray-500", pattern: "" },
];

export default function LinkForm({
  addLink,
  editingLink,
  updateLink,
  cancelEdit,
}) {
  const [url, setUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Set form values when editing an existing link
  useEffect(() => {
    if (editingLink) {
      setUrl(editingLink.url);
      setSelectedPlatform(editingLink.platform);
      setIsEditing(true);
    } else {
      setUrl("");
      setSelectedPlatform(platforms[0]);
      setIsEditing(false);
    }
  }, [editingLink]);

  const validateUrl = (url) => {
    if (!url) return "Please enter a URL";

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    try {
      new URL(url);

      // Check if URL matches the selected platform pattern (except for Custom URL)
      if (selectedPlatform.pattern && !url.includes(selectedPlatform.pattern)) {
        return `This doesn't look like a valid ${selectedPlatform.name} URL`;
      }

      return "";
    } catch (e) {
      console.error(e);
      return "Please enter a valid URL";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    let formattedUrl = url;
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    if (isEditing && editingLink) {
      updateLink(editingLink.id, {
        ...editingLink,
        url: formattedUrl,
        platform: selectedPlatform,
      });
    } else {
      addLink({
        url: formattedUrl,
        platform: selectedPlatform,
      });
    }

    // Reset form
    setUrl("");
    setSelectedPlatform(platforms[0]);
    setError("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUrl("");
    setSelectedPlatform(platforms[0]);
    setError("");
    setIsEditing(false);
    if (cancelEdit) cancelEdit();
  };

  return (
    <div className="mb-6">
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-white border border-purple-600 text-purple-600 rounded-lg py-3 px-4 mb-6 flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors"
        >
          <PlusIcon size={20} />
          Add new link
        </button>
      )}

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-5 mb-6 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">
              {editingLink ? "Edit Link" : "New Link"}
            </h3>
            {editingLink && (
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-500 hover:text-red-500"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platform
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full ${selectedPlatform.color}`}
                  ></div>
                  <span>{selectedPlatform.name}</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {platforms.map((platform) => (
                    <button
                      key={platform.name}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => {
                        setSelectedPlatform(platform);
                        setShowDropdown(false);
                      }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full ${platform.color}`}
                      ></div>
                      <span>{platform.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder="e.g. https://www.github.com/username"
                className={`w-full border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-ellipsis overflow-hidden`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white rounded-lg py-2 px-4 flex items-center gap-2 hover:bg-purple-700 transition-colors"
            >
              {editingLink ? "Save" : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
