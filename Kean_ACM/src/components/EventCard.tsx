import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

import { Event } from "../types";

interface EventCardProps {
  event: Event;
  className?: string;
  isExecutive?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  className = "",
  isExecutive = false,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // added weekday for clarity
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const isPast = new Date(event.date) < new Date();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Programming: "bg-blue-100 text-blue-800",
      "AI/ML": "bg-purple-100 text-purple-800",
      "Web Dev": "bg-emerald-100 text-emerald-800",
      Career: "bg-orange-100 text-orange-800",
      Security: "bg-red-100 text-red-800",
      "Open Source": "bg-green-100 text-green-800",
      "Mobile Dev": "bg-indigo-100 text-indigo-800",
      Competition: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {event.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 flex space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              event.category,
            )}`}
          >
            {event.category}
          </span>
          {isExecutive && onEdit && (
            <button
              onClick={() => onEdit(event)}
              className="bg-white/80 hover:bg-white text-gray-700 p-1 rounded-full backdrop-blur-sm transition-colors shadow-sm"
              title="Edit Event"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-edit-2"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          )}
          {isExecutive && onDelete && (
            <button
              onClick={() => onDelete(event)}
              className="bg-white/80 hover:bg-white text-red-600 p-1 rounded-full backdrop-blur-sm transition-colors shadow-sm ml-2"
              title="Delete Event"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-cyan-600" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-cyan-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-cyan-600" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mt-6">
          {isPast ? (
            <a href={event.link || "#"} target="_blank">
              <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium ">
                Event Ended
              </button>
            </a>
          ) : (
            <a
              href={event.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105">
                RSVP
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
