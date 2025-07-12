import { NextResponse } from "next/server";
import BlogService from "@/app/api/services/blogServices";
import consoleManager from "../../../utils/consoleManager";
import { ReplaceImage } from "../../../controller/imageController";

// Get blog by ID (GET)
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const rawTitle = id;

        // Normalize the slug to a title string
        const decodedTitle = decodeURIComponent(rawTitle)
            .toLowerCase()
            .replace(/-/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const blog = await BlogService.getBlogByTitle(decodedTitle);

        if (!blog) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Blog not found",
            }, { status: 404 });
        }
        return NextResponse.json({
            statusCode: 200,
            message: "Blog fetched successfully",
            data: blog,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error: any) {
        consoleManager.error("Error in GET /api/blogs/[id] :", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update blog by ID (PUT)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const formData = await req.formData();

        const title = formData.get("title")?.toString();
        const summary = formData.get("summary")?.toString();
        const category = formData.get("category")?.toString();
        const createdOn = formData.get("createdOn")?.toString();
        const updatedOn = formData.get("updatedOn")?.toString();
        const image = formData.get("image"); // Can be File or existing URL

        if (!title || !summary || !category) {
            return NextResponse.json({
                statusCode: 400,
                errorCode: "MISSING_FIELDS",
                errorMessage: "Title, summary, category, and updatedOn are required",
            }, { status: 400 });
        }

        // Fetch existing blog (to get old image URL)
        const existingBlog = await BlogService.getBlogById(id);
        if (!existingBlog) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Blog not found",
            }, { status: 404 });
        }

        // Replace image if new image file is provided
        let imageUrl = existingBlog.image; // Default to old image
        if (image && typeof image !== "string") {
            try {
                imageUrl = await ReplaceImage(image, existingBlog.image || "");
            } catch (imgErr: any) {
                consoleManager.error("Image replacement failed:", imgErr);
                return NextResponse.json({
                    statusCode: 500,
                    errorCode: "IMAGE_UPLOAD_FAILED",
                    errorMessage: "Failed to replace image",
                }, { status: 500 });
            }
        }

        // Construct updated data
        const updatedData = {
            title,
            summary,
            category,
            image: imageUrl,
            createdOn: createdOn || existingBlog.createdOn,
            updatedOn,
        };

        // Update blog in database
        const updatedBlog = await BlogService.updateBlog(id, updatedData);

        return NextResponse.json({
            statusCode: 200,
            message: "Blog updated successfully",
            data: updatedBlog,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error: any) {
        consoleManager.error("Error in PUT /api/blogs/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Delete blog by ID (DELETE)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await BlogService.deleteBlog(id);
        return NextResponse.json({  
            statusCode: 200,
            message: "Blog deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error: any) {
        consoleManager.error("Error in DELETE /api/blogs/[id] :", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
} 