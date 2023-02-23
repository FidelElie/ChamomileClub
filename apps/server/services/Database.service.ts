import { singleton } from "tsyringe";

import type { XataClient } from "@thechamomileclub/database";

@singleton()
export class DatabaseService {
	constructor(readonly client: XataClient) {}
}
