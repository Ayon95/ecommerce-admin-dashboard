import { ProductWithImages } from "@/app/types/product";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: { images: true, category: true, size: true, color: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[API_PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body: ProductWithImages = await request.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
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

    await prismadb.product.update({
      where: { id: params.productId },
      data: {
        storeId: params.storeId,
        categoryId: body.categoryId,
        sizeId: body.sizeId,
        colorId: body.colorId,
        name: body.name,
        price: body.price,
        images: {
          deleteMany: {},
        },
        isFeatured: body.isFeatured,
        isArchived: body.isArchived,
      },
    });

    const updatedProduct = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: body.images.map((image) => ({ url: image.url })),
          },
        },
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log("[API_PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
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

    const deletedProduct = await prismadb.product.delete({
      where: { id: params.productId },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log("[API_PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
