import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { Readable } from "stream";
import ProductService from "@/app/api/services/productServices";
import { UploadMultipleImages, replaceImages } from "@/lib/utils/imageUtils";
import consoleManager from "@/app/api/utils/consoleManager";

export const config = {
    api: {
        bodyParser: false, // required for formidable
    },
};

// Convert NextRequest to Node-readable stream
function requestToNodeStream(req: NextRequest): Readable & { headers: any; method: string; url?: string } {
    const reader = req.body?.getReader();
    const stream = new Readable({
        async read() {
            if (!reader) {
                this.push(null);
                return;
            }
            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    this.push(value);
                }
                this.push(null);
            } catch (err) {
                this.destroy(err as Error);
            }
        },
    });

    const headers: any = {};
    req.headers.forEach((value, key) => {
        headers[key] = value;
    });

    return Object.assign(stream, {
        headers,
        method: req.method,
        url: req.url,
    });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const incomingReq = requestToNodeStream(req);
        const form = formidable({ multiples: true, keepExtensions: true });

        const { fields, files }: { fields: formidable.Fields; files: formidable.Files } =
            await new Promise((resolve, reject) => {
                form.parse(incomingReq as any, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({ fields, files });
                });
            });

        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const summary = Array.isArray(fields.summary) ? fields.summary[0] : fields.summary;
        const power = Array.isArray(fields.power) ? fields.power[0] : fields.power;
        let category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
        category = category?.toLowerCase().trim() || "others";

        let deletedImages: string[] = [];

        if (fields.deletedImages) {
            const raw = Array.isArray(fields.deletedImages)
                ? fields.deletedImages[0]
                : fields.deletedImages;

            try {
                deletedImages = JSON.parse(raw); 
            } catch (e) {
                deletedImages = [raw];
            }
        }



        if (!name || !summary || !power) {
            return NextResponse.json({
                statusCode: 400,
                errorCode: "MISSING_FIELDS",
                errorMessage: "Name, summary, and power are required",
            }, { status: 400 });
        }

        const existingProduct = await ProductService.getProductById(id);
        if (!existingProduct) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Product not found",
            }, { status: 404 });
        }

        const oldImageUrls: string[] = existingProduct.images || [];

        // Upload new images
        const imageFiles = Array.isArray(files.images)
            ? files.images
            : files.images
                ? [files.images]
                : [];

        const uploadedImageUrls = await UploadMultipleImages(imageFiles);

        // Retain old images except the ones marked for deletion
        const retainedOldImages = oldImageUrls.filter(url => !deletedImages.includes(url));

        
        // Delete removed images from Firebase
        if (deletedImages.length > 0) {
            try {
                await replaceImages(oldImageUrls, deletedImages);
            } catch (err: any) {
                consoleManager.warn("Failed to delete some images");
                deletedImages.forEach((img) => {
                    console.error(`Failed to delete image: ${img}`);    
                });
                console.log("Deletion error details:", err.message || err);
            }
        }

        const finalImages = [...retainedOldImages, ...uploadedImageUrls];

        const updatedData = {
            name,
            summary,
            power,
            category,
            images: finalImages,
            updatedOn: new Date().toISOString(),
        };

        const updatedProduct = await ProductService.updateProduct(id, updatedData);

        return NextResponse.json({
            statusCode: 200,
            message: "Product updated successfully",
            data: updatedProduct,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error: any) {
        consoleManager.error("PRODUCT_PUT_ERROR", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await ProductService.getProductById(id);
        if (!product) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Product not found",
            }, { status: 404 });
        }
        return NextResponse.json({
            statusCode: 200,
            message: "Product fetched successfully",
            data: product,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error: any) {
        consoleManager.error("Error in GET /api/products/[id] :", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await ProductService.deleteProduct(id);
        return NextResponse.json({
            statusCode: 200,
            message: "Product deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error: any) {
        consoleManager.error("Error in DELETE /api/products/[id] :", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
