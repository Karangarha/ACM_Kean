import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Users, Trophy, BookOpen, Cpu } from "lucide-react";
import EventCarousel from "../components/EventCarousel";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl font-mono text-cyan-400">
            {"{ }"}
          </div>
          <div className="absolute top-32 right-20 text-4xl font-mono text-blue-400">
            {"</>"}
          </div>
          <div className="absolute bottom-20 left-1/4 text-5xl font-mono text-purple-400">
            {"[]"}
          </div>
          <div className="absolute bottom-32 right-10 text-3xl font-mono text-green-400">
            {"()"}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ACM Club
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Empowering computer science students through coding competitions,
              workshops, and tech talks
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/events"
                className="group bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:shadow-xl transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
              >
                <span>View Events</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                to="/join"
                className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:cursor-pointer"
              >
                <span>Join Us</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Code2 className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">25+</div>
                <div className="text-blue-100">Workshops</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-blue-100">Active Members</div>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-blue-100">Competitions</div>
              </div>
              <div className="text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-100">Tech Talks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Carousel */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <EventCarousel />
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ACM Club is dedicated to advancing computing as a science and
              profession
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-shadow duration-300">
              <Code2 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Coding Workshops
              </h3>
              <p className="text-gray-600">
                Learn programming languages, frameworks, and best practices
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-shadow duration-300">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Competitions
              </h3>
              <p className="text-gray-600">
                Participate in programming contests and hackathons
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow duration-300">
              <Cpu className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tech Talks
              </h3>
              <p className="text-gray-600">
                Industry experts share insights on emerging technologies
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow duration-300">
              <Users className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Networking
              </h3>
              <p className="text-gray-600">
                Connect with peers, alumni, and industry professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Level Up Your CS Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join fellow computer science students in building the future of
            technology
          </p>
          <Link
            to="/events"
            className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl space-x-2"
          >
            <span>Explore Events</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
