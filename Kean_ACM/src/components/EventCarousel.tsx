import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "./EventCard";
import { Event } from "../types";

const EventCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [displayEvents, setDisplayEvents] = useState<Event[]>([]);
  const intervalRef = useRef<number | null>(null);

  const Events = displayEvents;

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URI + "/api/events")
      .then((res) => res.json())
      .then((eventsData: Event[]) => {
        const currentDate = new Date();

        const upcoming = eventsData
          .filter((event) => new Date(event.date) > currentDate)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        const past = eventsData
          .filter((event) => new Date(event.date) < currentDate)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

        const selectedEvents = [upcoming[0], upcoming[1], past[0]].filter(
          Boolean,
        );
        setDisplayEvents(selectedEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Events.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Events.length - 1 : prevIndex - 1,
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (Events.length === 0 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === Events.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [Events.length, isPaused]);

  if (Events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No upcoming highlights at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Upcoming Highlights
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't miss these exciting ACM events designed to boost your CS skills
          and career
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Events.map((event) => (
            <div key={event._id} className="w-full flex-shrink-0 px-4">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-cyan-600 scale-110"
                  : "bg-sky-500/20 hover:bg-sky-500/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;
