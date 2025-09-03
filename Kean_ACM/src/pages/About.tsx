import React from "react";
import { Linkedin, Users, Target, Award, Calendar } from "lucide-react";

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
  const boardMembers: BoardMember[] = [
    {
      name: "Maryam Ahmed",
      position: "President",
      major: "Computer Science",
      year: "Junior",
      bio: "Passionate about competitive programming and machine learning. Led the team to victory in 3 regional programming contests.",
      linkedin: "linkedin.com/in/maryam-ahmed-555813241",
      image:
        "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Anthony Bayate",
      position: "Vice President",
      major: "Software Engineering",
      year: "Junior",
      bio: "Full-stack developer with expertise in React and Node.js. Organizes our web development workshops and hackathons.",
      linkedin: "linkedin.com/in/abayate",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Luis Miguel Velazquez Rodriguez",
      position: "Secretary",
      major: "Computer Science",
      year: "Sophomore",
      bio: "AI enthusiast and research assistant. Coordinates our machine learning study groups and guest speaker events.",
      linkedin: "https://www.linkedin.com/in/luismvelazquezrodriguez/",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Muhammed Elhowary",
      position: "Treasurer",
      major: "Computer Science",
      year: "Junior",
      bio: "Cybersecurity specialist and finance manager. Ensures our events are well-funded and manages club partnerships.",

      linkedin: "linkedin.com/in/muhammed-elhowary-a738b42a4",

      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Karanpreet Singh",
      position: "Web Developer",
      major: "Computer Science",
      year: "Senior",
      bio: "Event planning expert with a passion for bringing the CS community together. Organizes our largest workshops and competitions.",
      linkedin: "linkedin.com/in/karanpreet-singh-1381822a0",
      image:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Noah Mea ",
      position: "Public Relation",
      major: "Computer Science",
      year: "Sophomore",
      bio: "Connects ACM with industry professionals and alumni. Manages our mentorship program and career development initiatives.",
      linkedin: "linkedin.com/in/noah-mea",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Skyler LaFisca",
      position: "Social Media Manager",
      major: "Computer Science",
      year: "Sophomore",
      bio: "Connects ACM with industry professionals and alumni. Manages our mentorship program and career development initiatives.",
      linkedin: "linkedin.com/in/skyler-lafisca-b2b147216",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
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
                        href={member.linkedin}
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
            ))}
          </div>
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
