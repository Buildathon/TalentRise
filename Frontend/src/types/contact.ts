export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface ContactData {
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  image: string;
  visitTitle: string;
  visitDescription: string;
}
