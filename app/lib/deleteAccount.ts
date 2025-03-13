/*
Two phases:

1) Send token via email, user clicks link in email, which has a token and query, create a new route for 
account deletion

2) Having clicked link and returned to website, the dialogue box says: are you sure you want to delete
all data associated with your account? Yes / No On click yes there's a function which deletes everything
so you need to have the email, check what happens with the login auth

http://localhost:3000/api/auth/callback/nodemailer?callbackUrl=[CALLBACKURL]&token=[TOKEN]&email=thusbanduk%40gmail.com

*/