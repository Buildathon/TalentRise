export interface AddressDetails {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Location {
  title: string;
  description: string;
  image: string;
  mapUrl: string;
  addressDetails: AddressDetails;  // Aquí agregamos addressDetails
}

export interface OfficeHour {
  day: string;
  time: string;
  inCharge: string;
  notes: string;  // Asegúrate de que "notes" también esté en la estructura.
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface AttentionData {
  contactInfo: ContactInfo;
  socialLinks?: {  // Hacemos socialLinks opcional
    facebook: string;
    twitter: string;
    instagram: string;
  };
  officeHours: OfficeHour[];
  location: Location;
}
