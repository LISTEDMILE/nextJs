import { resend } from "@/lib/Resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(
  email: string,
  username: string,
  verificationCode: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verificationCode }),
    });
    return {
      success: true,
      message: "Verification Email Send Successfully",
    };
  } catch (emailError) {
    console.error("Error Sending Verification Email", emailError);
    return {
      success: false,
      message: "Failed to send Verification Email",
    };
  }
}
