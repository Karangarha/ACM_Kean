
import { Profile } from "../types";

export const isWebDev = (user: { memberId?: Profile | string } | null): boolean => {
  if (!user || !user.memberId || typeof user.memberId !== "object") return false;
  return (user.memberId as Profile).position === "Web Developer";
};
