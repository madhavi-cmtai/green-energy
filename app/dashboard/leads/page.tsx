"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus, Edit, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeads,
  selectLeads,
  selectLoading,
  selectError,
  updateLead,
  deleteLead,
  addLead,
} from "@/lib/redux/features/leadSlice";
import { AppDispatch } from "@/lib/redux/store";

export default function LeadsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const leads = useSelector(selectLeads);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "New",
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  
  const filteredLeads = useMemo(
    () =>
      leads?.filter(
        (l) =>
          (statusFilter === "all" ||
            l.status?.toLowerCase() === statusFilter) &&
          (l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.email.toLowerCase().includes(search.toLowerCase()) ||
            l.phone?.toLowerCase().includes(search.toLowerCase()) || // ✅ fixed
            l.status?.toLowerCase().includes(search.toLowerCase()))
      ),
    [leads, search, statusFilter]
  );


  const openAddModal = () => {
    setEditLead(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      status: "New",
    });
    setModalOpen(true);
  };

  const openEditModal = (lead: any) => {
    setEditLead(lead);
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message || "",
      status: lead.status,
    });
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    await dispatch(deleteLead(leadToDelete));
    setIsDeleting(false);
    dispatch(fetchLeads());
    toast.success("Lead deleted!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(true);
    if (editLead) {
      const lead = {
        ...form,
        id: editLead.id,
        createdOn: editLead.createdOn,
        updatedOn: new Date().toISOString(),
      };
      await dispatch(updateLead(editLead.id, lead));
      toast.success("Lead updated!");
    } else {
      const newLead = {
        ...form,
        id: Math.random().toString(36).substr(2, 9),
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      };
      await dispatch(addLead(newLead));
      toast.success("Lead added!");
    }
    setModalOpen(false);
    setIsEditing(false);
    dispatch(fetchLeads());
  };

  if (error) {
    return (
      <div className="mx-auto p-0 flex flex-col gap-8">
        <h2 className="text-xl font-bold text-[#1a8f5c]">Leads</h2>
        <p>Error loading leads. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-0 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 mb-1 flex-wrap">
        <h2 className="text-xl font-bold text-[#1a8f5c]">Lead List</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center justify-end">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 bg-white" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={openAddModal}
            className="gap-2 w-full sm:w-auto bg-[#1a8f5c] hover:bg-[#17804f] text-white"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow p-4 mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </TableCell>
              </TableRow>
            )}
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        lead.status === "New"
                          ? "bg-[#e6f4ea] text-[#1a8f5c] border border-[#1a8f5c]"
                          : lead.status === "Contacted"
                            ? "bg-[#ffc72c] text-[#1a8f5c] border border-[#ffc72c]"
                            : "bg-[#1a8f5c] text-white border border-[#1a8f5c]"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditModal(lead)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setLeadToDelete(lead.id || null)}
                      className="text-destructive"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{editLead ? "Edit Lead" : "Add Lead"}</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              required
            />
            <textarea
              placeholder="Send Message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={4}
              className="w-full border rounded-md p-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Select
              value={form.status}
              onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button type="submit" disabled={isEditing} className="gap-2 bg-green-600 hover:bg-green-800">
                {isEditing && <Loader2 className="w-4 h-4 animate-spin" />}
                {editLead ? "Update" : "Add"}
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

      {/* Delete Modal */}
      <Dialog
        open={!!leadToDelete}
        onOpenChange={(open) => !open && setLeadToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#1a8f5c]">
              {leadToDelete}
            </span>
            ? This action cannot be undone.
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="gap-2"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />} Delete
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
