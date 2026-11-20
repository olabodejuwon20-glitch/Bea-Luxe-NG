/**
 * Bea Luxe NG - Complete Curated Product Database
 * Total 85 Curated Lifestyle Pieces Across 7 Categories
 */

const PRODUCTS = [
  {
    id: "sky-blue-ribbed-skater-dress",
    name: "Sky Blue Ribbed Sleeveless Skater Dress",
    category: "Unisex Wears",
    description: "Chic sky blue sleeveless textured ribbed knit mini dress featuring a fitted crew-neck bodice and playful tiered flounce skater hem.",
    price: 18500,
    available: true,
    featured: true,
    image: "images/sky-blue-ribbed-skater-dress.jpg"
  },
  {
    id: "ruched-drape-maxi-gown",
    name: "Ruched Drape Long Sleeve Maxi Gown",
    category: "Unisex Wears",
    description: "Sleek floor-length evening maxi gown with long sleeves, sculpted gathered waist draping, and metallic buckle accent. Available in Wine, Mint, Pink, and White.",
    price: 15000,
    available: true,
    featured: true,
    image: "images/ruched-drape-maxi-gown.jpg"
  },
  // =========================================================================
  // 1. UNISEX WEARS (16 Pieces)
  // =========================================================================
  {
    id: "ny-cocoa-coord-set",
    name: "NY Earth Tone Zip Co-ord Set",
    category: "Unisex Wears",
    description: "Rich cocoa brown streetwear set featuring a quarter-zip collared polo and relaxed drawstring trousers with embroidered NY motif.",
    price: 24500,
    available: true,
    featured: true,
    image: "images/ny-cocoa-coord-set.jpg"
  },
  {
    id: "keyhole-contrast-dress",
    name: "Keyhole Piping Bodycon Mini Dress",
    category: "Unisex Wears",
    description: "Sculpted mandarin collar mini dress with teardrop keyhole neckline, cap sleeves, and crisp contrast ivory piping.",
    price: 16500,
    available: true,
    featured: true,
    image: "images/keyhole-bodycon-dress.jpg"
  },
  {
    id: "liverpool-noir-jersey",
    name: "Liverpool F.C. Noir & Neon Jersey",
    category: "Unisex Wears",
    description: "Black pinstripe luxury edition kit with electric yellow collar accents, embroidered Liverbird crest, zip polo collar, and Champions League sleeve badge.",
    price: 18000,
    available: true,
    featured: true,
    image: "images/liverpool-noir-jersey.jpg"
  },
  {
    id: "ck-classic-boxers-set",
    name: "Calvin Klein 3-Piece Classic Trunk Set",
    category: "Unisex Wears",
    description: "Premium breathable stretch cotton trunks in signature heather grey, black, and crimson with jacquard logo waistband in gift box.",
    price: 14500,
    available: true,
    featured: true,
    image: "images/calvin-klein-boxers-set.jpg"
  },
  {
    id: "everyday-coord",
    name: "The Everyday Co-ord",
    category: "Unisex Wears",
    description: "A relaxed, polished set tailored from premium breathable woven cotton for effortless daytime layering and evening plans.",
    price: 22500,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pleated-linen-trousers",
    name: "Pleated Wide-Leg Linen Pants",
    category: "Unisex Wears",
    description: "High-waisted tailored European flax linen trousers with double front pleats and fluid wide-leg cut for warm breezy comfort.",
    price: 19500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cashmere-knit-crewneck",
    name: "Merino & Cashmere Ribbed Crewneck",
    category: "Unisex Wears",
    description: "Spun from 12-gauge Italian merino wool and Grade-A Mongolian cashmere in soft oatmeal melange with seamless raglan sleeves.",
    price: 26000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "oversized-oxford-shirt",
    name: "Heavyweight Relaxed Oxford Button-Down",
    category: "Unisex Wears",
    description: "Tailored from 100% two-ply long-staple Egyptian cotton with natural mother-of-pearl buttons and a structured box-pleat back.",
    price: 17500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "french-terry-hoodie",
    name: "Vintage Wash Heavy French Terry Hoodie",
    category: "Unisex Wears",
    description: "Substantial 480GSM loopback organic cotton hoodie in mineral washed charcoal with seamless double-lined hood and rib cuffs.",
    price: 24000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tailored-linen-blazer",
    name: "Unstructured Sand Linen Oversized Blazer",
    category: "Unisex Wears",
    description: "Deconstructed single-breasted blazer in pure Normandy sand linen with horn buttons and half-canvas floating chest piece.",
    price: 32000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "silk-cuban-collar-shirt",
    name: "Silk-Blend Botanical Camp Collar Shirt",
    category: "Unisex Wears",
    description: "Lustrous mulberry silk and plant viscose bowling shirt with hand-drawn tonal botanical silhouettes and relaxed notched collar.",
    price: 18500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "adire-silk-lounge-set",
    name: "Two-Piece Adire Silk Loungewear Set",
    category: "Unisex Wears",
    description: "Hand-dyed contemporary Nigerian indigo silk twill short-sleeve shirt and matching fluid trousers with contrast piping and drawstrings.",
    price: 28000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "rich-uncle-pleated-coord",
    name: "Rich Uncle Pleated Kaftan & Trousers Coord",
    category: "Unisex Wears",
    description: "Flowing textured pleated fabric coord in desert stone beige with minimal mandarin collar and tapered easy-fit drawstring bottoms.",
    price: 35000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "heavyweight-graphic-streetwear-tee",
    name: "Heavyweight Nigerian Graphic Streetwear Tee (280 GSM)",
    category: "Unisex Wears",
    description: "Custom boxy oversized streetwear tee milled from combed Nigerian cotton with high-density puff print detailing and drop shoulders.",
    price: 14000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "linen-safari-resort-set",
    name: "Linen Safari Short-Sleeve Resort Two-Piece",
    category: "Unisex Wears",
    description: "Breathable crisp unbleached pure linen camp shirt with four functional front safari pockets and tailored relaxed linen shorts.",
    price: 27500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "monogram-silk-lounge-set",
    name: "Monogram Mulberry Silk Pyjama & Day-Lounge Set",
    category: "Unisex Wears",
    description: "Effortless daytime-to-evening lounge pyjama set in champagne gold jacquard silk with notch lapels and mother-of-pearl buttons.",
    price: 29000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=700&q=80"
  },
  // =========================================================================
  // 2. FOOTWEAR (11 Pieces)
  // =========================================================================
  {
    id: "terra-leather-slides",
    name: "Terra Leather Slides",
    category: "Footwear",
    description: "Hand-finished saddle leather slides with ergonomic cork-latex footbed that molds naturally to your stride over time.",
    price: 24000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "minimalist-leather-sneakers",
    name: "Minimalist Low-Top Calfskin Sneakers",
    category: "Footwear",
    description: "Handmade in Civitanova Italy from full-grain white nappa calfskin with stitched Margom rubber soles and calfskin lining.",
    price: 36000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "chelsea-boot-caramel",
    name: "Suede Chelsea Boots in Caramel Tan",
    category: "Footwear",
    description: "Water-repellent European calf suede boots featuring tonal elastic side gores, pull tabs, and durable Blake-stitched leather welt.",
    price: 42000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "leather-penny-loafers",
    name: "Burnished Mahogany Penny Loafers",
    category: "Footwear",
    description: "Goodyear-welted French box-calf leather loafers featuring hand-stitched beefroll apron, leather lining, and rubber-injected heel.",
    price: 38500,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "woven-mule-slides",
    name: "Hand-Woven Lambskin Mule Slides",
    category: "Footwear",
    description: "Artisanal woven lambskin leather backless mules with cushioned arch support and vegetable-tanned natural sole.",
    price: 26500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "retro-runner-trainers",
    name: "Monochrome Suede & Mesh Retro Trainers",
    category: "Footwear",
    description: "Sculpted heritage running silhouette blending tonal grey pigskin suede, ventilated honeycomb mesh, and shock-absorbing EVA midsole.",
    price: 34000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "strappy-heeled-sandals",
    name: "Minimalist Nude Strappy Block Sandals",
    category: "Footwear",
    description: "Delicate tubular leather strap sandals set on a comfortable 65mm architectural cylindrical heel with square open toe.",
    price: 28000,
    available: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "velvet-albert-gold-crest-loafers",
    name: "Velvet Albert Loafers with Gold Bullion Crest",
    category: "Footwear",
    description: "Midnight navy plush cotton velvet formal slip-on shoes with hand-embroidered gold wire crest, quilted satin lining, and hard leather sole.",
    price: 45000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "double-buckle-leather-slides",
    name: "Double-Buckle Contoured Leather Footbed Slides",
    category: "Footwear",
    description: "The signature Nigerian everyday luxury footwear — oiled full-grain leather straps with matte gold buckles on an orthopedic cork arch footbed.",
    price: 25000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "crocodile-embossed-leather-mules",
    name: "Handcrafted Crocodile-Embossed Leather Mules",
    category: "Footwear",
    description: "Polished mahogany croc-embossed calfskin half-shoes designed for kaftans and agbada attire, featuring open-back ease and stacked leather heel.",
    price: 32000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "suede-driving-shoes-pebble",
    name: "Perforated Suede Driving Shoes with Pebble Grips",
    category: "Footwear",
    description: "Italian split calf suede moccasins with contrast hand-stitching, penny strap, and tubular rubber pebble studded outsole for casual mobility.",
    price: 36500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=700&q=80"
  },
  // =========================================================================
  // 3. BAGS (11 Pieces)
  // =========================================================================
  {
    id: "amber-structured-tote",
    name: "The Amber Structured Tote",
    category: "Bags",
    description: "Architectural clean-lined tote with room for a 15-inch laptop, interior zipped security pocket, and reinforced rolled handles.",
    price: 38000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pebbled-duffle-bag",
    name: "Pebbled Leather Weekend Holdall Duffle",
    category: "Bags",
    description: "Spacious cabin-approved travel bag in espresso full-grain pebbled leather with antique brass hardware and detachable webbed strap.",
    price: 45000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "minimal-crossbody-pouch",
    name: "Sleek Matte Leather Crossbody Sling",
    category: "Bags",
    description: "Compact geometric shoulder bag crafted in obsidian calf leather with hidden dual-magnetic closure and dedicated passport slip.",
    price: 21000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "woven-raffia-tote",
    name: "Artisanal Woven Raffia Basket Tote",
    category: "Bags",
    description: "Hand-braided natural raffia beach-to-city market basket finished with smooth cognac bridle leather trim and brass stud accents.",
    price: 26000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "structured-top-handle",
    name: "Trapeze Top-Handle Satchel in Forest Green",
    category: "Bags",
    description: "Sculptural structured handbag in deep forest green box calfskin with satin gold turn-lock closure and detachable shoulder strap.",
    price: 34500,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "leather-messenger-folio",
    name: "Slim Document Folio & Laptop Briefcase",
    category: "Bags",
    description: "Executive slimline portfolio bag lined in microsuede with padded shockproof laptop sleeve, pen organizers, and luggage pass-through.",
    price: 39000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "canvas-leather-shopper",
    name: "Heavyweight Canvas & Vachetta Shopper",
    category: "Bags",
    description: "Sturdy 24oz organic cotton canvas tote reinforced with vegetable-tanned vachetta leather corners and water-resistant interior lining.",
    price: 28500,
    available: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "woven-leather-padded-cassette",
    name: "Woven Leather Padded Cassette Crossbody",
    category: "Bags",
    description: "Maxi orthogonal weave crossbody bag in butter-soft nappa leather with magnetic foldover flap and adjustable triangle buckle strap.",
    price: 32000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "executive-leather-briefcase-messenger",
    name: "Executive Full-Grain Leather Briefcase & Messenger",
    category: "Bags",
    description: "Double-compartment vegetable-tanned bovine leather laptop briefcase with quick-access luggage sleeve and detachable padded shoulder sling.",
    price: 48000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "bamboo-handle-structured-handbag",
    name: "Structured Leather Handbag with Bamboo Handle",
    category: "Bags",
    description: "Iconic structured event handbag in smooth box calfskin with handcrafted fire-bent bamboo top handle and gold-tone turnlock closure.",
    price: 36000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "quilted-cylinder-vanity-case",
    name: "Quilted Leather Cylinder Vanity Case Bag",
    category: "Bags",
    description: "Diamond-quilted caviar calfskin cylindrical beauty vanity bag with top handle, leather-interlaced gold chain strap, and interior mirror.",
    price: 27000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80"
  },
  // =========================================================================
  // 4. PERFUMES (12 Pieces)
  // =========================================================================
  {
    id: "oud-neroli-edp",
    name: "Oud & Neroli Eau de Parfum",
    category: "Perfumes",
    description: "Warm royal agarwood softened with sun-drenched Tunisian neroli blossoms, spiced pink pepper, and a quiet lingering trail of golden amber.",
    price: 42000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "santale-ambre-extrait",
    name: "Santal & Ambre Extrait de Parfum (100ml)",
    category: "Perfumes",
    description: "An opulent 28% concentration elixir blending creamy Mysore sandalwood, crushed cardamom, smoky papyrus, and radiant resinous amber.",
    price: 48000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bergamote-vetiver-cologne",
    name: "Bergamote Sauvage Cologne Royale (100ml)",
    category: "Perfumes",
    description: "Crisp sparkling Calabrian bergamot infused with crushed bitter orange leaves, earthy Haitian vetiver roots, and sun-bleached cedar.",
    price: 38500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rose-oud-imperial",
    name: "Rose & Velvet Oud Extrait (50ml)",
    category: "Perfumes",
    description: "Intense Turkish Damascena rose petals steeped in aged Cambodian oud, dark Indonesian patchouli, and bourbon vanilla bean.",
    price: 52000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "soleil-blanc-neroli",
    name: "Neroli & Solar Amber Mist (100ml)",
    category: "Perfumes",
    description: "Luminous white floral fragrance blending Sicilian orange blossom, sweet ylang-ylang, sheer coconut water, and crystalline benzoin.",
    price: 36000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tabac-noir-parfum",
    name: "Tabac Noir & Bourbon Eau de Parfum (100ml)",
    category: "Perfumes",
    description: "Cured Havana tobacco leaves aged in charred oak bourbon barrels, layered with dark Venezuelan tonka bean and spiced clover honey.",
    price: 44000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lattafa-24k-pure-gold",
    name: "24 Carat Pure Gold Eau de Parfum (24K)",
    category: "Perfumes",
    description: "The iconic Nigerian viral sensation — an opulent Oriental amber fragrance opening with golden saffron, cinnamon, and smoky oud, settling into rich leather and Bourbon vanilla.",
    price: 28000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "khamrah-royal-vanilla",
    name: "Khamrah Royal Amber & Vanilla Extrait",
    category: "Perfumes",
    description: "Luxuriously sweet and spicy Arabic gourmand featuring decadent notes of nutmeg, dates, praline, and warm benzoin in a crystal decanter flacon.",
    price: 38000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "club-de-nuit-intense-noir",
    name: "Club de Nuit Intense Noir Special Edition",
    category: "Perfumes",
    description: "Nigeria's most coveted signature masculine cologne with vibrant lemon zest, blackcurrant, smoky birch wood, and patchouli with extraordinary projection.",
    price: 35000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "barakkat-rouge-540-extrait",
    name: "Barakkat Rouge 540 Extrait de Parfum",
    category: "Perfumes",
    description: "The undeniable viral staple with luminous grandiflorum jasmine, saffron, bitter almond, and warm mineral ambergris in a rich crimson flacon.",
    price: 42000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "hareem-al-sultan-gold-oil",
    name: "Hareem Al Sultan Gold Concentrated Perfume Oil",
    category: "Perfumes",
    description: "The viral TikTok gold filigree oil blend of red apple, dark chocolate, Turkish rose, and lingering sandalwood with 24-hour skin adherence.",
    price: 25000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "badee-al-oud-glory",
    name: "Bade'e Al Oud (Oud for Glory) Luxury Decanter",
    category: "Perfumes",
    description: "A regal black-and-gold presentation with notes of lavender, nutmeg, saffron, aged patchouli, and deep natural Agarwood.",
    price: 32000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80"
  },
  // =========================================================================
  // 5. FASHION ACCESSORIES (11 Pieces)
  // =========================================================================
  {
    id: "brushed-gold-cuff",
    name: "Brushed Gold Minimalist Bangle",
    category: "Fashion Accessories",
    description: "Architectural 18K gold PVD waterproof wrist cuff crafted in solid surgical stainless steel that never tarnishes or fades.",
    price: 14500,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1611591475837-9755b0a70f07?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "polarized-square-eyewear",
    name: "Square Frame Polarized Sunglasses",
    category: "Fashion Accessories",
    description: "Handcrafted Italian cellulose acetate frames equipped with UV400 polarized bronze lenses and custom 5-barrel barrel hinges.",
    price: 16000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "chronograph-mesh-watch",
    name: "Minimalist Noir Chronograph Watch",
    category: "Fashion Accessories",
    description: "40mm matte black 316L steel timepiece with scratch-resistant sapphire crystal glass, Japanese quartz movement, and Milanese magnetic mesh band.",
    price: 38000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "twisted-rope-chain",
    name: "18K Gold PVD Waterproof Rope Chain (5mm)",
    category: "Fashion Accessories",
    description: "Diamond-cut classic rope chain double-coated in 18-karat yellow gold over hypoallergenic surgical steel for lifetime tarnish resistance.",
    price: 18500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tortoise-aviator-glasses",
    name: "Vintage Tortoiseshell Acetate Aviators",
    category: "Fashion Accessories",
    description: "Warm amber tortoiseshell sunglasses featuring titanium double bridge and anti-reflective olive gradient polarized UV400 lenses.",
    price: 15000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "leather-cardholder-wallet",
    name: "Bifold Pebble Leather Cardholder Wallet",
    category: "Fashion Accessories",
    description: "Ultra-slim 6-slot pocket card case in full-grain French calfskin with central currency fold and integrated RFID shielding technology.",
    price: 12500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "silk-twill-scarf",
    name: "Hand-Rolled Silk Twill Pocket Square",
    category: "Fashion Accessories",
    description: "Pure mulberry silk twill with delicate hand-rolled edges, decorated in subtle geometric architectural micro-patterns.",
    price: 11000,
    available: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cuban-link-chain-bracelet-set",
    name: "18K Gold-Plated Heavy Cuban Link Chain & Bracelet Set",
    category: "Fashion Accessories",
    description: "12mm diamond-cut Miami Cuban link necklace and matching bracelet plated in 5 microns of 18K yellow gold with triple-security box clasp.",
    price: 28000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "coral-bead-gold-accent-bracelet",
    name: "Artisanal Red Coral Bead & 18K Gold Accent Bracelet",
    category: "Fashion Accessories",
    description: "Natural polished Mediterranean red coral beads strung with solid 18K gold-plated spacer rings and a discreet Bea Luxe logo disc.",
    price: 22000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "oversized-flat-top-shield-sunglasses",
    name: "Oversized Flat-Top Gradient Shield Sunglasses",
    category: "Fashion Accessories",
    description: "Dramatic one-piece frameless gradient lens with polished gold metal brow bar, UV400 protection, and anti-reflective inner coating.",
    price: 16500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "tonneau-skeleton-silicon-watch",
    name: "Automatic Tonneau Skeleton Watch with Silicon Strap",
    category: "Fashion Accessories",
    description: "Curved ergonomic tonneau stainless steel casing with transparent open-worked dial, luminous hands, and sweat-resistant ribbed fluororubber strap.",
    price: 46000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"
  },
  // =========================================================================
  // 6. KITCHEN ITEMS (11 Pieces)
  // =========================================================================
  {
    id: "japanese-chef-knife-block",
    name: "Japanese Precision Cutlery 5-Piece Set",
    category: "Kitchen Items",
    description: "High-carbon stainless steel chef knives hand-honed to a 15-degree edge, presented in a natural solid acacia wood magnetic block.",
    price: 38000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fluted-amber-tumblers",
    name: "Fluted Amber Borosilicate Tumblers (Set of 4)",
    category: "Kitchen Items",
    description: "Handblown thermal-shock resistant borosilicate ribbed glassware in rich warm amber for iced matcha, coffee, and evening spritzes.",
    price: 18500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cast-iron-dutch-oven",
    name: "Matte Enamelled Cast Iron Dutch Oven (5.5L)",
    category: "Kitchen Items",
    description: "Heavy-gauge cast iron cocotte with self-basting lid spikes and chip-proof satin enamel interior for slow braises, stews, and bread.",
    price: 42000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "stoneware-dinner-set",
    name: "Speckled Ceramic Stoneware 16-Piece Set",
    category: "Kitchen Items",
    description: "Organically shaped dinner plates, side plates, and bowls finished with hand-applied reactive oatmeal glaze and exposed clay rim.",
    price: 48000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "brass-pour-over-kettle",
    name: "Brushed Brass Gooseneck Drip Kettle",
    category: "Kitchen Items",
    description: "Counterbalanced gooseneck spout for precise water delivery, complete with integrated dial thermometer and ergonomic walnut timber handle.",
    price: 22500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "marble-mortar-pestle",
    name: "Solid White Carrara Marble Mortar & Pestle",
    category: "Kitchen Items",
    description: "Hand-turned from solid Carrara marble with a polished exterior and unpolished coarse grinding bowl to effortlessly pulverize whole spices and garlic.",
    price: 19000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "acacia-charcuterie-board",
    name: "End-Grain Acacia Charcuterie Serving Board",
    category: "Kitchen Items",
    description: "Self-healing end-grain hardwood serving slab with perimeter crumb groove, brushed brass suspension ring, and food-safe wax polish.",
    price: 16500,
    available: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "electric-yam-pounder-mincer",
    name: "Multi-Speed Electric Yam Pounder & Meat Mincer (3L)",
    category: "Kitchen Items",
    description: "Heavy-duty 1000W stainless steel twin-blade food processor and automatic yam pounder engineered for smooth, lump-free Nigerian swallow in under 2 minutes.",
    price: 34000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "ceramic-granite-cookware-12pc",
    name: "12-Piece Ceramic Non-Stick Granite Cookware Set",
    category: "Kitchen Items",
    description: "Cream ivory mineral granite non-stick pot and pan ensemble with heat-resistant wood-effect handles, tempered glass lids, and induction bottoms.",
    price: 58000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "dual-zone-digital-air-fryer",
    name: "Dual-Zone Digital Touch Air Fryer (8.5L)",
    category: "Kitchen Items",
    description: "Large-capacity dual-basket air fryer with rose gold control dials, viewing windows, sync-cook technology, and 8 pre-programmed smart modes.",
    price: 65000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "electric-gravity-spice-grinder",
    name: "Rechargeable Electric Gravity Pepper & Spice Grinder",
    category: "Kitchen Items",
    description: "Matte black stainless steel mill with ceramic burr, USB-C fast charging, adjustable coarseness, and blue LED illumination when tilted.",
    price: 15500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80"
  },
  // =========================================================================
  // 7. HOUSEHOLD ITEMS (11 Pieces)
  // =========================================================================
  {
    id: "sculptural-aroma-diffuser",
    name: "Matte Ceramic Ultrasonic Diffuser",
    category: "Household Items",
    description: "Unglazed terracotta ceramic ambient diffuser with whisper-quiet ultrasonic atomization and soft 2-level warm candlelight illumination.",
    price: 26000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "turkish-waffle-throw",
    name: "Turkish Honeycomb Waffle Cotton Throw",
    category: "Household Items",
    description: "100% pre-washed Aegean long-staple cotton woven into breathable honeycomb waffle texture in a calming natural biscuit stone tone.",
    price: 22000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "botanical-soy-candle",
    name: "Smoked Vanilla & Vetiver Candle",
    category: "Household Items",
    description: "Hand-poured slow-burning coconut-soy wax in heavy amber apothecary jar with twin FSC-certified crackling wooden wicks (65-hour burn).",
    price: 14500,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ceramic-ribbed-pedestal-vase",
    name: "Sculptural Fluted Ceramic Pedestal Vase",
    category: "Household Items",
    description: "Handmade ceramic stoneware urn featuring vertical fluted ribs and a chalky matte sandstone texture for dried florals and botanicals.",
    price: 19500,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "linen-duvet-cover-set",
    name: "Stonewashed French Flax Linen Bedding Set",
    category: "Household Items",
    description: "Woven from 100% certified Normandy flax and vintage washed for effortless rumpled drape, temperature-regulating breathability, and natural antibacterial softness.",
    price: 42000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "travertine-catchall-tray",
    name: "Honed Roman Travertine Stone Catchall Tray",
    category: "Household Items",
    description: "Carved from a single block of authentic unfilled Italian beige travertine with chamfered edges, showcasing natural stone pore veining.",
    price: 21000,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cashmere-fringe-blanket",
    name: "Plush Cashmere & Lambswool Fringe Throw",
    category: "Household Items",
    description: "Jacquard woven from fine Scottish lambswool and Mongolian cashmere with 10cm hand-twisted fringes in timeless oatmeal and camel check.",
    price: 32000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "amber-glass-diffuser-bottle",
    name: "Apothecary Amber Reed Diffuser (200ml)",
    category: "Household Items",
    description: "Heavy handblown amber flacon paired with 8 black porous rattan reeds, infused with cold-pressed Santal, white cedar, and frankincense oils.",
    price: 16500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "flame-mist-ambient-diffuser",
    name: "Ultrasonic Flame Mist Ambient Aroma Diffuser",
    category: "Household Items",
    description: "The viral fireplace humidifier combining realistic warm amber LED flame illumination with cool ultrasonic essential oil mist atomization.",
    price: 28000,
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "crystal-rose-touch-lamp",
    name: "Rechargeable Crystal Rose Touch Bedside Table Lamp",
    category: "Household Items",
    description: "Faceted acrylic crystal cylinder casting a 3D blooming rose light projection with 16 RGB color modes and touch dimmer remote control.",
    price: 17500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "wabi-sabi-donut-ceramic-vase",
    name: "Nordic Wabi-Sabi Hollow Donut Ceramic Vase",
    category: "Household Items",
    description: "The iconic circular sculptural matte cream vase with granular unglazed terracotta finish, ideal for pampas grass and modern interior styling.",
    price: 18500,
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80"
  }
];
