import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { UserRolePriorities, UserRolesEnum } from "@thechamomileclub/api";

import { ApiRequestWithAuth, ForbiddenException, UnauthorisedException } from "../server";

export const requireRolesGuard = (requiredRoles: UserRolesEnum[]) => {
  return (req: ApiRequestWithAuth, _: NextApiResponse, next: NextHandler) => {
    const { auth } = req;

    if (!auth?.session || !auth.user) { throw new UnauthorisedException("Session not found"); }

    const { roles } = auth.user;

    const minimumPriority = Math.min(
      ...requiredRoles.map((role) => UserRolePriorities[role]),
    );

    const userHasRequiredRole = roles.some((role) => requiredRoles.includes(role));

    const userHasHigherPriority = roles.some(
      (role) => UserRolePriorities[role] <= minimumPriority,
    );

    if (!userHasRequiredRole && !userHasHigherPriority) {
      throw new ForbiddenException("Session is forbidden");
    }

    next();
  };
};

export const requireAuthGuard = (
  req: ApiRequestWithAuth,
  _: NextApiResponse,
  next: NextHandler,
) => {
  const { auth } = req;

  if (!auth?.session || !auth.user) { throw new UnauthorisedException("Session not found"); }

  next();
};
