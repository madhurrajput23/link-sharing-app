"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { GripVertical, Trash2, Edit } from "lucide-react";

const LinkItem = ({ link, index, moveLink, removeLink, startEditing }) => {
  // Create refs for drag and drop
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "LINK",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "LINK",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveLink(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // Initialize drag and drop refs
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg p-5 mb-4 border border-gray-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="cursor-move p-1 hover:bg-gray-100 rounded">
            <GripVertical size={20} className="text-gray-500" />
          </div>
          <h3 className="font-bold text-gray-700">Link #{index + 1}</h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => startEditing(link)}
            className="text-gray-500 hover:text-purple-600 p-1 hover:bg-gray-100 rounded"
          >
            <Edit size={20} />
          </button>
          <button
            type="button"
            onClick={() => removeLink(link.id)}
            className="text-gray-500 hover:text-red-500 p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Platform
        </label>
        <div className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-left flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full ${link.platform.color}`}></div>
          <span>{link.platform.name}</span>
        </div>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link
        </label>
        <div className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-ellipsis overflow-hidden whitespace-nowrap">
          {link.url}
        </div>
      </div>
    </div>
  );
};

export default function LinkList({
  links,
  removeLink,
  moveLink,
  startEditing,
}) {
  return (
    <div>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          link={link}
          index={index}
          moveLink={moveLink}
          removeLink={removeLink}
          startEditing={startEditing}
        />
      ))}
    </div>
  );
}
