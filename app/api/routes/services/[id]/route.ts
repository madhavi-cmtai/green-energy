import { NextResponse } from "next/server";
import { ReplaceImage } from "@/app/api/controller/imageController";
import ServiceServices from "@/app/api/services/serviceServices";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const contentType = req.headers.get("content-type") || "";
    let data: {
      title: string;
      description: string;
      features: string[];
      images?: string[];
    } = {
      title: "",
      description: "",
      features: [],
    };

    let newImage: File | undefined;
    let oldImageUrl: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      data.title = formData.get("title") as string;
      data.description = formData.get("description") as string;
      data.features = JSON.parse(formData.get("features") as string);
      oldImageUrl = formData.get("existingImage") as string;

      const image = formData.get("image");
      if (image && typeof image !== "string") {
        const blob = image as Blob;
        newImage = new File([blob], (blob as any).name || "uploaded.jpg", {
          type: blob.type,
        });
      }
    } else {
      const body = await req.json();
      data.title = body.title;
      data.description = body.description;
      data.features = body.features;
      oldImageUrl = body.existingImage;
    }

    if (newImage) {
      const imageUrl = await ReplaceImage(newImage, oldImageUrl || "");
      data.images = [imageUrl];
    }

    const service = await ServiceServices.updateService(id, data);
    return NextResponse.json({ statusCode: 200, data: service });

  } catch (error: any) {
    return NextResponse.json({
      statusCode: 400,
      error: error.message || "Failed to update service",
    });
  }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await ServiceServices.deleteService(id);
    return NextResponse.json({ statusCode: 200, message: "Service deleted" });
  } catch (error: any) {
    return NextResponse.json({ statusCode: 400, error: error.message });
  }
} 


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const service = await ServiceServices.getServiceById(id);
    if (!service) {
      return NextResponse.json({ statusCode: 404, error: "Service not found" });
    }
    return NextResponse.json({ statusCode: 200, data: service });
  } catch (error: any) {
    return NextResponse.json({ statusCode: 500, error: error.message });
  }
}