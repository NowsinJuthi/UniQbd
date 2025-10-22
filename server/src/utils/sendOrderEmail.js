import transporter from "./emailConfig.js";

const sendOrderEmail = async (customerEmail, orderInfo) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      bcc: process.env.SMTP_USER, // optional: admin copy
      subject: "🛒 আপনার অর্ডার সফলভাবে গৃহীত হয়েছে!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background:#f9f9f9; padding:20px; border-radius:10px;">
          <h2 style="color:#007bff;">ধন্যবাদ, ${orderInfo.userName}!</h2>
          <p>আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। নিচে বিস্তারিত তথ্য দেওয়া হলো:</p>
          <hr/>
          <p><b>অর্ডার আইডি:</b> ${orderInfo._id}</p>
          <p><b>প্রোডাক্ট:</b> ${orderInfo.productName}</p>
          <p><b>দাম:</b> ${orderInfo.amount} ৳</p>
          <p><b>পেমেন্ট মেথড:</b> ${orderInfo.paymentMethod}</p>
          <p><b>ট্রান্সঅ্যাকশন আইডি:</b> ${orderInfo.transactionId}</p>
          <hr/>
          <p>আমরা দ্রুত আপনার অর্ডার প্রসেস করব। যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।</p>
          <p>— <b>UniQbd টিম</b></p>
          <p style="font-size:12px; color:#666;">এই মেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে, রিপ্লাই প্রয়োজন নেই।</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ অর্ডার ইমেইল পাঠানো হয়েছে ${customerEmail} ঠিকানায়`);
  } catch (error) {
    console.error("❌ ইমেইল পাঠাতে সমস্যা:", error);
  }
};

export default sendOrderEmail;
