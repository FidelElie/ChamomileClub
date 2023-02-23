import { XataClient } from "@thechamomileclub/database";
import { singleton } from "tsyringe";

@singleton()
export class DatabaseService {
	constructor(readonly client: XataClient) {}
}
