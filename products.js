/**
 * Bea Luxe NG - Product Database matched with Base44 showcase
 */

const PRODUCTS = [
  // 1. Featured Top Row (Matches Base44 exact showcase)
  {
    id: "everyday-coord",
    name: "The Everyday Co-ord",
    category: "Unisex Wears",
    description: "A relaxed, polished set for easy mornings and late plans.",
    price: null, // "Price on request" exact
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "terra-leather-slides",
    name: "Terra Leather Slides",
    category: "Footwear",
    description: "Hand-finished leather slides that soften beautifully with wear.",
    price: 34000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "amber-structured-tote",
    name: "The Amber Structured Tote",
    category: "Bags",
    description: "A clean-lined tote with room for a laptop, a wallet and the rest of it.",
    price: 56000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "oud-neroli-edp",
    name: "Oud & Neroli Eau de Parfum",
    category: "Perfumes",
    description: "Warm oud softened with neroli and a quiet trail of amber.",
    price: 38500,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80"
  },

  // 2. Additional Catalogue Items
  {
    id: "brushed-gold-cuff",
    name: "Brushed Gold Minimalist Bangle",
    category: "Fashion Accessories",
    description: "Architectural 18K gold PVD waterproof wrist cuff that never tarnishes.",
    price: 18500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1611591475837-9755b0a70f07?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "polarized-square-eyewear",
    name: "Square Frame Polarized Sunglasses",
    category: "Fashion Accessories",
    description: "Handmade cellulose acetate sunglasses with UV400 polarized bronze lenses.",
    price: 24000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "japanese-chef-knife-block",
    name: "Japanese Precision Cutlery Set",
    category: "Kitchen Items",
    description: "High-carbon stainless steel 5-piece chef knives in natural acacia block.",
    price: 58000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "fluted-amber-tumblers",
    name: "Fluted Amber Borosilicate Tumblers",
    category: "Kitchen Items",
    description: "Set of 4 heat-resistant ribbed glassware for morning matcha and evening drinks.",
    price: 22000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "sculptural-aroma-diffuser",
    name: "Matte Ceramic Ultrasonic Diffuser",
    category: "Household Items",
    description: "Unglazed terracotta ceramic diffuser with warm ambient glow.",
    price: 32500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "turkish-waffle-throw",
    name: "Turkish Honeycomb Waffle Throw",
    category: "Household Items",
    description: "100% pre-washed breathable cotton throw in neutral sand beige.",
    price: 27000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "botanical-soy-candle",
    name: "Smoked Vanilla & Vetiver Candle",
    category: "Household Items",
    description: "Hand-poured coconut-soy wax blend with double crackling wooden wick.",
    price: 19500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "pleated-linen-trousers",
    name: "Pleated Wide-Leg Linen Pants",
    category: "Unisex Wears",
    description: "High-waisted tailored linen pants designed for airy, breezy movement.",
    price: 34000,
    available: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80"
  }
];
