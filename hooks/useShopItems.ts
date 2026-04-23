export type ProductsItemType = {
  id: number;
  imageSrc: string;
  price: string;
  shoppingLink: string;
  title: string;
  tag: string;
  description: string;
  category?: number;
  registryItemID?: number;
  quantity?: number;
  status?: string;
};

const ITEMS: ProductsItemType[] = [
  {
    id: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // teddy bear
    price: "59.15",
    shoppingLink: "https://www.amazon.com",
    title: "Teddy Bear 40cm 55cm",
    tag: "meals",
    description: "A cuddly teddy bear perfect for gifting and snuggling.",
  },
  {
    id: 2,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // smart lamp
    price: "59.15",
    shoppingLink: "https://www.amazon.com",
    title: "GlowMate",
    tag: "meals",
    description:
      "A smart nightlight that adapts to your mood and lighting needs.",
  },
  {
    id: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // teddy bear
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "Teddy Bear 40cm 55cm",
    tag: "meals",
    description: "Soft plush bear ideal for children and collectors alike.",
  },
  {
    id: 4,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // LED light
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "GlowMate",
    tag: "meals",
    description: "GlowMate offers ambient lighting for a calming experience.",
  },
  {
    id: 5,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // nursery lamp
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "GlowMate",
    tag: "childcare",
    description: "Keep your child's room softly lit all night with GlowMate.",
  },
  {
    id: 6,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // cute light
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "GlowMate",
    tag: "childcare",
    description: "A gentle nightlight companion for peaceful sleep.",
  },
  {
    id: 7,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // kids night light
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "GlowMate",
    tag: "childcare",
    description: "Portable and rechargeable nightlight for toddlers.",
  },
  {
    id: 8,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // soft LED
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "GlowMate",
    tag: "childcare",
    description: "Reliable lighting solution with child-safe materials.",
  },
  {
    id: 9,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // baby jars
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "FlexiFuel",
    tag: "childcare",
    description: "Quick and easy baby meal prep with FlexiFuel jars.",
  },
  {
    id: 10,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // baby formula
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "FlexiFuel",
    tag: "childcare",
    description: "Store and transport formula and baby food easily.",
  },
  {
    id: 11,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // cleaning pods
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "FlexiFuel",
    tag: "housecleaning",
    description: "All-in-one cleaning capsule system for home care.",
  },
  {
    id: 12,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // eco cleaning
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "FlexiFuel",
    tag: "housecleaning",
    description: "Eco-friendly cleaning pods for every surface type.",
  },
  {
    id: 13,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // scrubber
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "CoreCharge",
    tag: "housecleaning",
    description: "Rechargeable electric scrubber for deep cleaning.",
  },
  {
    id: 14,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // cordless cleaner
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "CoreCharge",
    tag: "housecleaning",
    description: "Cordless power cleaner for household chores.",
  },
  {
    id: 15,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // laundry booster
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "CoreCharge",
    tag: "laundry",
    description: "High-performance laundry booster for tough stains.",
  },
  {
    id: 16,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // detergent
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "CoreCharge",
    tag: "laundry",
    description: "Maximize laundry efficiency with CoreCharge tech.",
  },
  {
    id: 17,
    imageSrc:
      "https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // liquid cleaner
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "CoreCharge",
    tag: "laundry",
    description: "Boost your detergent power with CoreCharge solution.",
  },
  {
    id: 18,
    imageSrc:
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=2917&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // clean clothes
    price: "23",
    shoppingLink: "https://www.amazon.com",
    title: "CoreCharge",
    tag: "laundry",
    description: "Eliminate odor and bacteria with CoreCharge tech.",
  },
];

export const useShopItems = () => {
  return ITEMS;
};

const dummyProducts = [
  {
    name: "Cozy Comfort Throw",
    description: "Plush throw blanket ideal for comfort and warmth.",
    price: 60.0,
    affiliate_link:
      "https://www.spoonfulofcomfort.com/products/cozy-comfort-throw",
    image_url:
      "https://cdn.shopify.com/s/files/1/1234/5678/products/cozy-comfort-throw.jpg",
    is_service: false,
  },
  {
    name: "Plush Rabbit Faux Fur Throw Blanket",
    description: "Oversized bubble faux fur throw for ultimate coziness.",
    price: 120.0,
    affiliate_link:
      "https://www.amazon.comized-Bubble-Double-Blanket/dp/B0CKMNT1RG",
    image_url: "https://m.media-amazon.com/images/I/71XhhoVl8ML._SL1500_.jpg",
    is_service: false,
  },
  {
    name: "Flip Coffee Sherpa Blanket",
    description: "Sherpa blanket with 'Dogs and Coffee' print.",
    price: 48.99,
    affiliate_link:
      "https://flipcoffee.com/products/flip-coffee-sherpa-blanket-teal",
    image_url:
      "https://flipcoffee.com/cdn/shop/files/dogs-coffee-sherpa-blanket.jpg",
    is_service: false,
  },
  {
    name: "Large Lovey Baby Security Blanket",
    description: "Soft lavender baby security blanket with plush toy.",
    price: 25.0,
    affiliate_link:
      "https://www.amazon.comecurity-Blanket-Everyday/dp/B0912FBWJB",
    image_url: "https://m.media-amazon.com/images/I/71GfKZ0D+PL._SL1500_.jpg",
    is_service: false,
  },
];
