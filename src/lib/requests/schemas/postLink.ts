import { PUB_MAX_LENGTH, PUB_MIN_LENGTH } from "$env/static/public";
import { z } from "zod";

const MIN_LENGTH = Number.parseInt(PUB_MIN_LENGTH);
const MAX_LENGTH = Number.parseInt(PUB_MAX_LENGTH);

export default z.object({
	longLink: z.string(),
	customLink: z.string().optional(),
	length: z.number()
		.gte(MIN_LENGTH)
		.lte(MAX_LENGTH)
		.default(Math.floor((MIN_LENGTH + MAX_LENGTH) / 2)),
});
