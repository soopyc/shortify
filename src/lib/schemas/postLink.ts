import { PUB_MAX_LENGTH, PUB_MIN_LENGTH } from '$env/static/public';
import { z } from 'zod';

export default z.object({
	longLink: z.string(),
	customLink: z.string().optional(),
	length: z.number()
		.gte(Number.parseInt(PUB_MIN_LENGTH))
		.lte(Number.parseInt(PUB_MAX_LENGTH))
		.default(4)
})
