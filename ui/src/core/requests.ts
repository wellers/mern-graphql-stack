import LoadObject from "../loadObject";

type SerialisablePayload = { toJSON(): string };

export async function postRequest(
	endpoint: string,
	payload: SerialisablePayload
): Promise<LoadObject<any>> {
	const options: RequestInit = {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrer: 'no-referrer',
		body: JSON.stringify(payload.toJSON())
	};

	try {
		const response = await fetch(endpoint, options);
		let error = '';

		if (!response.ok && response.status) {
			switch (response.status) {
				case 404:
					error = 'Resource not found';
					break;
				case 500:
					error = 'An error has occurred';
					break;
				default:
					error = 'An unexpected error occurred';
			}
		}

		if (error.length > 0) {
			throw error;
		}

		const json = await response.json();

		return LoadObject.fromValue(json);
	} catch (error) {
		return LoadObject.fromError(new Error(JSON.stringify(error || '')));
	}
}