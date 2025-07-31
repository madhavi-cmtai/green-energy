import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import fs from "fs";
import TeamMemberService from "@/app/api/services/teamMemberService";
import { ReplaceImage, DeleteImage } from "@/app/api/controller/imageController";
import consoleManager from "@/app/api/utils/consoleManager";
import BlogService from "@/app/api/services/blogServices";

export const config = {
    api: {
        bodyParser: false,
    },
};

// ✅ GET by ID
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const member = await TeamMemberService.getTeamMemberById(id);
        if (!member) {
            return NextResponse.json({ statusCode: 404, errorMessage: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json({ statusCode: 200, data: member });
    } catch (error: any) {
        consoleManager.error("GET /teamMembers/[id] error:", error);
        return NextResponse.json({ statusCode: 500, errorMessage: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const memberId = id;
        const existing = await TeamMemberService.getTeamMemberById(memberId);

        if (!existing) {
            return NextResponse.json(
                { statusCode: 404, errorMessage: "Member not found" },
                { status: 404 }
            );
        }

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

        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        // const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
        const position = Array.isArray(fields.position) ? fields.position[0] : fields.position || "";
        const bio = Array.isArray(fields.bio) ? fields.bio[0] : fields.bio || "";
        // const linkedin = Array.isArray(fields.linkedin) ? fields.linkedin[0] : fields.linkedin || "";
        const image = Array.isArray(files.image) ? files.image[0] : files.image;

        let imageUrl = existing.image || "";

        if (image?.filepath) {
            const imageBuffer = await fs.promises.readFile(image.filepath);
            const mockFile = {
                arrayBuffer: async () =>
                    imageBuffer.buffer.slice(imageBuffer.byteOffset, imageBuffer.byteOffset + imageBuffer.byteLength),
                name: image.originalFilename || `team-image-${Date.now()}.jpg`,
                type: image.mimetype || "image/jpeg",
            };

            try {
                imageUrl = await ReplaceImage(image, existing.image || "");
            } catch (imgErr: any) {
                consoleManager.error("Image replacement failed:", imgErr);
                return NextResponse.json({
                    statusCode: 500,
                    errorCode: "IMAGE_UPLOAD_FAILED",
                    errorMessage: "Failed to replace image",
                }, { status: 500 });
            }
        }

        const updatedData = {
            name: name || existing.name,
            // email: email || existing.email,
            position,
            bio,
            // linkedin,
            image: imageUrl,
        };

        const updated = await TeamMemberService.updateTeamMember(memberId, updatedData);

        return NextResponse.json({
            statusCode: 200,
            message: "Team member updated",
            data: updated,
        });
    } catch (error: any) {
        consoleManager.error("PUT /teamMembers/[id] error:", error);
        return NextResponse.json(
            { statusCode: 500, errorMessage: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

// ✅ DELETE
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const member = await TeamMemberService.getTeamMemberById(id);

        if (!member) {
            return NextResponse.json({
                statusCode: 404,
                errorMessage: "Member not found",
            }, { status: 404 });
        }

        // ✅ Delete image from storage if present
        if (member.image) {
            try {
                await DeleteImage(member.image);
            } catch (imgErr: any) {
                // Don't fail the entire delete if image is missing or failed
                console.warn("Image deletion failed:", imgErr.message);
            }
        }

        // ✅ Delete from Firestore
        await TeamMemberService.deleteTeamMember(id);

        return NextResponse.json({
            statusCode: 200,
            message: "Team member deleted successfully",
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });
    } catch (error: any) {
        console.error("DELETE /api/teamMembers/[id] error:", error);
        return NextResponse.json({
            statusCode: 500,
            errorMessage: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
