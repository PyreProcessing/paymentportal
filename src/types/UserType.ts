
export default interface UserType {
  _id: string;
  firstName: string;
  lastName?: string;
  businessName?: string;
  businessLogoUrl?: string;
  businessDescription?: string;
  businessSlug?: string;
  agent?: string;
  status: "pending" | "active" | "inactive" | "deleted";
  phoneNumber: string;
  fullName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  passwordResetToken: string;
  passwordResetExpires: Date;
  role: [string];
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
