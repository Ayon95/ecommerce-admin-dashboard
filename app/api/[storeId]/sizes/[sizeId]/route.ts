import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[API_SIZE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const updatedSize = await prismadb.size.update({
      where: { id: params.sizeId },
      data: { name: body.name, value: body.value },
    });

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.log("[API_SIZE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const deletedSize = await prismadb.size.delete({
      where: { id: params.sizeId },
    });

    return NextResponse.json(deletedSize);
  } catch (error) {
    console.log("[API_SIZE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
