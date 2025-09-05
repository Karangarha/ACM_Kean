
import {
  Check,
  Users,
  Calendar,
  Trophy,
  BookOpen,
  Mail,
  Code,
  ExternalLink,
} from "lucide-react";

const JoinUs: React.FC = () => {
  
  const benefits = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "Skill Development",
      description:
        "Access to exclusive workshops, coding bootcamps, and technical training sessions",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Networking",
      description:
        "Connect with industry professionals, alumni, and like-minded peers in CS",
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      title: "Competitions",
      description:
        "Participate in programming contests, hackathons, and technical challenges",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Learning Resources",
      description:
        "Access to study materials, project repositories, and mentorship programs",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Join ACM Club</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Become part of a vibrant community of computer science and
            Information Technology students passionate about technology and
            innovation
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join ACM?
            </h2>
            <p className="text-lg text-gray-600">
              Unlock opportunities for growth, learning, and professional
              development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Membership Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Eligibility
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Currently enrolled student</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>CS, SE, or related major (preferred)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Passion for technology and learning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Commitment to attend events regularly</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Expectations
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Attend at least 2 events per semester</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Participate in group projects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Support fellow members</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Uphold ACM's code of ethics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Apply for Membership
            </h2>
            <div className="text-lg text-white bg-green-500 p-2 px-5 shadow-lg rounded-md transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
              <a
                href="https://kean.campuslabs.com/engage/organization/acm"
                target="_blank"
                className="flex justify-center"
              >
                Join us via Couger Link <ExternalLink size={12} />
              </a>
            </div>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Join Us on Social Media
            </h2>
            <div className="flex justify-center gap-4">
              <a href="https://www.instagram.com/kean.acm/" target="_blank">
                <img
                  src="/instagram.png"
                  alt="instagram"
                  className="w-12 h-12 object-cover object-center transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
                />
              </a>
              <a href="https://discord.com/invite/Gw2ZW3ynEP" target="_blank">
                <img
                  src="/discord.png"
                  alt="discord"
                  className="w-12 h-12 object-cover object-center transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Questions About Membership?
          </h2>
          <p className="text-blue-100 mb-8">
            Our executive board is here to help! Reach out if you have any
            questions about joining ACM Club.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:acm@university.edu"
              className="inline-flex items-center bg-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-400 transition-colors duration-200 space-x-2"
            >
              <Mail className="h-4 w-4" />
              <a href="mailto:acmkeanchapter@kean.edu">
                acmkeanchapter@kean.edu
              </a>
            </a>
            <a
              href="/events"
              className="inline-flex items-center border-2 border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg font-medium hover:bg-cyan-400 hover:text-white transition-all duration-200 space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Attend an Event First</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;
