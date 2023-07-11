import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  _request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[API_CATEGORIES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
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

    const category = await prismadb.category.create({
      data: {
        storeId: params.storeId,
        billboardId: body.billboardId,
        name: body.name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[API_CATEGORIES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
