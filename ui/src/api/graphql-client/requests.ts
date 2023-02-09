import LoadObject from "../../loadObject";

export interface Payload {
	query: string,
	variables?: object
}

export async function postRequest(
	endpoint: string,
	payload: Payload
): Promise<LoadObject<any>> {
	const options: RequestInit = {
		method: "POST",		
		headers: {
			"Content-Type": "application/json",
			"pragma": "no-cache",
			"cache-control": "no-cache"
		},
		redirect: "follow",
		referrer: "no-referrer",
		body: JSON.stringify(payload)
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

		const result = await response.json();

		return LoadObject.fromValue(result.data);
	} catch (error) {
		return LoadObject.fromError(new Error(JSON.stringify(error || '')));
	}
}