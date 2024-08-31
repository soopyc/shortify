export function returnJSON(data: object, statusCode: number = 200) {
	return new Response(JSON.stringify(data), {
		status: statusCode,
		headers: {
			"content-type": "application/json",
		},
	});
}
