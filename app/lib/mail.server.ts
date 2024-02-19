// import {Resend} from "resend"
import Mailgun from "mailgun.js"
import FormData from "form-data";


const mailgun=new Mailgun(FormData);
const send=mailgun.client({username:'api',key:process.env.MAILGUN_API || "mailapi"})

// const resend=new Resend(process.env.RESEND_API_KEY)
// const send=resend.emails.send.bind(resend.emails);
// console.log(send)

export {send}