import { NextApiResponse } from "next";

import { ApiRequest, Context } from "./types";

// biome-ignore lint/suspicious/noExplicitAny: FIXME may have to be here?
export const parseContextHandler = (handler: (params: any) => unknown) => {
  return async (req: ApiRequest, res: NextApiResponse) => {
    const { url, method, body, params, query, headers } = req;

    const result = await handler(
      {
        url,
        method,
        body,
        params,
        query,
        headers,
        $request: req,
      } satisfies Context,
    );

    if (!result) { return res.status(204).end(); }

    res.status(method === "POST" ? 201 : 200).json(result);
  };
};
