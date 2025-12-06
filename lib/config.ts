export const SHOP_NAME = "Mega Store";

export const SHOP_COORDS = {
  lat: 18.61791578397271,
  lng: 73.87632700266995,
};

export const SHOP_MAP_URL = `https://www.google.com/maps?q=${SHOP_COORDS.lat},${SHOP_COORDS.lng}`;

export const SHOP_WHATSAPP =
  process.env.NEXT_PUBLIC_SHOP_WHATSAPP || "918805925386";
