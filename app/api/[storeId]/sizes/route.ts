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

    const sizes = await prismadb.size.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[API_SIZES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!body.name) {
      return new NextResponse("Size name is required", { status: 400 });
    }

    if (!body.value) {
      return new NextResponse("Size value is required", { status: 400 });
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

    const size = await prismadb.size.create({
      data: {
        storeId: params.storeId,
        name: body.name,
        value: body.value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[API_SIZES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
