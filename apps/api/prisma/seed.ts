import "dotenv/config";
import bcrypt from "bcrypt";

import { prisma } from "../src/lib/prisma.js";

// ======================================================
// TYPES
// ======================================================

type SizeSeed = {
  name: string;
  type: string;
  sortOrder: number;
};

type ColorSeed = {
  name: string;
  hexCode: string;
};

type ProductImageSeed = {
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
};

type ProductVariantSeed = {
  sizeName: string;
  sizeType: string;
  colorName: string;

  sku: string;

  stockQty: number;
  reservedQty?: number;
  lowStockThreshold?: number;
};

type ProductSeed = {
  name: string;
  brand: string | null;
  sku: string;
  description: string;

  categoryName: string;
  sportNames: string[];

  basePrice: number;

  discountType: "PERCENTAGE" | "FIXED_AMOUNT" | null;

  discountValue: number | null;

  status: "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";

  images: ProductImageSeed[];

  variants: ProductVariantSeed[];
};

// ======================================================
// HELPERS
// ======================================================

async function findOrCreateSize(data: SizeSeed) {
  const existingSize = await prisma.size.findFirst({
    where: {
      name: data.name,
      type: data.type,
    },
  });

  if (existingSize) {
    return prisma.size.update({
      where: {
        id: existingSize.id,
      },
      data: {
        sortOrder: data.sortOrder,
        status: "ACTIVE",
      },
    });
  }

  return prisma.size.create({
    data: {
      name: data.name,
      type: data.type,
      sortOrder: data.sortOrder,
      status: "ACTIVE",
    },
  });
}

async function findOrCreateColor(data: ColorSeed) {
  const existingColor = await prisma.color.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingColor) {
    return prisma.color.update({
      where: {
        id: existingColor.id,
      },
      data: {
        hexCode: data.hexCode,
        status: "ACTIVE",
      },
    });
  }

  return prisma.color.create({
    data: {
      name: data.name,
      hexCode: data.hexCode,
      status: "ACTIVE",
    },
  });
}

// ======================================================
// MAIN
// ======================================================

async function main() {
  console.log("");
  console.log("========================================");
  console.log("🌱 STARTING KINETIX DATABASE SEED");
  console.log("========================================");
  console.log("");

  // ====================================================
  // USERS
  // ====================================================

  const password = "Password123!";

  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = await prisma.user.upsert({
    where: {
      email: "superadmin@kinetix.com",
    },

    update: {
      fullName: "Kinetix Super Admin",
      password: hashedPassword,
      isVerify: true,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },

    create: {
      email: "superadmin@kinetix.com",
      fullName: "Kinetix Super Admin",
      password: hashedPassword,
      isVerify: true,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@kinetix.com",
    },

    update: {
      fullName: "Kinetix Admin",
      password: hashedPassword,
      isVerify: true,
      role: "ADMIN",
      status: "ACTIVE",
    },

    create: {
      email: "admin@kinetix.com",
      fullName: "Kinetix Admin",
      password: hashedPassword,
      isVerify: true,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const customer = await prisma.user.upsert({
    where: {
      email: "customer@kinetix.com",
    },

    update: {
      fullName: "Budi Santoso",
      password: hashedPassword,
      isVerify: true,
      role: "USER",
      status: "ACTIVE",
    },

    create: {
      email: "customer@kinetix.com",
      fullName: "Budi Santoso",
      password: hashedPassword,
      isVerify: true,
      role: "USER",
      status: "ACTIVE",
    },
  });

  console.log("✅ Users seeded");

  // ====================================================
  // CUSTOMER ADDRESS
  // ====================================================

  const existingAddress = await prisma.address.findFirst({
    where: {
      userId: customer.id,
      label: "Rumah",
    },
  });

  if (existingAddress) {
    await prisma.address.update({
      where: {
        id: existingAddress.id,
      },

      data: {
        recipientName: "Budi Santoso",
        phone: "081234567890",

        provinceId: "NTT",
        provinceName: "Nusa Tenggara Timur",

        cityId: "KUPANG",
        cityName: "Kota Kupang",

        districtName: "Oebobo",

        postalCode: "85111",

        detail: "Jl. Frans Seda No. 10, dekat lapangan futsal",

        isDefault: true,
      },
    });
  } else {
    await prisma.address.create({
      data: {
        userId: customer.id,

        label: "Rumah",

        recipientName: "Budi Santoso",

        phone: "081234567890",

        provinceId: "NTT",

        provinceName: "Nusa Tenggara Timur",

        cityId: "KUPANG",

        cityName: "Kota Kupang",

        districtName: "Oebobo",

        postalCode: "85111",

        detail: "Jl. Frans Seda No. 10, dekat lapangan futsal",

        isDefault: true,
      },
    });
  }

  console.log("✅ Address seeded");

  // ====================================================
  // PRODUCT CATEGORIES
  // ====================================================

  const categoryNames = [
    "Shoes",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Equipment",
    "Accessories",
  ];

  const categoryMap = new Map<string, number>();

  for (const name of categoryNames) {
    const category = await prisma.productCategory.upsert({
      where: {
        name,
      },

      update: {
        status: "ACTIVE",
      },

      create: {
        name,
        status: "ACTIVE",
      },
    });

    categoryMap.set(category.name, category.id);
  }

  console.log("✅ Product categories seeded");

  // ====================================================
  // SPORT CATEGORIES
  // ====================================================

  const sportSeeds = [
    {
      name: "Football",

      description: "Football shoes, apparel, and performance equipment.",

      imageUrl: "https://placehold.co/800x800/png?text=Football",
    },

    {
      name: "Running",

      description: "Running shoes and apparel for every distance.",

      imageUrl: "https://placehold.co/800x800/png?text=Running",
    },

    {
      name: "Basketball",

      description: "Basketball footwear, apparel, and equipment.",

      imageUrl: "https://placehold.co/800x800/png?text=Basketball",
    },

    {
      name: "Gym",

      description: "Training essentials for strength and conditioning.",

      imageUrl: "https://placehold.co/800x800/png?text=Gym",
    },

    {
      name: "Badminton",

      description: "Badminton rackets, shoes, and accessories.",

      imageUrl: "https://placehold.co/800x800/png?text=Badminton",
    },

    {
      name: "Tennis",

      description: "Tennis rackets, apparel, and performance essentials.",

      imageUrl: "https://placehold.co/800x800/png?text=Tennis",
    },
  ];

  const sportMap = new Map<string, number>();

  for (const sportSeed of sportSeeds) {
    const sportCategory = await prisma.sportCategory.upsert({
      where: {
        name: sportSeed.name,
      },

      update: {
        description: sportSeed.description,

        imageUrl: sportSeed.imageUrl,

        status: "ACTIVE",
      },

      create: {
        name: sportSeed.name,

        description: sportSeed.description,

        imageUrl: sportSeed.imageUrl,

        status: "ACTIVE",
      },
    });

    sportMap.set(sportCategory.name, sportCategory.id);
  }

  console.log("✅ Sport categories seeded");

  // ====================================================
  // SIZES
  // ====================================================

  const sizeSeeds: SizeSeed[] = [
    {
      name: "39",
      type: "shoe",
      sortOrder: 1,
    },
    {
      name: "40",
      type: "shoe",
      sortOrder: 2,
    },
    {
      name: "41",
      type: "shoe",
      sortOrder: 3,
    },
    {
      name: "42",
      type: "shoe",
      sortOrder: 4,
    },
    {
      name: "43",
      type: "shoe",
      sortOrder: 5,
    },
    {
      name: "44",
      type: "shoe",
      sortOrder: 6,
    },

    {
      name: "S",
      type: "apparel",
      sortOrder: 1,
    },
    {
      name: "M",
      type: "apparel",
      sortOrder: 2,
    },
    {
      name: "L",
      type: "apparel",
      sortOrder: 3,
    },
    {
      name: "XL",
      type: "apparel",
      sortOrder: 4,
    },

    {
      name: "ONE SIZE",
      type: "general",
      sortOrder: 1,
    },
  ];

  const sizeMap = new Map<string, number>();

  for (const sizeSeed of sizeSeeds) {
    const size = await findOrCreateSize(sizeSeed);

    sizeMap.set(`${size.type}:${size.name}`, size.id);
  }

  console.log("✅ Sizes seeded");

  // ====================================================
  // COLORS
  // ====================================================

  const colorSeeds: ColorSeed[] = [
    {
      name: "Black",
      hexCode: "#000000",
    },

    {
      name: "White",
      hexCode: "#FFFFFF",
    },

    {
      name: "Red",
      hexCode: "#EF4444",
    },

    {
      name: "Blue",
      hexCode: "#2563EB",
    },

    {
      name: "Orange",
      hexCode: "#F97316",
    },

    {
      name: "Green",
      hexCode: "#16A34A",
    },

    {
      name: "Grey",
      hexCode: "#6B7280",
    },
  ];

  const colorMap = new Map<string, number>();

  for (const colorSeed of colorSeeds) {
    const color = await findOrCreateColor(colorSeed);

    colorMap.set(color.name, color.id);
  }

  console.log("✅ Colors seeded");

  // ====================================================
  // PRODUCTS
  // ====================================================

  const productSeeds: ProductSeed[] = [
    // ==================================================
    // 1. NIKE PEGASUS 41
    // ==================================================

    {
      name: "Nike Pegasus 41",

      brand: "Nike",

      sku: "KTX-NIKE-PEG41",

      description:
        "Responsive daily running shoes designed for comfortable miles and everyday movement.",

      categoryName: "Shoes",

      sportNames: ["Running", "Gym"],

      basePrice: 2199000,

      discountType: "PERCENTAGE",

      discountValue: 10,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Nike+Pegasus+41",

          altText: "Nike Pegasus 41 primary image",

          isPrimary: true,

          sortOrder: 0,
        },

        {
          imageUrl:
            "https://placehold.co/800x800/png?text=Nike+Pegasus+41+Side",

          altText: "Nike Pegasus 41 side view",

          isPrimary: false,

          sortOrder: 1,
        },
      ],

      variants: [
        {
          sizeName: "40",
          sizeType: "shoe",
          colorName: "White",

          sku: "KTX-NIKE-PEG41-40-WHT",

          stockQty: 8,
        },

        {
          sizeName: "41",
          sizeType: "shoe",
          colorName: "White",

          sku: "KTX-NIKE-PEG41-41-WHT",

          stockQty: 6,
        },

        {
          sizeName: "42",
          sizeType: "shoe",
          colorName: "White",

          sku: "KTX-NIKE-PEG41-42-WHT",

          stockQty: 4,
        },

        {
          sizeName: "42",
          sizeType: "shoe",
          colorName: "Black",

          sku: "KTX-NIKE-PEG41-42-BLK",

          stockQty: 7,
        },
      ],
    },

    // ==================================================
    // 2. ADIDAS PREDATOR ELITE FG
    // ==================================================

    {
      name: "Adidas Predator Elite FG",

      brand: "Adidas",

      sku: "KTX-ADI-PRED-ELITE",

      description:
        "Premium football boots designed for control, precision, and match-day performance.",

      categoryName: "Shoes",

      sportNames: ["Football"],

      basePrice: 2499000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Adidas+Predator",

          altText: "Adidas Predator Elite FG primary image",

          isPrimary: true,

          sortOrder: 0,
        },

        {
          imageUrl:
            "https://placehold.co/800x800/png?text=Adidas+Predator+Side",

          altText: "Adidas Predator Elite FG side view",

          isPrimary: false,

          sortOrder: 1,
        },
      ],

      variants: [
        {
          sizeName: "41",
          sizeType: "shoe",
          colorName: "Black",

          sku: "KTX-ADI-PRED-41-BLK",

          stockQty: 5,
        },

        {
          sizeName: "42",
          sizeType: "shoe",
          colorName: "Black",

          sku: "KTX-ADI-PRED-42-BLK",

          stockQty: 2,
        },

        {
          sizeName: "43",
          sizeType: "shoe",
          colorName: "Black",

          sku: "KTX-ADI-PRED-43-BLK",

          stockQty: 4,
        },

        {
          sizeName: "42",
          sizeType: "shoe",
          colorName: "White",

          sku: "KTX-ADI-PRED-42-WHT",

          stockQty: 3,
        },
      ],
    },

    // ==================================================
    // 3. PUMA FUTURE 8
    // ==================================================

    {
      name: "Puma Future 8 Match FG/AG",

      brand: "Puma",

      sku: "KTX-PUMA-FUTURE8",

      description:
        "Football boots created for agile movement, ball control, and dynamic play.",

      categoryName: "Shoes",

      sportNames: ["Football"],

      basePrice: 1399000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Puma+Future+8",

          altText: "Puma Future 8 Match FG AG",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "41",
          sizeType: "shoe",
          colorName: "Blue",

          sku: "KTX-PUMA-FUT8-41-BLU",

          stockQty: 6,
        },

        {
          sizeName: "42",
          sizeType: "shoe",
          colorName: "Blue",

          sku: "KTX-PUMA-FUT8-42-BLU",

          stockQty: 5,
        },

        {
          sizeName: "43",
          sizeType: "shoe",
          colorName: "White",

          sku: "KTX-PUMA-FUT8-43-WHT",

          stockQty: 3,
        },
      ],
    },

    // ==================================================
    // 4. ASICS GEL KAYANO
    // ==================================================

    {
      name: "Asics Gel-Kayano 31",

      brand: "Asics",

      sku: "KTX-ASICS-KAYANO31",

      description:
        "Supportive running shoes designed for stability, comfort, and long-distance training.",

      categoryName: "Shoes",

      sportNames: ["Running"],

      basePrice: 2599000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Asics+Gel+Kayano+31",

          altText: "Asics Gel-Kayano 31",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "40",
          sizeType: "shoe",
          colorName: "Grey",

          sku: "KTX-ASICS-K31-40-GRY",

          stockQty: 4,
        },

        {
          sizeName: "41",
          sizeType: "shoe",
          colorName: "Grey",

          sku: "KTX-ASICS-K31-41-GRY",

          stockQty: 6,
        },

        {
          sizeName: "42",
          sizeType: "shoe",
          colorName: "Black",

          sku: "KTX-ASICS-K31-42-BLK",

          stockQty: 5,
        },
      ],
    },

    // ==================================================
    // 5. NIKE DRI-FIT TRAINING TEE
    // ==================================================

    {
      name: "Nike Dri-FIT Training Tee",

      brand: "Nike",

      sku: "KTX-NIKE-DRIFIT-TEE",

      description:
        "Lightweight performance training shirt with sweat-wicking comfort.",

      categoryName: "Tops",

      sportNames: ["Running", "Gym"],

      basePrice: 549000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Nike+Dri-FIT",

          altText: "Nike Dri-FIT Training Tee",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "S",
          sizeType: "apparel",
          colorName: "Black",

          sku: "KTX-NIKE-DRI-S-BLK",

          stockQty: 10,
        },

        {
          sizeName: "M",
          sizeType: "apparel",
          colorName: "Black",

          sku: "KTX-NIKE-DRI-M-BLK",

          stockQty: 12,
        },

        {
          sizeName: "L",
          sizeType: "apparel",
          colorName: "Black",

          sku: "KTX-NIKE-DRI-L-BLK",

          stockQty: 8,
        },

        {
          sizeName: "XL",
          sizeType: "apparel",
          colorName: "Black",

          sku: "KTX-NIKE-DRI-XL-BLK",

          stockQty: 5,
        },
      ],
    },

    // ==================================================
    // 6. ADIDAS RUNNING TEE
    // ==================================================

    {
      name: "Adidas Own The Run Tee",

      brand: "Adidas",

      sku: "KTX-ADI-OTR-TEE",

      description:
        "Breathable running shirt designed for daily training and comfortable movement.",

      categoryName: "Tops",

      sportNames: ["Running"],

      basePrice: 599000,

      discountType: "PERCENTAGE",

      discountValue: 15,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Adidas+Running+Tee",

          altText: "Adidas Own The Run Tee",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "S",
          sizeType: "apparel",
          colorName: "Blue",

          sku: "KTX-ADI-OTR-S-BLU",

          stockQty: 7,
        },

        {
          sizeName: "M",
          sizeType: "apparel",
          colorName: "Blue",

          sku: "KTX-ADI-OTR-M-BLU",

          stockQty: 9,
        },

        {
          sizeName: "L",
          sizeType: "apparel",
          colorName: "Blue",

          sku: "KTX-ADI-OTR-L-BLU",

          stockQty: 6,
        },
      ],
    },

    // ==================================================
    // 7. NIKE RUNNING SHORTS
    // ==================================================

    {
      name: "Nike Challenger Running Shorts",

      brand: "Nike",

      sku: "KTX-NIKE-CHAL-SHORT",

      description:
        "Lightweight running shorts designed for comfortable daily training.",

      categoryName: "Bottoms",

      sportNames: ["Running", "Gym"],

      basePrice: 699000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Nike+Running+Shorts",

          altText: "Nike Challenger Running Shorts",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "S",
          sizeType: "apparel",
          colorName: "Black",

          sku: "KTX-NIKE-CHAL-S-BLK",

          stockQty: 8,
        },

        {
          sizeName: "M",
          sizeType: "apparel",
          colorName: "Black",

          sku: "KTX-NIKE-CHAL-M-BLK",

          stockQty: 10,
        },

        {
          sizeName: "L",
          sizeType: "apparel",
          colorName: "Black",

          sku: "KTX-NIKE-CHAL-L-BLK",

          stockQty: 6,
        },
      ],
    },

    // ==================================================
    // 8. ADIDAS TRACK JACKET
    // ==================================================

    {
      name: "Adidas Tiro 24 Track Jacket",

      brand: "Adidas",

      sku: "KTX-ADI-TIRO24-JKT",

      description:
        "Sport-inspired track jacket designed for training and everyday movement.",

      categoryName: "Outerwear",

      sportNames: ["Football", "Gym"],

      basePrice: 1099000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Adidas+Tiro+24",

          altText: "Adidas Tiro 24 Track Jacket",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "M",
          sizeType: "apparel",
          colorName: "Blue",

          sku: "KTX-ADI-TIRO24-M-BLU",

          stockQty: 7,
        },

        {
          sizeName: "L",
          sizeType: "apparel",
          colorName: "Blue",

          sku: "KTX-ADI-TIRO24-L-BLU",

          stockQty: 5,
        },

        {
          sizeName: "XL",
          sizeType: "apparel",
          colorName: "Blue",

          sku: "KTX-ADI-TIRO24-XL-BLU",

          stockQty: 3,
        },
      ],
    },

    // ==================================================
    // 9. MOLTEN BASKETBALL
    // ==================================================

    {
      name: "Molten BG4500 Basketball",

      brand: "Molten",

      sku: "KTX-MOLTEN-BG4500",

      description:
        "Competition basketball designed for consistent grip and indoor performance.",

      categoryName: "Equipment",

      sportNames: ["Basketball"],

      basePrice: 1299000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Molten+BG4500",

          altText: "Molten BG4500 Basketball",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "ONE SIZE",
          sizeType: "general",
          colorName: "Orange",

          sku: "KTX-MOLTEN-BG4500-ORG",

          stockQty: 9,
        },
      ],
    },

    // ==================================================
    // 10. YONEX ASTROX
    // ==================================================

    {
      name: "Yonex Astrox 88D Pro",

      brand: "Yonex",

      sku: "KTX-YONEX-AST88D",

      description:
        "High-performance badminton racket engineered for powerful rear-court attacks.",

      categoryName: "Equipment",

      sportNames: ["Badminton"],

      basePrice: 3299000,

      discountType: "FIXED_AMOUNT",

      discountValue: 200000,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Yonex+Astrox+88D",

          altText: "Yonex Astrox 88D Pro",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "ONE SIZE",
          sizeType: "general",
          colorName: "Black",

          sku: "KTX-YONEX-AST88D-BLK",

          stockQty: 4,
        },
      ],
    },

    // ==================================================
    // 11. WILSON BLADE
    // ==================================================

    {
      name: "Wilson Blade 98 V9",

      brand: "Wilson",

      sku: "KTX-WILSON-BLADE98",

      description:
        "Performance tennis racket built for precision, control, and confident shot making.",

      categoryName: "Equipment",

      sportNames: ["Tennis"],

      basePrice: 3499000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Wilson+Blade+98",

          altText: "Wilson Blade 98 V9",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "ONE SIZE",
          sizeType: "general",
          colorName: "Green",

          sku: "KTX-WILSON-BLADE98-GRN",

          stockQty: 5,
        },
      ],
    },

    // ==================================================
    // 12. ADIDAS DUFFEL BAG
    // ==================================================

    {
      name: "Adidas Linear Duffel Bag",

      brand: "Adidas",

      sku: "KTX-ADI-LINEAR-DUFFEL",

      description:
        "Versatile sports duffel bag for training, travel, and everyday gear.",

      categoryName: "Accessories",

      sportNames: ["Gym"],

      basePrice: 649000,

      discountType: null,

      discountValue: null,

      status: "ACTIVE",

      images: [
        {
          imageUrl: "https://placehold.co/800x800/png?text=Adidas+Duffel+Bag",

          altText: "Adidas Linear Duffel Bag",

          isPrimary: true,

          sortOrder: 0,
        },
      ],

      variants: [
        {
          sizeName: "ONE SIZE",
          sizeType: "general",
          colorName: "Black",

          sku: "KTX-ADI-DUFFEL-BLK",

          stockQty: 11,
        },
      ],
    },
  ];

  // ====================================================
  // PRODUCT & VARIANT MAPS
  // ====================================================

  const productMap = new Map<string, number>();

  const variantMap = new Map<
    string,
    {
      id: number;
      stockQty: number;
    }
  >();

  // ====================================================
  // CREATE PRODUCTS
  // ====================================================

  for (const productSeed of productSeeds) {
    const categoryId = categoryMap.get(productSeed.categoryName);

    if (!categoryId) {
      throw new Error(`Category not found: ${productSeed.categoryName}`);
    }

    // --------------------------------------------------
    // PRODUCT
    // --------------------------------------------------

    const product = await prisma.product.upsert({
      where: {
        sku: productSeed.sku,
      },

      update: {
        name: productSeed.name,

        brand: productSeed.brand,

        description: productSeed.description,

        basePrice: productSeed.basePrice,

        discountType: productSeed.discountType,

        discountValue: productSeed.discountValue,

        status: productSeed.status,

        categoryId,
      },

      create: {
        name: productSeed.name,

        brand: productSeed.brand,

        sku: productSeed.sku,

        description: productSeed.description,

        basePrice: productSeed.basePrice,

        discountType: productSeed.discountType,

        discountValue: productSeed.discountValue,

        status: productSeed.status,

        categoryId,
      },
    });

    productMap.set(product.sku, product.id);

    // --------------------------------------------------
    // PRODUCT SPORT LINKS
    // --------------------------------------------------

    await prisma.productSportCategory.deleteMany({
      where: {
        productId: product.id,
      },
    });

    const sportLinkData = [];

    for (const sportName of productSeed.sportNames) {
      const sportCategoryId = sportMap.get(sportName);

      if (!sportCategoryId) {
        throw new Error(`Sport category not found: ${sportName}`);
      }

      sportLinkData.push({
        productId: product.id,
        sportCategoryId,
      });
    }

    if (sportLinkData.length > 0) {
      await prisma.productSportCategory.createMany({
        data: sportLinkData,
      });
    }

    // --------------------------------------------------
    // PRODUCT IMAGES
    // --------------------------------------------------

    await prisma.productImage.deleteMany({
      where: {
        productId: product.id,
      },
    });

    if (productSeed.images.length > 0) {
      await prisma.productImage.createMany({
        data: productSeed.images.map((image) => ({
          productId: product.id,

          imageUrl: image.imageUrl,

          altText: image.altText,

          isPrimary: image.isPrimary,

          sortOrder: image.sortOrder,
        })),
      });
    }

    // --------------------------------------------------
    // PRODUCT VARIANTS
    // --------------------------------------------------

    for (const variantSeed of productSeed.variants) {
      const sizeId = sizeMap.get(
        `${variantSeed.sizeType}:${variantSeed.sizeName}`,
      );

      const colorId = colorMap.get(variantSeed.colorName);

      if (!sizeId) {
        throw new Error(
          `Size not found: ${variantSeed.sizeType}:${variantSeed.sizeName}`,
        );
      }

      if (!colorId) {
        throw new Error(`Color not found: ${variantSeed.colorName}`);
      }

      const variant = await prisma.productVariant.upsert({
        where: {
          sku: variantSeed.sku,
        },

        update: {
          productId: product.id,

          sizeId,

          colorId,

          stockQty: variantSeed.stockQty,

          reservedQty: variantSeed.reservedQty ?? 0,

          lowStockThreshold: variantSeed.lowStockThreshold ?? 3,

          status: "ACTIVE",
        },

        create: {
          productId: product.id,

          sizeId,

          colorId,

          sku: variantSeed.sku,

          stockQty: variantSeed.stockQty,

          reservedQty: variantSeed.reservedQty ?? 0,

          lowStockThreshold: variantSeed.lowStockThreshold ?? 3,

          status: "ACTIVE",
        },
      });

      variantMap.set(variant.sku, {
        id: variant.id,

        stockQty: variant.stockQty,
      });
    }
  }

  console.log("✅ Products, images, sports, and variants seeded");

  // ====================================================
  // STOCK MOVEMENTS
  // ====================================================

  await prisma.stockMovement.deleteMany({
    where: {
      referenceType: "SEED_INITIAL_STOCK",
    },
  });

  for (const [sku, variant] of variantMap.entries()) {
    await prisma.stockMovement.create({
      data: {
        variantId: variant.id,

        type: "IN",

        qty: variant.stockQty,

        beforeQty: 0,

        afterQty: variant.stockQty,

        reason: `Initial dummy stock for ${sku}`,

        referenceType: "SEED_INITIAL_STOCK",

        referenceId: sku,

        createdById: admin.id,
      },
    });
  }

  console.log("✅ Stock movements seeded");

  // ====================================================
  // ACTIVE CART
  // ====================================================

  let activeCart = await prisma.cart.findFirst({
    where: {
      userId: customer.id,

      status: "ACTIVE",
    },
  });

  if (!activeCart) {
    activeCart = await prisma.cart.create({
      data: {
        userId: customer.id,

        status: "ACTIVE",
      },
    });
  }

  // Reset dummy cart items
  await prisma.cartItem.deleteMany({
    where: {
      cartId: activeCart.id,
    },
  });

  const pegasusVariant = variantMap.get("KTX-NIKE-PEG41-42-BLK");

  const driFitVariant = variantMap.get("KTX-NIKE-DRI-M-BLK");

  if (pegasusVariant) {
    await prisma.cartItem.create({
      data: {
        cartId: activeCart.id,

        variantId: pegasusVariant.id,

        qty: 1,
      },
    });
  }

  if (driFitVariant) {
    await prisma.cartItem.create({
      data: {
        cartId: activeCart.id,

        variantId: driFitVariant.id,

        qty: 2,
      },
    });
  }

  console.log("✅ Cart seeded");

  // ====================================================
  // WISHLIST
  // ====================================================

  const yonexProductId = productMap.get("KTX-YONEX-AST88D");

  const predatorProductId = productMap.get("KTX-ADI-PRED-ELITE");

  if (yonexProductId) {
    await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId: customer.id,

          productId: yonexProductId,
        },
      },

      update: {},

      create: {
        userId: customer.id,

        productId: yonexProductId,
      },
    });
  }

  if (predatorProductId) {
    await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId: customer.id,

          productId: predatorProductId,
        },
      },

      update: {},

      create: {
        userId: customer.id,

        productId: predatorProductId,
      },
    });
  }

  console.log("✅ Wishlist seeded");

  // ====================================================
  // VOUCHER
  // ====================================================

  const voucher = await prisma.voucher.upsert({
    where: {
      code: "KINETIX10",
    },

    update: {
      type: "PERCENTAGE",

      value: 10,

      minPurchase: 500000,

      maxDiscount: 150000,

      quota: 100,

      status: "ACTIVE",

      validFrom: new Date("2026-01-01T00:00:00.000Z"),

      validUntil: new Date("2026-12-31T23:59:59.000Z"),
    },

    create: {
      code: "KINETIX10",

      type: "PERCENTAGE",

      value: 10,

      minPurchase: 500000,

      maxDiscount: 150000,

      quota: 100,

      usedCount: 0,

      status: "ACTIVE",

      validFrom: new Date("2026-01-01T00:00:00.000Z"),

      validUntil: new Date("2026-12-31T23:59:59.000Z"),
    },
  });

  console.log("✅ Voucher seeded");

  // ====================================================
  // ORDER
  // ====================================================

  const adidasVariant = variantMap.get("KTX-ADI-PRED-42-BLK");

  if (!adidasVariant) {
    throw new Error("Adidas Predator variant not found");
  }

  const order = await prisma.order.upsert({
    where: {
      orderNumber: "KTX-2026-000001",
    },

    update: {
      userId: customer.id,

      status: "PAID",

      subtotal: 2499000,

      shippingCost: 35000,

      discountTotal: 150000,

      grandTotal: 2384000,

      recipientName: "Budi Santoso",

      recipientPhone: "081234567890",

      shippingAddressText:
        "Jl. Frans Seda No. 10, Oebobo, Kota Kupang, Nusa Tenggara Timur, 85111",
    },

    create: {
      userId: customer.id,

      orderNumber: "KTX-2026-000001",

      status: "PAID",

      subtotal: 2499000,

      shippingCost: 35000,

      discountTotal: 150000,

      grandTotal: 2384000,

      recipientName: "Budi Santoso",

      recipientPhone: "081234567890",

      shippingAddressText:
        "Jl. Frans Seda No. 10, Oebobo, Kota Kupang, Nusa Tenggara Timur, 85111",
    },
  });

  // ====================================================
  // ORDER ITEMS
  // ====================================================

  await prisma.orderItem.deleteMany({
    where: {
      orderId: order.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order.id,

      variantId: adidasVariant.id,

      productName: "Adidas Predator Elite FG",

      sizeName: "42",

      colorName: "Black",

      sku: "KTX-ADI-PRED-42-BLK",

      price: 2499000,

      qty: 1,

      subtotal: 2499000,
    },
  });

  console.log("✅ Order items seeded");

  // ====================================================
  // PAYMENT
  // ====================================================

  await prisma.payment.deleteMany({
    where: {
      orderId: order.id,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,

      provider: "MIDTRANS",

      method: "bank_transfer",

      status: "SUCCESS",

      amount: 2384000,

      token: "dummy-midtrans-token-000001",

      redirectUrl:
        "https://app.sandbox.midtrans.com/snap/v4/redirection/dummy-token",

      transactionId: "MIDTRANS-DUMMY-000001",

      expiredAt: new Date("2026-12-31T23:59:59.000Z"),

      paidAt: new Date("2026-07-01T10:00:00.000Z"),

      rawPayload: {
        source: "prisma-seed",

        transaction_status: "settlement",

        payment_type: "bank_transfer",
      },
    },
  });

  console.log("✅ Payment seeded");

  // ====================================================
  // SHIPMENT
  // ====================================================

  await prisma.shipment.upsert({
    where: {
      orderId: order.id,
    },

    update: {
      courierCode: "jne",

      courierName: "JNE",

      serviceCode: "REG",

      serviceName: "Regular",

      cost: 35000,

      etd: "2-4 hari",

      trackingNumber: null,

      status: "PENDING",

      shippedAt: null,

      deliveredAt: null,
    },

    create: {
      orderId: order.id,

      courierCode: "jne",

      courierName: "JNE",

      serviceCode: "REG",

      serviceName: "Regular",

      cost: 35000,

      etd: "2-4 hari",

      trackingNumber: null,

      status: "PENDING",
    },
  });

  console.log("✅ Shipment seeded");

  // ====================================================
  // INVOICE
  // ====================================================

  await prisma.invoice.upsert({
    where: {
      orderId: order.id,
    },

    update: {
      invoiceNumber: "INV-KTX-2026-000001",

      fileUrl: null,
    },

    create: {
      orderId: order.id,

      invoiceNumber: "INV-KTX-2026-000001",

      fileUrl: null,
    },
  });

  console.log("✅ Invoice seeded");

  // ====================================================
  // VOUCHER REDEMPTION
  // ====================================================

  await prisma.voucherRedemption.upsert({
    where: {
      orderId: order.id,
    },

    update: {
      voucherId: voucher.id,

      userId: customer.id,
    },

    create: {
      voucherId: voucher.id,

      userId: customer.id,

      orderId: order.id,
    },
  });

  const voucherUsageCount = await prisma.voucherRedemption.count({
    where: {
      voucherId: voucher.id,
    },
  });

  await prisma.voucher.update({
    where: {
      id: voucher.id,
    },

    data: {
      usedCount: voucherUsageCount,
    },
  });

  console.log("✅ Voucher redemption seeded");

  // ====================================================
  // FINISH
  // ====================================================

  console.log("");
  console.log("========================================");
  console.log("🎉 KINETIX SEED COMPLETED");
  console.log("========================================");
  console.log("");

  console.log("SUPER ADMIN");
  console.log(`ID       : ${superAdmin.id}`);
  console.log("Email    : superadmin@kinetix.com");
  console.log(`Password : ${password}`);

  console.log("");

  console.log("ADMIN");
  console.log(`ID       : ${admin.id}`);
  console.log("Email    : admin@kinetix.com");
  console.log(`Password : ${password}`);

  console.log("");

  console.log("CUSTOMER");
  console.log(`ID       : ${customer.id}`);
  console.log("Email    : customer@kinetix.com");
  console.log(`Password : ${password}`);

  console.log("");

  console.log(`Products : ${productSeeds.length}`);

  console.log(`Variants : ${variantMap.size}`);

  console.log("");
  console.log("========================================");
}

// ======================================================
// RUN
// ======================================================

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("");
    console.error("❌ KINETIX SEED FAILED");
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
