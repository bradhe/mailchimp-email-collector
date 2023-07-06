// Create clients and set shared const values outside of the handler.
import request from "superagent";

const MAILCHIMP_URL = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}`

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const PutEmailHandler = async (event) => {
    console.info('received:', event);

    if (!event.body) {
		console.error('invalid request received. no body.');

		const err = {
		    message: 'include a email address in the body',
		};

		return {
		    statusCode: 400,
		    body: JSON.stringify(err),
		};
    }

    const body = JSON.parse(event.body);
    const { email } = body;

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
			}
		],
	};

	return request.post(MAILCHIMP_URL)
		.set('Content-Type', 'application/json')
		.set('Authorization', `auth ${process.env.MAILCHIMP_API_KEY}`)
		.send(data)
		.then((res) => {
			return {
				statusCode: 200,
				body: JSON.stringify(res)
			};
		})
		.catch((err) => {
			return {
				statusCode: 500,
				body: JSON.stringify(err)
			};
		});
};
