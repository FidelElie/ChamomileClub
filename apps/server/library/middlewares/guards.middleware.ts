import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { UserRolePriorities, UserRolesEnum } from "@thechamomileclub/api";

import { ApiRequestWithAuth, unauthorisedResponse } from "../server";

export const requireRolesGuard = (requiredRoles: UserRolesEnum[]) => {
  return (req: ApiRequestWithAuth, res: NextApiResponse, next: NextHandler) => {
    const { auth } = req;

    if (!auth?.session || !auth.user) {
      return unauthorisedResponse(res);
    }

    const { roles } = auth.user;

    const minimumPriority = Math.min(
      ...requiredRoles.map((role) => UserRolePriorities[role]),
    );

    const userHasRequiredRole = roles.some((role) =>
      requiredRoles.includes(role),
    );

    const userHasHigherPriority = roles.some(
      (role) => UserRolePriorities[role] <= minimumPriority,
    );

    if (!userHasRequiredRole && !userHasHigherPriority) {
      return unauthorisedResponse(res);
    }

    next();
  };
};

export const requireAuthGuard = (
  req: ApiRequestWithAuth,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const { auth } = req;

  if (!auth?.session || !auth.user) {
    return unauthorisedResponse(res);
  }

  next();
};
