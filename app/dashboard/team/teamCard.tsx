"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { TeamMember } from "@/lib/redux/features/teamMemberSlice";

// ✅ Fallback image URL (you can also use a local image if preferred)
const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

interface TeamCardProps {
    member: TeamMember;
    onEdit: (member: TeamMember) => void;
    onDelete: (member: TeamMember) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, onEdit, onDelete }) => {
    const displayImage =
        member.image && member.image.trim() !== "" ? member.image : fallbackImage;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <div className="relative w-full h-48 bg-gray-100">
                <Image
                    src={displayImage}
                    alt={member.name || "Team Member"}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="text-lg font-bold mb-1">
                        {member.name || "Unnamed"}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {member.position || "No position"}
                    </p>
                </div>
                <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="ghost" onClick={() => onEdit(member)}>
                        <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => onDelete(member)}
                    >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
