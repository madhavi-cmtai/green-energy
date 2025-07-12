import { NextResponse } from "next/server";
import { UploadImage } from "@/app/api/controller/imageController";
import ServiceServices from "@/app/api/services/serviceServices";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let data: {
      title: string;
      description: string;
      features: string[];
      category: string;
      images?: string[];
    };

    let imageFiles: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        features: JSON.parse(formData.get("features") as string),
        category: formData.get("category") as string,
      };

      const image = formData.get("image");

      if (image && typeof image !== "string") {
        const blob = image as Blob;
        const file = new File([blob], (blob as any).name || "uploaded.jpg", {
          type: blob.type,
        });
        const uploadedImageUrl = await UploadImage(file);
        data.images = [uploadedImageUrl as string || ""];
      }
    } else {
      const body = await req.json();
      data = {
        title: body.title,
        description: body.description,
        features: body.features,
        category: body.category,
        images: [], // Optional fallback
      };
    }

    const service = await ServiceServices.createService(data);
    return NextResponse.json({ statusCode: 201, data: service });

  } catch (error: any) {
    return NextResponse.json({
      statusCode: 400,
      error: error.message || "Failed to create service",
    });
  }
}



export async function GET() {
  try {
    const services = await ServiceServices.getAllServices();
    return NextResponse.json({ statusCode: 200, data: services });
  } catch (error: any) {
    return NextResponse.json({ statusCode: 500, error: error.message });
  }
}

