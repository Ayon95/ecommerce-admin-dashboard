import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: { id: params.categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[API_CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!body.name) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    if (!body.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const updatedCategory = await prismadb.category.update({
      where: { id: params.categoryId },
      data: { name: body.name, billboardId: body.billboardId },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log("[API_CATEGORY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const deletedCategory = await prismadb.category.delete({
      where: { id: params.categoryId },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log("[API_CATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
