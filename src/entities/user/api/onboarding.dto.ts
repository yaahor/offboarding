export interface OnboardingDto {
  receiver: string;
  email: string;
  phone: string;
  streetLine: string;
  city: string;
  postalCode: string;
  country: string;
  note?: string;
}
