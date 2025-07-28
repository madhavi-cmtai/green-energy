import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { UploadMultipleImages } from "@/lib/utils/imageUtils";
import ProductService from "@/app/api/services/productServices";
import consoleManager from "@/app/api/utils/consoleManager";
import { Readable } from "stream";

// This disables Next.js's default body parsing
export const config = {
    api: { bodyParser: false },
};

// Utility to convert NextRequest to readable stream
async function requestToNodeStream(
    req: NextRequest
): Promise<Readable & { headers: any; method: string; url?: string }> {
    const reader = req.body?.getReader();

    const stream = new Readable({
        async read() {
            if (!reader) {
                this.push(null);
                return;
            }

            try {
                const { done, value } = await reader.read();
                if (done) {
                    this.push(null);
                } else {
                    this.push(Buffer.from(value));
                }
            } catch (err) {
                this.destroy(err as Error);
            }
        },
    });

    const headers: any = {};
    req.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
    });

    return Object.assign(stream, {
        headers,
        method: req.method,
        url: req.url,
    });
}

// ✅ POST: Upload new product
export async function POST(req: NextRequest) {
    try {
        const form = formidable({ multiples: true, keepExtensions: true });

        const incomingReq = await requestToNodeStream(req);
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

        const imageFiles = Array.isArray(files.images) ? files.images : files.images ? [files.images] : [];

        if (!name || !summary || !power || imageFiles.length === 0) {
            return NextResponse.json(
                {
                    statusCode: 400,
                    errorCode: "MISSING_FIELDS",
                    errorMessage: "Name, summary, power, and images[] are required",
                },
                { status: 400 }
            );
        }

        const uploadedImageUrls = await UploadMultipleImages(imageFiles);

        const product = {
            name,
            summary,
            power,
            category,
            images: uploadedImageUrls,
            createdOn: new Date().toISOString(),
            updatedOn: new Date().toISOString(),
        };

        await ProductService.addProduct(product);
        const allProducts = await ProductService.getAllProducts(true);

        return NextResponse.json({
            statusCode: 200,
            message: "Product added successfully",
            data: allProducts,
            errorCode: "NO",
            errorMessage: "",
        });
    } catch (error: any) {
        consoleManager.error("PRODUCT_POST_ERROR", error);
        return NextResponse.json(
            {
                statusCode: 500,
                errorCode: "INTERNAL_ERROR",
                errorMessage: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}




// ✅ GET: Fetch all products
export async function GET() {
    try {
        const products = await ProductService.getAllProducts();
        consoleManager.log("Fetched all products:", products.length);
        return NextResponse.json(
            {
                statusCode: 200,
                message: "Products fetched successfully",
                data: products,
                errorCode: "NO",
                errorMessage: "",
            },
            { status: 200 }
        );
    } catch (error: any) {
        consoleManager.error("Error in GET /api/products:", error);
        return NextResponse.json(
            {
                statusCode: 500,
                errorCode: "INTERNAL_ERROR",
                errorMessage: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}



