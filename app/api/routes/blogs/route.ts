import { NextRequest, NextResponse } from "next/server";
import BlogService from "@/app/api/services/blogServices";
import consoleManager from "../../utils/consoleManager";
import { UploadImage } from "../../controller/imageController";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import fs from "fs";

export async function POST(req: NextRequest) {
    try {
        const form = new IncomingForm({ keepExtensions: true, multiples: false });
        const nodeReq = Readable.fromWeb(req.body as any) as any;
        nodeReq.headers = Object.fromEntries(req.headers.entries());
        nodeReq.method = req.method;

        const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
            form.parse(nodeReq, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const summary = Array.isArray(fields.summary) ? fields.summary[0] : fields.summary;
        const image = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!title || !summary || !image || !image.filepath) {
            return NextResponse.json(
                { statusCode: 400, errorMessage: "Title, summary, and image are required" },
                { status: 400 }
            );
        }

        // ✅ Read file buffer and convert to mock File-compatible object
        const imageBuffer = await fs.promises.readFile(image.filepath);
        const mockFile = {
            arrayBuffer: async () =>
                imageBuffer.buffer.slice(imageBuffer.byteOffset, imageBuffer.byteOffset + imageBuffer.byteLength),
            name: image.originalFilename || `blog-image-${Date.now()}.jpg`,
            type: image.mimetype || "image/jpeg",
        };

        const imageUrl = await UploadImage(mockFile);
        if (!imageUrl) {
            throw new Error("Image upload returned no URL");
        }

     
        // Check for duplicate slug
        const existing = await BlogService.getBlogByTitle(title);
        if (existing) {
            return NextResponse.json(
                {
                    statusCode: 409,
                    errorCode: "DUPLICATE_SLUG",
                    errorMessage: "A blog with this title already exists.",
                },
                { status: 409 }
            );
        }


        const newBlog = {
            title,
            summary,
            image: imageUrl,
        };


        const created = await BlogService.addBlog(newBlog);
        return NextResponse.json(
            {
                statusCode: 201,
                message: "Blog created successfully",
                data: created,
                errorCode: "NO",
                errorMessage: "",
            },
            { status: 201 }
        );
    } catch (error: any) {
        consoleManager.error("POST /api/blogs error:", error);
        return NextResponse.json(
            {
                statusCode: 500,
                errorCode: "INTERNAL_ERROR",
                errorMessage: error.message || "Something went wrong",
            },
            { status: 500 }
        );
    }
}

// GET blogs
export async function GET() {
    try {
        const blogs = await BlogService.getAllBlogs();
        consoleManager.log("Fetched all blogs:", blogs.length);
        return NextResponse.json(
            {
                statusCode: 200,
                message: "Blogs fetched successfully",
                data: blogs,
                errorCode: "NO",
                errorMessage: "",
            },
            { status: 200 }
        );
    } catch (error: any) {
        consoleManager.error("Error in GET /api/blogs:", error);
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
