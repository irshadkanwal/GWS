const GiftWellContributionEmail = (
  recipientName: string,
  contributionType: "donation" | "gift",
  contributionValue: string,
  message: string | null,
  registryUrl: string
) => {
  const contributionText =
    contributionType === "donation"
      ? `a donation of <strong>$${contributionValue}</strong>`
      : `a gift: <strong>${contributionValue}</strong>`;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px; overflow: hidden;">
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
        <img src="https://gws-assests-bucket.s3.us-east-2.amazonaws.com/public/giftWellSoonLogo.png" alt="GiftWellSoon Logo" style="max-width: 150px; height: auto;" />
      </div>

      <div style="padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
          You've Received a Contribution!
        </h2>

        <p style="margin-top: 20px; color: #555;">
          Hi <strong>${recipientName}</strong>,
        </p>

        <p style="margin-top: 10px; color: #555;">
          Someone has contributed ${contributionText} to your GiftWell registry 🎁.
        </p>

        ${
          message
            ? `<p style="margin-top: 20px; color: #777; font-style: italic;">"${message}"</p>`
            : ""
        }

        <div style="margin-top: 30px; margin-bottom: 30px; text-align: center;">
          <a href="${registryUrl}" style="display:inline-block; padding:10px 20px; background-color:#385c80; color:white; text-decoration:none; border-radius:5px;">
            View Your GiftWell
          </a>
        </div>

        <p style="color: #999; font-size: 13px;">
          Thank you for using GiftWellSoon. We're so glad you're part of our giving community 💝
        </p>
      </div>
    </div>
  `;
};

export default GiftWellContributionEmail;
