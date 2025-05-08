export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Modern e-commerce platform";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  price: 0,
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};
