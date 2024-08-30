// take body as a string and return only a url. other things are in headers.
// essentially operating as a shorthand for the more longwinded api endpoint.
export async function POST({ fetch, request, setHeaders }) {
	const result = await fetch("/api/link", {
		method: "POST",
		body: JSON.stringify({
			longLink: await request.text()
		})
	})
	const finalData = await result.json()

	// check if response is successful
	// if endpoint returns a 3xx something went wrong.
	if (result.status >= 400) {
		return new Response(`Failed to shorten link due to the following error: ${finalData.message}`, { status: result.status })
	}

	setHeaders({ "x-modification-token": finalData.key })
	return new Response(finalData.shortlink, { status: 201 }) // this must not return the same shortid if the same link is provided.
}

// TODO
export async function DELETE() { }
