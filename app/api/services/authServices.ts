import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import consoleManager from "../utils/consoleManager";
import { generateTLCUserId } from "@/lib/utils";
import { UserRecord } from "firebase-admin/auth";

class AuthService {
    // 🔐 Register new user
    static async registerUser(email: string, password: string, extraData: any = {}) {
        try {
            // 1. Generate TLC ID
            const now = new Date();
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const snapshot = await db
                .collection("users")
                .where("tlcId", ">=", `TLC${month}`)
                .where("tlcId", "<", `TLC${month}99`)
                .orderBy("tlcId", "desc")
                .limit(1)
                .get();

            let lastTlcId = snapshot.empty ? undefined : snapshot.docs[0].data().tlcId;
            const newTlcId = generateTLCUserId(lastTlcId);

            // 2. Create Firebase Auth user
            const userRecord: UserRecord = await auth.createUser({
                email,
                password,
                displayName: extraData.fullName || "",
                ...extraData,
            });

            // 3. Save to Firestore
            await db.collection("users").doc(userRecord.uid).set({
                uid: userRecord.uid,
                email: userRecord.email,
                fullName: extraData.fullName || "",
                role: extraData.role || "user",
                tlcId: newTlcId,
                createdOn: new Date().toISOString(),
            });

            consoleManager.log("✅ User registered:", userRecord.uid, "TLC ID:", newTlcId);

            return {
                uid: userRecord.uid,
                email: userRecord.email,
                fullName: extraData.fullName || "",
                tlcId: newTlcId,
                role: extraData.role || "user",
            };
        } catch (error: any) {
            consoleManager.error("❌ registerUser error:", error.message);
            throw new Error(error.message || "Registration failed.");
        }
    }

    // 🔐 Login (email verification only, password check is client-side)
    static async loginUser(email: string, _password: string) {
        try {
            const userRecord = await auth.getUserByEmail(email);
            if (!userRecord) throw new Error("User not found");

            const userDoc = await db.collection("users").doc(userRecord.uid).get();
            if (!userDoc.exists) throw new Error("User profile not found");

            return {
                uid: userRecord.uid,
                email: userRecord.email,
                ...userDoc.data(),
            };
        } catch (error: any) {
            consoleManager.error("❌ loginUser error:", error.message);
            throw new Error(error.message || "Login failed.");
        }
    }

    // 🧹 Delete user
    static async deleteUserByUid(uid: string) {
        try {
            await auth.deleteUser(uid);
            await db.collection("users").doc(uid).delete();
            consoleManager.log("✅ User deleted:", uid);
        } catch (error: any) {
            consoleManager.error("❌ deleteUserByUid error:", error.message);
            throw new Error(error.message || "Delete failed.");
        }
    }

    // 🛠️ Update Firebase Auth fields
    static async updateUser(uid: string, updates: any) {
        try {
            const fields: any = {};
            if (updates.email) fields.email = updates.email;
            if (updates.password) fields.password = updates.password;
            if (updates.fullName) fields.displayName = updates.fullName;
            if (updates.phoneNumber) fields.phoneNumber = updates.phoneNumber;
            if (updates.disabled !== undefined) fields.disabled = updates.disabled;
            if (updates.role) fields.customClaims = { role: updates.role };

            if (Object.keys(fields).length > 0) {
                await auth.updateUser(uid, fields);
                consoleManager.log("✅ Firebase Auth user updated:", uid);
            }
        } catch (error: any) {
            consoleManager.error("❌ updateUser error:", error.message);
            throw new Error(error.message || "Auth update failed.");
        }
    }

    // 🛠️ Update Firestore profile fields
    static async updateUserInFirestore(uid: string, updateData: any) {
        try {
            await db.collection("users").doc(uid).update({
                ...updateData,
                updatedOn: new Date().toISOString(),
            });
            consoleManager.log("✅ Firestore user updated:", uid);
        } catch (error: any) {
            consoleManager.error("❌ updateUserInFirestore error:", error.message);
            throw new Error(error.message || "Firestore update failed.");
        }
    }

    // 🔍 Get user by UID
    static async getUserById(uid: string) {
        try {
            const doc = await db.collection("users").doc(uid).get();
            if (!doc.exists) return null;
            return { uid: doc.id, ...doc.data() };
        } catch (error: any) {
            consoleManager.error("❌ getUserById error:", error.message);
            throw new Error(error.message || "Failed to fetch user.");
        }
    }

    // 🔍 Get user by email
    static async getUserByEmail(email: string) {
        try {
            const snapshot = await db.collection("users").where("email", "==", email).get();
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return { uid: doc.id, ...doc.data() };
        } catch (error: any) {
            consoleManager.error("❌ getUserByEmail error:", error.message);
            throw new Error(error.message || "Failed to fetch user.");
        }
    }

    // 📦 Get all users
    static async getAllUsers() {
        try {
            const snapshot = await db.collection("users").get();
            return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
        } catch (error: any) {
            consoleManager.error("❌ getAllUsers error:", error.message);
            throw new Error("Failed to fetch users.");
        }
    }
}

export default AuthService;
