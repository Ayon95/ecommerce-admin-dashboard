import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body.name) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name: body.name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[API_STORES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
