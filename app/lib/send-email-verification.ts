import {type EmailVerificationRequest} from "@prisma/client"
import {prisma} from "./prisma.server"
import {randomStr} from "./random-str"
import {send} from "./mail.server"

async function sendEmailVerification(email:string){
    const existingVerification=await prisma.emailVerificationRequest.findFirst({
        where:{email},
    })

    if(!existingVerification){
        const verification=await prisma.emailVerificationRequest.create({
            data:{
                token:randomStr(48),
                email,
            }
            
        })

        return await sendEmail(verification);
    }

    async function sendEmail(verification:EmailVerificationRequest){
            const subdomain=process.env.EMAIL_SCHOOL //will change after getting email domain
            const {email,token}=verification;

            const link=[
                `https://${subdomain}.compa.so/verify-email/?`,               
                `email=${email}`,
                `&token=${token}`,

            ].join("");

            return await send({
                to:verification.email,
                from:"m@compa.so",
                subject:'Account verification | ttucompsci',
                text:`Hi and welcome to ttucompsci,\n\nClick the following link to verify your account: ${link}.\n\nSee you!\n\n\n(You cannot reply to this email.)`,
            })
    }
}

export {sendEmailVerification}