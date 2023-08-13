import { Product } from "@prisma/client";

export type ProductWithImages = Product & { images: { url: string }[] };
