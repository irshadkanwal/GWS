export const EmailRequestTemplate = (
  verifyUrl: string,
  title: string,
  description: string,
  buttonText: string
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px; overflow: hidden;">
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
       <img src="https://gws-assests-bucket.s3.us-east-2.amazonaws.com/public/giftWellSoonLogo.png" alt="Company Logo" style="max-width: 150px; height: auto;" />
      </div>
      
      <div style="padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">${title}</h2> 
        <p style="margin-top: 20px; color: #555;">${description}</p>

        <div style="margin-top: 30px;margin-bottom: 30px; text-align: center;">
        <a href="${verifyUrl}" style="display:inline-block;padding:10px 20px;background-color:#385c80;color:white;text-decoration:none;border-radius:5px;">${buttonText}</a>
        </div>
         <p style="margin-top: 20px; color: #555;">Link will expire in 15 minutes</p>
      </div>
    </div>
  `;
};
