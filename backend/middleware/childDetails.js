const Child = require('../models/childModel');
const Employee = require('../models/employeeModel');
const nodeMailer = require('nodemailer');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const calculateAge = (DateOfBirth) => {
    const birthDate = new Date(DateOfBirth);
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = Math.floor(
      ageInMillis / (1000 * 60 * 60 * 24 * 365.25) // Assuming a year is 365.25 days
    );
    return ageInYears;
  };
const sendMailChildProfile = async (emailId, childDetails) => {
    console.log(process.env.SMPT_SERVICE);
  const transporter = nodeMailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const { name, DateOfBirth, gender, actionLeft, keyCase, familyDetails, CCI } = childDetails[0];
//   console.log(name);
const child = childDetails[0]; // Access the first child from the array

const subject = "Request for Publishing Information of a Child";
const body = `Dear [Publisher's Name],

I hope this email finds you well. I am writing on behalf of BalAsha, a non-governmental organization committed to the welfare and protection of children in need.

We have a child under our care whose parents/guardians are unknown. We believe that publishing the child's information in your esteemed publication could significantly contribute to reuniting them with their rightful family or finding suitable guardianship.

Here are the details of the child:

- Name: ${child.name}
- Age: ${calculateAge(child.DateOfBirth)} years
- Gender: ${child.gender}
- Physical Description: ${child.keyCase}
- Circumstances: ${child.familyDetails}

We understand the sensitivity and importance of handling such personal information, and we assure you that we have followed all necessary legal protocols and obtained consent from the appropriate authorities to pursue this search. By sharing this information with your readership, we hope to reach a wider audience, including individuals who may have knowledge of the child's family or guardians.

We kindly request your cooperation in publishing the child's information in your publication, preferably in a prominent and visible manner to maximize the chances of reaching the right individuals. We believe that your platform can play a crucial role in spreading the word and facilitating the reunion of this child with their loved ones.

Furthermore, we are more than willing to provide any additional information, photographs, or documents that could assist in the search process. We understand that privacy and child protection are of utmost importance and will ensure that any information shared is done so responsibly and in compliance with legal requirements. If you have any specific guidelines or requirements for publishing such information, please let us know, and we will be happy to adhere to them.

Time is of the essence in cases like these, and your support in publishing this information would be invaluable. Together, we can make a significant impact on the life of this child and potentially reunite them with their family or find a caring and nurturing guardian.

Thank you for considering our request. We sincerely appreciate your attention to this matter and look forward to hearing from you soon.

Warm regards,

[Manav Shah]
[Case Manager]
[Bal Asha]
[9987088255]`;
const attachments = [];
  // Attach photos if available
  if (CCI && CCI.length > 0) {
    for (const cci of CCI) {
      if (cci.url) {
        const attachment = {
          filename: "Imageofthechild.jpg", // Set the filename as per your requirement
          path: "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?cs=srgb&dl=pexels-bess-hamiti-35537.jpg&fm=jpg",
        };
        attachments.push(attachment);
      }
    }
  }

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: emailId,
    subject: "Child Profile Details",
    text: "Child Profile Details",
    html: body,
    attachments: attachments,
  };
//   console.log("Manav");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Mail sent to ${emailId}`);
    }
  });
};

const emailChildProfile = catchAsyncErrors(async (req, res, next) => {
  const emailId = req.body.emailId; // Specify the email address to which you want to send the child profile details
    const childDetails=req.body.childDetails;
      sendMailChildProfile(emailId, childDetails);
});

module.exports = {
  emailChildProfile,
};
