"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Dialog,  DialogContent,  DialogHeader,  DialogTitle,  DialogFooter, DialogClose,} from "@/components/ui/dialog";
import {  Loader2,  Plus,  Search,} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {  fetchTeamMembers,  selectTeamMembers,  selectError,  selectIsLoading,  addTeamMember, updateTeamMember, deleteTeamMember, TeamMember,} from "@/lib/redux/features/teamMemberSlice";
import { AppDispatch } from "@/lib/redux/store";
import { toast } from "sonner";
import TeamCard from "./teamCard";

export default function TeamPage() {
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);
    const rawMembers = useSelector(selectTeamMembers);
    const teamMembers: TeamMember[] = Array.isArray(rawMembers) ? rawMembers : [];

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMember, setEditMember] = useState<TeamMember | null>(null);
    const [form, setForm] = useState({
        name: "",
        position: "",
        bio: "",
        image: "",
    });

    const [deleteMember, setDeleteMember] = useState<TeamMember | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(fetchTeamMembers());
    }, [dispatch]);

    const filteredMembers = useMemo(() => {
        return teamMembers.filter((m) =>
            m.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [teamMembers, search]);

    const openAddModal = () => {
        setEditMember(null);
        setForm({
            name: "",
            position: "",
            bio: "",
            image: "",
        });
        setImageFile(null);
        setImagePreview(null);
        setModalOpen(true);
    };

    const openEditModal = (member: TeamMember) => {
        setEditMember(member);
        setForm({
            name: member.name || "",
            position: member.position || "",
            bio: member.bio || "",
            image: member.image || "",
        });
        setImageFile(null);
        setImagePreview(member.image || null);
        setModalOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("position", form.position);
            formData.append("bio", form.bio);
            if (imageFile) {
                formData.append("image", imageFile);
            } else if (!editMember) {
                toast.error("Image is required");
                setLoading(false);
                return;
            }

            if (editMember?.id) {
                await dispatch(updateTeamMember({ id: editMember.id, formData }));
                toast.success("Team member updated!");
            } else {
                await dispatch(addTeamMember(formData));
                toast.success("Team member added!");
            }
            console.log("form details:",formData)
            await dispatch(fetchTeamMembers());
            setModalOpen(false);
        } catch (err) {
            console.error("Error submitting member:", err);
            toast.error("Failed to submit member");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteMember?.id) return;
        setLoading(true);
        await dispatch(deleteTeamMember(deleteMember.id));
        await dispatch(fetchTeamMembers());
        setLoading(false);
        setDeleteMember(null);
        toast.success("Team member deleted!");
    };

    return (
        <div className="mx-auto p-0 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 mb-1 flex-wrap">
                <h2 className="text-xl font-bold text-[var(--primary-green)]">
                    Team Members
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center justify-end">
                    <div className="relative w-full sm:w-72">
                        <Input
                            placeholder="Search team members..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="gap-2 w-full sm:w-auto bg-[var(--primary-green)] hover:bg-[var(--primary-light-green)]"
                    >
                        <Plus className="w-4 h-4" /> Add Member
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-gray-400 py-12">
                        <Loader2 className="w-10 h-10 animate-spin" />
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-12">
                        No team members found.
                    </div>
                ) : (
                    filteredMembers.map((member) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            onEdit={openEditModal}
                            onDelete={setDeleteMember}
                        />
                    ))
                )}
            </div>

            {/* Add/Edit Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>
                                {editMember ? "Edit Member" : "Add Member"}
                            </DialogTitle>
                        </DialogHeader>

                        <Input
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            required
                        />
                        <Input
                            placeholder="Position"
                            value={form.position}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, position: e.target.value }))
                            }
                        />
                        <textarea
                            placeholder="Bio"
                            value={form.bio}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, bio: e.target.value }))
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm resize-y min-h-[80px]"
                        />

                        <div className="flex flex-col gap-2">
                            <label className="block text-sm font-medium">Image</label>
                            {(imagePreview || form.image) && (
                                <img
                                    src={imagePreview || form.image}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-lg border"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="block w-full text-sm file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-[var(--primary-green)]/10 file:text-[var(--primary-green)]"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="gap-2 cursor-pointer bg-green-500"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}{" "}
                                {editMember ? "Update" : "Add"}
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog
                open={!!deleteMember}
                onOpenChange={(open) => !open && setDeleteMember(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Member</DialogTitle>
                    </DialogHeader>
                    <div>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-[var(--primary-green)]">
                            {deleteMember?.name}
                        </span>
                        ? This action cannot be undone.
                    </div>
                    <DialogFooter>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={loading}
                            className="gap-2 cursor-pointer"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Delete
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost" disabled={loading}>
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
