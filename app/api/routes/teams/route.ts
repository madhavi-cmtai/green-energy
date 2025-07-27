import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import fs from "fs";
import TeamMemberService from "@/app/api/services/teamMemberService";
import { UploadImage } from "@/app/api/controller/imageController";
import consoleManager from "@/app/api/utils/consoleManager";

export const config = {
    api: {
        bodyParser: false,
    },
};

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

        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
        const position = Array.isArray(fields.position) ? fields.position[0] : fields.position || "";
        const bio = Array.isArray(fields.bio) ? fields.bio[0] : fields.bio || "";
        const linkedin = Array.isArray(fields.linkedin) ? fields.linkedin[0] : fields.linkedin || "";
        const image = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!name || !email) {
            return NextResponse.json(
                {
                    statusCode: 400,
                    errorCode: "VALIDATION_ERROR",
                    errorMessage: "Name and email are required",
                },
                { status: 400 }
            );
        }

        let imageUrl = "";
        if (image?.filepath) {
            const imageBuffer = await fs.promises.readFile(image.filepath);
            const mockFile = {
                arrayBuffer: async () =>
                    imageBuffer.buffer.slice(imageBuffer.byteOffset, imageBuffer.byteOffset + imageBuffer.byteLength),
                name: image.originalFilename || `team-image-${Date.now()}.jpg`,
                type: image.mimetype || "image/jpeg",
            };
            imageUrl = await UploadImage(mockFile) as string;
            if (!imageUrl) {
                throw new Error("Image upload failed");
            }
        }

        const newMember = {
            name,
            email,
            position,
            bio,
            linkedin,
            image: imageUrl,
        };

        const created = await TeamMemberService.addTeamMember(newMember);

        return NextResponse.json(
            {
                statusCode: 201,
                message: "Team member created successfully",
                data: created,
                errorCode: "NO",
                errorMessage: "",
            },
            { status: 201 }
        );
    } catch (error: any) {
        consoleManager.error("POST /api/teamMembers error:", error);
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


// GET all team members
export async function GET() {
    try {
        const members = await TeamMemberService.getAllTeamMembers();
        return NextResponse.json(
            {
                statusCode: 200,
                message: "Team members fetched successfully",
                data: members,
                errorCode: "NO",
                errorMessage: "",
            },
            { status: 200 }
        );
    } catch (error: any) {
        consoleManager.error("GET /api/teamMembers error:", error);
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
