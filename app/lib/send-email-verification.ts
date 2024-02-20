import { type EmailVerificationRequest } from "@prisma/client";
import { prisma } from "./prisma.server";
import { randomStr } from "./random-str";
// import {send} from "./mail.server";
import Mailgun from "mailgun.js"
import FormData from "form-data"
// import {json} from "@remix-run/node";

const mailgun=new Mailgun(FormData)
const DOMAIN=process.env.MAILGUN_DOMAIN || "";
const mg=mailgun.client({username:'api',key:"ea668948cc11ccd23470423aa8955b60-408f32f3-654db3a6"})


async function sendEmailVerification(email: string) {
	const existingVerification = await prisma.emailVerificationRequest.findFirst({
		where: { email },
	});

	if (!existingVerification) {
		const verification = await prisma.emailVerificationRequest.create({
			data: {
				token: randomStr(48),
				email,
			},
		});

		return await sendEmail(verification);
	}

	// [ ]: Resend email when verification is re-requested. But we should
  // make sure this is not spammed
}

async function sendEmail(verification: EmailVerificationRequest) {
	// const subdomain = process.env.SCHOOL;
	const { email, token } = verification;

	const link = [
		`http://localhost:3000/verify-email/?`,
		`email=${email}`,
		`&token=${token}`,
	].join("");

	// const { data, error } = await send({
	// 	to: verification.email,
	// 	from: "ttucompsci@email-connect.cloud",
	// 	subject: "Account verification | ttucompsci",
	// 	text: `Hi and welcome to ttucompsci,\n\nClick the following link to verify your account: ${link}.\n\nSee you!\n\n\n(You cannot reply to this email.)`,
	// });
	
	// if (error) {
	// 	return json({ error }, 400);
	// }
	
	// return json(data, 200);
	// mg.messages.create('sandbox-123.mailgun.org', {
	// 	from: "Excited User <mailgun@sandbox-123.mailgun.org>",
	// 	to: ["test@example.com"],
	// 	subject: "Hello",
	// 	text: "Testing some Mailgun awesomeness!",
	// 	html: "<h1>Testing some Mailgun awesomeness!</h1>"
	// })
	// .then(msg => console.log(msg)) // logs response data
	// .catch(err => console.log(err));

	const messageData={
		from: `ttucompsci@${DOMAIN}`,
		to: verification.email,
		subject: "Account verification | ttucompsci",
		text: `Hi and welcome to ttucompsci,\n\nClick the following link to verify your account: ${link}.\n\nSee you!\n\n\n(You cannot reply to this email.)`,
		// html: "<h1>Testing some Mailgun awesomeness!</h1>"

	}
	await mg.messages.create(DOMAIN,messageData);
	
}

	// testing with mailgun



export { sendEmailVerification };