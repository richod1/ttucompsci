import emailjs from "@emailjs/browser";


const send=async (emailData: Record<string, unknown> | undefined)=>{
    return emailjs.send("service_fl356rn","template_mn8segk",emailData,{
        publicKey:"aNRV5aa0EOGIkSQyc"
    }).then((response)=>{
        console.log("SUCCESS",response.status,response.text)
    },(err)=>{
        console.log('FAILED',err.message)
    })
        
}

export {send};