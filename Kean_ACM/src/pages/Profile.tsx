import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Briefcase,
  Award,
  Info,
  Link as LinkIcon,
} from "lucide-react";

import { Profile as ProfileType } from "../types";

import EditProfileModal from "../components/EditProfileModal";

// ... existing code ...

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.memberId) return;

      try {
        const memberIdToCheck =
          typeof user.memberId === "object" ? user.memberId._id : user.memberId;

        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/api/profiles/${memberIdToCheck}`,
          { credentials: "include" },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleProfileUpdate = () => {
    // Re-fetch profile data or just reload
    if (user) {
      window.location.reload();
    }
  };

  if (loading)
    return <div className="text-center py-20">Loading profile...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">Error: {error}</div>;
  if (!profile)
    return <div className="text-center py-20">Profile not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header/Cover */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-32 relative">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              title="Edit Profile"
            >
              {/* Lucide Edit icon component, let's look at imports */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
          </div>

          <div className="px-4 py-5 sm:px-6 relative">
            {/* ... exisitng image code ... */}
            <div className="-mt-16 mb-4">
              {profile && profile.image ? (
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {profile?.name}
            </h1>
            <p className="text-lg text-gray-600">{profile?.position}</p>
          </div>

          {/* ... existing dl code ... properties ... */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {/* Position */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Position
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profile.position}
                </dd>
              </div>

              {/* Membership */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Award className="h-4 w-4" /> Membership
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profile.Member}
                </dd>
              </div>

              {/* Email */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.email}
                </dd>
              </div>

              {/* About */}
              {profile.about && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Info className="h-4 w-4" /> About
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="space-y-1">
                      {profile.about.year && (
                        <p>
                          <span className="font-medium">Year:</span>{" "}
                          {profile.about.year}
                        </p>
                      )}
                      {profile.about.major && (
                        <p>
                          <span className="font-medium">Major:</span>{" "}
                          {profile.about.major}
                        </p>
                      )}
                      {profile.about.minor && (
                        <p>
                          <span className="font-medium">Minor:</span>{" "}
                          {profile.about.minor}
                        </p>
                      )}
                      {profile.about.personal_goals && (
                        <p>
                          <span className="font-medium">Goals:</span>{" "}
                          {profile.about.personal_goals}
                        </p>
                      )}
                    </div>
                  </dd>
                </div>
              )}

              {/* Links - iterate or show specific ones if present */}
              {profile.link && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> Links
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-wrap gap-4">
                    {profile.link.website && (
                      <a
                        href={profile.link.website}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    )}
                    {profile.link.linkedin && (
                      <a
                        href={profile.link.linkedin}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {profile.link.github && (
                      <a
                        href={profile.link.github}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {profile.link.twitter && (
                      <a
                        href={profile.link.twitter}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                    {profile.link.instagram && (
                      <a
                        href={profile.link.instagram}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {profile && (
        <EditProfileModal
          profile={profile}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Profile;
