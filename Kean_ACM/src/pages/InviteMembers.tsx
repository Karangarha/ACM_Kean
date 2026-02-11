import React, { useState, useEffect } from "react";
import { Mail, Send, Copy, Check, Loader2, Trash2, Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Profile } from "../types";
import EditProfileModal from "../components/EditProfileModal";

export interface Invite {
  _id: string;
  email: string;
  name: string;
  position: string;
  memberType: "Executive Board" | "General Member";
  token: string;
  isUsed: boolean;
  createdAt: string;
}

const InviteMembers: React.FC = () => {
  const { user } = useAuth();
  const [invites, setInvites] = useState<Invite[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    position: "Member",
    memberType: "General Member",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const positions = [
    "President",
    "Vice President",
    "Treasurer",
    "Secretary",
    "Public Relations Officer",
    "Web Developer",
    "Social Media Manager",
    "Member",
  ];

  const fetchInvites = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}/api/invites`,
        {
          credentials: "include",
        },
      );
      if (response.ok) {
        const data = await response.json();
        setInvites(data);
      }
    } catch (err) {
      console.error("Failed to fetch invites", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}/api/profiles`,
        {
          credentials: "include",
        },
      );
      if (response.ok) {
        setProfiles(await response.json());
      }
    } catch (err) {
      console.error("Failed to fetch profiles", err);
    }
  };

  useEffect(() => {
    fetchInvites();
    fetchProfiles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}/api/invites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create invite");
      }

      setSuccess("Invite created successfully!");
      setFormData({
        email: "",
        name: "",
        position: "Member",
        memberType: "General Member",
      });
      fetchInvites();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (token: string, id: string) => {
    const inviteLink = `${window.location.origin}/register?token=${token}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteInvite = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invite?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}/api/invites/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        setInvites((prev) => prev.filter((invite) => invite._id !== id));
      } else {
        throw new Error("Failed to delete invite");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete invite");
    }
  };

  // Only allow Web Developer to access correctly
  const isWebDev =
    user?.memberId &&
    typeof user.memberId === "object" &&
    (user.memberId as Profile).position === "Web Developer";

  if (!isWebDev) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">
            You must be the Web Developer to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Left Column: Create Invite Form */}
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0 mb-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create Invite
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Generate a registration link for a new member.
              </p>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {success && (
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-green-700">{success}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="memberType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Member Type
                        </label>
                        <select
                          id="memberType"
                          name="memberType"
                          value={formData.memberType}
                          onChange={handleChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        >
                          <option value="General Member">General Member</option>
                          <option value="Executive Board">
                            Executive Board
                          </option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Position
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        >
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      disabled={creating}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                    >
                      {creating ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Send className="-ml-1 mr-2 h-4 w-4" />
                          Generate Invite
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Invite List */}
          <div className="mt-10 md:mt-0 md:col-span-2">
            <div className="px-4 sm:px-0 mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Active Invites
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Manage text and existing invitations.
                </p>
              </div>
              <button
                onClick={fetchInvites}
                className="text-cyan-600 hover:text-cyan-800 text-sm font-medium"
              >
                Refresh List
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-8 flex justify-center">
                    <Loader2 className="animate-spin h-8 w-8 text-cyan-600" />
                  </div>
                ) : invites.length === 0 ? (
                  <li className="px-6 py-12 text-center text-gray-500">
                    No active invites found.
                  </li>
                ) : (
                  invites.map((invite) => (
                    <li key={invite._id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <p className="text-sm font-medium text-cyan-600 truncate">
                              {invite.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {invite.email}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                invite.isUsed
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {invite.isUsed ? "Registered" : "Pending"}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {invite.memberType} - {invite.position}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            {!invite.isUsed && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    copyToClipboard(invite.token, invite._id)
                                  }
                                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                  {copiedId === invite._id ? (
                                    <>
                                      <Check className="-ml-0.5 mr-2 h-3 w-3 text-green-500" />
                                      Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="-ml-0.5 mr-2 h-3 w-3 text-gray-400" />
                                      Copy Link
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => deleteInvite(invite._id)}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                            {invite.isUsed && (
                              <span className="text-gray-400 text-xs italic">
                                Link used
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Manage Members Section */}
        <div className="mt-16 border-t pt-10">
          <div className="px-4 sm:px-0 mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Member Directory
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                View and edit all registered members.
              </p>
            </div>
            <button
              onClick={fetchProfiles}
              className="text-cyan-600 hover:text-cyan-800 text-sm font-medium"
            >
              Refresh Members
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {profiles.length === 0 ? (
                <li className="px-6 py-12 text-center text-gray-500">
                  No members found.
                </li>
              ) : (
                profiles.map((profile) => (
                  <li
                    key={profile._id}
                    className="px-4 py-4 flex items-center justify-between sm:px-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      {profile.image ? (
                        <img
                          src={profile.image}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {profile.name?.charAt(0) || "?"}
                        </div>
                      )}
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          {profile.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {profile.position} • {profile.Member}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingProfile(profile)}
                      className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all"
                      title="Edit Profile"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Modal */}
        {editingProfile && (
          <EditProfileModal
            profile={editingProfile}
            isOpen={!!editingProfile}
            onClose={() => setEditingProfile(null)}
            onUpdate={() => {
              fetchProfiles();
            }}
            canEditRole={true}
          />
        )}
      </div>
    </div>
  );
};

export default InviteMembers;
