import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { ProductWithImages } from "@/app/types/product";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[API_PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body: Omit<ProductWithImages, "id"> = await request.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!body.name) {
      return new NextResponse("Product name is required", { status: 400 });
    }

    if (!body.price) {
      return new NextResponse("Product price is required", { status: 400 });
    }

    if (!body.images || body.images.length === 0) {
      return new NextResponse("Product images are required", {
        status: 400,
      });
    }

    if (!body.categoryId) {
      return new NextResponse("Product category ID is required", {
        status: 400,
      });
    }

    if (!body.sizeId) {
      return new NextResponse("Product size ID is required", { status: 400 });
    }

    if (!body.colorId) {
      return new NextResponse("Product color ID is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        storeId: params.storeId,
        categoryId: body.categoryId,
        sizeId: body.sizeId,
        colorId: body.colorId,
        name: body.name,
        price: body.price,
        images: {
          createMany: {
            data: body.images.map((image) => ({ url: image.url })),
          },
        },
        isFeatured: body.isFeatured,
        isArchived: body.isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[API_PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
