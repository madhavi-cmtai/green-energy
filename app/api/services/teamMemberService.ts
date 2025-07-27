// lib/firebase/services/TeamMemberService.ts
import { db } from "../config/firebase"
import consoleManager from "../utils/consoleManager"
import admin from "firebase-admin"

class TeamMemberService {
    static teamMembers: any[] = []
    static isInitialized = false

    // Initialize real-time listener
    static initTeamMembers() {
        if (this.isInitialized) return
        consoleManager.log("Initializing Firestore listener for teamMembers...")

        db.collection("teamMembers").onSnapshot((snapshot: any) => {
            this.teamMembers = snapshot.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data(),
            }))
            consoleManager.log("Firestore Read: TeamMembers updated. Count:", this.teamMembers.length)
        })

        this.isInitialized = true
    }

    // Get all (cached or fresh)
    static async getAllTeamMembers(forceRefresh = false) {
        if (forceRefresh || !this.isInitialized) {
            consoleManager.log("Force refreshing teamMembers from Firestore...")
            const snapshot = await db.collection("teamMembers").orderBy("createdOn", "desc").get()
            this.teamMembers = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
            this.isInitialized = true
        } else {
            consoleManager.log("Returning cached teamMembers. No Firestore read.")
        }

        return this.teamMembers
    }

    // Add new team member
    static async addTeamMember(data: any) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp()

            const newRef = await db.collection("teamMembers").add({
                ...data,
                createdOn: timestamp,
                updatedOn: timestamp,
            })

            consoleManager.log("New team member added:", newRef.id)
            await this.getAllTeamMembers(true)

            return { id: newRef.id, ...data, createdOn: timestamp, updatedOn: timestamp }
        } catch (err) {
            consoleManager.error("Error adding team member:", err)
            throw new Error("Failed to add team member")
        }
    }

    // Get by ID
    static async getTeamMemberById(id: string) {
        try {
            const cached = this.teamMembers.find((m) => m.id === id)
            if (cached) {
                consoleManager.log("TeamMember fetched from cache:", id)
                return cached
            }

            const docRef = db.collection("teamMembers").doc(id)
            const doc = await docRef.get()
            if (!doc.exists) {
                consoleManager.warn("⚠️ TeamMember not found:", id)
                return null
            }

            consoleManager.log("TeamMember fetched from Firestore:", id)
            return { id: doc.id, ...doc.data() }
        } catch (err) {
            consoleManager.error("Error fetching team member by ID:", err)
            throw new Error("Failed to fetch team member")
        }
    }

    // Update by ID
    static async updateTeamMember(id: string, updatedData: any) {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp()

            const docRef = db.collection("teamMembers").doc(id)
            await docRef.update({
                ...updatedData,
                updatedOn: timestamp,
            })

            consoleManager.log("Team member updated:", id)
            await this.getAllTeamMembers(true)

            return { id, ...updatedData, updatedOn: timestamp }
        } catch (err) {
            consoleManager.error("Error updating team member:", err)
            throw new Error("Failed to update team member")
        }
    }

    // Delete by ID
    static async deleteTeamMember(id: string) {
        try {
            await db.collection("teamMembers").doc(id).delete()
            consoleManager.log("Team member deleted:", id)
            await this.getAllTeamMembers(true)
            return { success: true, message: "Team member deleted successfully" }
        } catch (err) {
            consoleManager.error("Error deleting team member:", err)
            throw new Error("Failed to delete team member")
        }
    }
}

export default TeamMemberService
