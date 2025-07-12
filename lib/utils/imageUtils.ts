
import fs from "fs";
import { adminStorage } from "@/app/api/config/firebase";

export const UploadMultipleImages = async (files: any[]): Promise<string[]> => {
    const bucket = adminStorage.bucket();
    const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;

    const uploadPromises = files.map((file) => {
        const filePath = `products/${Date.now()}_${file.originalFilename}`;
        const firebaseFile = bucket.file(filePath);
        const fileStream = fs.createReadStream(file.filepath);

        return new Promise<string>((resolve, reject) => {
            const blobStream = firebaseFile.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on("error", reject);
            blobStream.on("finish", async () => {
                try {
                    const [url] = await firebaseFile.getSignedUrl({
                        action: "read",
                        expires: "03-09-2491",
                    });
                    resolve(url);
                } catch (err) {
                    reject(err);
                }
            });

            fileStream.pipe(blobStream);
        });
    });

    return Promise.all(uploadPromises);
};



export const replaceImages = async (
    originalImages: string[],
    imagesToDelete: (string | null | undefined)[]
): Promise<string[]> => {
    try {
        const bucket = adminStorage.bucket();
        const retainedImages: string[] = [];

        for (const imageUrl of originalImages) {
            // Check if it needs to be deleted
            const shouldDelete = imagesToDelete.includes(imageUrl?.trim());

            if (!imageUrl || shouldDelete) {
                if (!imageUrl) continue;

                try {
                    let filePath: string;

                    if (imageUrl.includes("/o/")) {
                        filePath = imageUrl.split("/o/")[1].split("?")[0];
                    } else if (imageUrl.includes("storage.googleapis.com")) {
                        const urlParts = imageUrl.split("storage.googleapis.com/")[1].split("?")[0];
                        filePath = urlParts.split("/").slice(1).join("/");
                    } else {
                        console.warn("Skipping unknown image format:", imageUrl);
                        continue;
                    }

                    const decodedPath = decodeURIComponent(filePath);
                    await bucket.file(decodedPath).delete();
                    console.log("🗑️ Deleted from Firebase:", decodedPath);
                } catch (err: any) {
                    console.error("⚠️ Error deleting image:", imageUrl, err.message);
                }
            } else {
                retainedImages.push(imageUrl);
            }
        }

        return retainedImages;
    } catch (error: any) {
        console.error("❌ Error in replaceImages:", error.message);
        throw new Error("Error replacing images: " + error.message);
    }
};






