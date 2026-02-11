import React, { useEffect, useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import EventCard from "../components/EventCard";
import { Event, Profile } from "../types";
import { useAuth } from "../context/AuthContext";
import CreateEventModal from "../components/CreateEventModal";
import EditEventModal from "../components/EditEventModal";

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { user } = useAuth();

  const fetchEvents = () => {
    fetch(import.meta.env.VITE_API_URI + "/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEventsData(data);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = async (event: Event) => {
    if (!window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}/api/events/${event._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        fetchEvents();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const categories = [
    "All",
    ...new Set(eventsData.map((event) => event.category)),
  ];

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isExecutive =
    user?.memberId &&
    typeof user.memberId === "object" &&
    (user.memberId as Profile).Member === "Executive Board";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ACM Events & Workshops
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your computer science skills through our workshops,
            competitions, and tech talks
          </p>
          {isExecutive && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Event
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category} Category
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredEvents.length} of {eventsData.length} events
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isExecutive={!!isExecutive}
                onEdit={(e) => setEditingEvent(e)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={fetchEvents}
      />

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          onEventUpdated={fetchEvents}
        />
      )}
    </div>
  );
};

export default Events;
