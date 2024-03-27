interface IUser {
  success: boolean;
  user: User;
  generateToken: () => void;
}

interface User {
  _id: string;
  username: string;
  cmpId?: string;
  email?: string;
  //   password?: string;
  assigner?: any[];
  messageAssign?: any[];
  isVerified?: boolean;
  role?: any[];
  resetPasswordExpiry?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  gmailIdName?: string;
  gmailToken?: string;
  message?: any[];
  staff?: any[];
  assignto?: any[];
  label?: any[];
  otpExpiry?: string;
  otpToken?: string;
}

const sendCookie = (user: IUser, statusCode: any, res: any) => {
  const token = user.generateToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    domian: ".convoportal.com",

    // domian: ".convoportal.com",
  };

  res
    .status(statusCode)
    .cookie(
      "token",
      token,
      process.env.NODE_ENV === "production"
        ? options
        : {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none", // Set to 'none' if you need cross-site access
            secure: true, // Set to 'true' if using HTTPS
          }
    )
    .json({
      success: true,
      user,
    });
};

module.exports = sendCookie;
