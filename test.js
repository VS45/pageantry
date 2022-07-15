const mailgun=require('mailgun-js');
const DOMAIN="mg.defipay.tech"
const mg=mailgun({
  apiKey:"4877e71f02eb71005cefb915ef57204c-18e06deb-b5fde7ad",
domain:DOMAIN
})
const data={
  from:"Mailguns SandBox <noreply@mg.defipay.tech>",
  to:"bringfirehjake88@gmail.com",
  subject:"Message from Mailgun",
  text: 'Testing some Mailgun awesomeness!'
}

mg.messages().send(data,function(err,body){
  if(err){
  return  console.log(err)
  }
  console.log(body);
})