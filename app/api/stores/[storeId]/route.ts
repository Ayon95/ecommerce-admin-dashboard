import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body.name) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismadb.store.findUnique({
      where: { id: params.storeId },
    });

    if (store?.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedStore = await prismadb.store.update({
      where: { id: params.storeId },
      data: { name: body.name },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log("[API_STORE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismadb.store.findUnique({
      where: { id: params.storeId },
    });

    if (store?.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedStore = await prismadb.store.delete({
      where: { id: params.storeId },
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log("[API_STORE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
