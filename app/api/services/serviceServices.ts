import { db, adminStorage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

export interface ServiceData {
  title: string;
  description: string;
  features: string[];
  image?: string;
  createdOn?: string;
  updatedOn?: string;
}

class ServiceServices {
  // Create a new service
  static async createService(data: ServiceData, file?: File | Buffer) {
    let imageUrl = data.image || "";
    if (file) {
      const fileName = `services/${uuidv4()}`;
      const bucket = adminStorage.bucket();
      const fileUpload = bucket.file(fileName);
      await fileUpload.save(file as Buffer, {
        contentType: (file as any).mimetype || "image/jpeg",
        public: true,
        resumable: false,
      });
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }
    const now = new Date().toISOString();
    const docRef = await db.collection("services").add({
      ...data,
      image: imageUrl,
      createdOn: now,
      updatedOn: now,
    });
    return { id: docRef.id, ...data, image: imageUrl, createdOn: now, updatedOn: now };
  }

  // Get all services
  static async getAllServices() {
    const snapshot = await db.collection("services").orderBy("createdOn", "desc").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Get a service by ID
  static async getServiceById(id: string) {
    const doc = await db.collection("services").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  // Update a service
  static async updateService(id: string, data: Partial<ServiceData>, file?: File | Buffer) {
    let imageUrl = data.image;
    if (file) {
      const fileName = `services/${uuidv4()}`;
      const bucket = adminStorage.bucket();
      const fileUpload = bucket.file(fileName);
      await fileUpload.save(file as Buffer, {
        contentType: (file as any).mimetype || "image/jpeg",
        public: true,
        resumable: false,
      });
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }
    const now = new Date().toISOString();
    await db.collection("services").doc(id).update({
      ...data,
      ...(imageUrl ? { image: imageUrl } : {}),
      updatedOn: now,
    });
    const updatedDoc = await db.collection("services").doc(id).get();
    return { id, ...updatedDoc.data() };
  }

  // Delete a service
  static async deleteService(id: string) {
    await db.collection("services").doc(id).delete();
    return { success: true };
  }
}

export default ServiceServices; 