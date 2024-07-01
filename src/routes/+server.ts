// replace this: take body as a string and return only a url. other things are in headers.
export async function POST({ fetch, request, setHeaders }) {
	const result = await (await fetch("/api/link", {
		method: "POST",
		body: JSON.stringify({
			longLink: await request.text()
		})
	})).json()

	setHeaders({ "x-modification-token": result.key })
	return new Response(result.shortlink, { status: 201 }) // this must not return the same shortid if the same link is provided.
}

// TODO
export async function DELETE() { }
