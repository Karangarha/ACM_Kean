import React from "react";
import { Linkedin, Users, Target, Award, Calendar } from "lucide-react";
import { Profile } from "../types";

interface BoardMember {
  name: string;
  position: string;
  major: string;
  year: string;
  bio: string;
  linkedin?: string;
  image: string;
}

const About: React.FC = () => {
  const [boardMembers, setBoardMembers] = React.useState<BoardMember[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/api/profiles`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const profiles: Profile[] = await response.json();

        // Filter for Executive Board members and map to BoardMember interface
        const executives = profiles
          .filter((profile: Profile) => profile.Member === "Executive Board")
          .map((profile: Profile) => ({
            name: profile.name,
            position: profile.position,
            major: profile.about?.major || "Computer Science",
            year: profile.about?.year || "Student",
            bio:
              profile.about?.personal_goals ||
              "Dedicated to advancing our CS community through leadership and innovation.",
            linkedin: profile.link?.linkedin || undefined,
            image:
              profile.image ||
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Fallback image
          }));

        // Sort by position hierarchy if needed
        const positionOrder: { [key: string]: number } = {
          President: 1,
          "Vice President": 2,
          Treasurer: 3,
          Secretary: 4,
          "Web Developer": 5,
          "Public Relations Officer": 6,
          "Social Media Manager": 7,
          Member: 8,
        };

        executives.sort((a, b) => {
          return (
            (positionOrder[a.position] || 99) -
            (positionOrder[b.position] || 99)
          );
        });

        setBoardMembers(executives);
      } catch (error) {
        console.error("Error fetching board members:", error);
        // Fallback to empty or keep loading state false
      } finally {
        setLoading(false);
      }
    };

    fetchBoardMembers();
  }, []);

  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Regional Champions",
      description: "1st place in ACM-ICPC Regional Programming Contest 2024",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Growing Community",
      description: "200+ active members across all CS disciplines",
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Industry Partnerships",
      description:
        "Collaborations with Google, Microsoft, and local tech companies",
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: "Regular Events",
      description: "25+ workshops, competitions, and tech talks annually",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About ACM Club
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            The Association for Computing Machinery student chapter at our
            university, dedicated to advancing computing as a science and
            profession
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We strive to create an inclusive community where computer science
              students can learn, grow, and excel in their academic and
              professional journeys. Through workshops, competitions, and
              networking events, we bridge the gap between classroom theory and
              real-world application.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Board Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Executive Board 2024-2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated students leading ACM Club and organizing
              amazing events for our community
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.length > 0 ? (
                boardMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover object-center"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-xl font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="text-cyan-300 font-medium">
                          {member.position}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{member.major}</span> •{" "}
                          {member.year}
                        </p>
                      </div>

                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="flex space-x-3">
                        {member.linkedin && (
                          <a
                            href={`${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors duration-200"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No executive board members found.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                Innovation
              </h3>
              <p className="text-blue-100">
                Embracing cutting-edge technologies and creative problem-solving
                approaches
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                Collaboration
              </h3>
              <p className="text-blue-100">
                Building a supportive community where knowledge sharing drives
                collective growth
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                Excellence
              </h3>
              <p className="text-blue-100">
                Striving for the highest standards in academics, competitions,
                and professional development
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
