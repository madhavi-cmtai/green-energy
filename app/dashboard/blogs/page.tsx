"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { Loader2, Plus, Edit, Trash2, Search, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBlogs,
  selectBlogs,
  selectError,
  selectIsLoading,
  addBlog,
  updateBlog,
  deleteBlog,
  BlogItem,
} from "@/lib/redux/features/blogsSlice";
import { AppDispatch } from "@/lib/redux/store";
import { toast } from "sonner";

export default function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector(selectBlogs);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<BlogItem | null>(null);
  const categories = ["Technology", "Installation", "Case Study", "Analysis"];
  const [form, setForm] = useState({
    title: "",
    summary: "",
    image: "",
    category: categories[0],
  });

  const [deleteBlogItem, setDeleteBlogItem] = useState<BlogItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const filteredBlogs = useMemo(
    () => (Array.isArray(blogs) ? blogs : []).filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    ),
    [blogs, search]
  );

  const openAddModal = () => {
    setEditBlog(null);
    setForm({ title: "", summary: "", image: "", category: categories[0] });
    setImageFile(null);
    setImagePreview(null);
    setModalOpen(true);
  };

  const openEditModal = (blog: BlogItem) => {
    setEditBlog(blog);
    setForm({
      title: blog.title,
      summary: blog.summary || "", // ✅ use summary
      image: blog.image || "",
      category: blog.category || categories[0],
    });
    setImageFile(null);
    setImagePreview(blog.image || null);
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
      formData.append("title", form.title);
      formData.append("summary", form.summary); // ✅ changed from description
      formData.append("category", form.category);

      if (imageFile) {
        formData.append("image", imageFile);
      } else if (!editBlog) {
        toast.error("Image is required");
        setLoading(false);
        return;
      }

      if (editBlog) {
        await dispatch(updateBlog(formData, editBlog.id));
        toast.success("Blog updated!");
      } else {
        await dispatch(addBlog(formData));
        toast.success("Blog added!");
      }

      await dispatch(fetchBlogs());
      setModalOpen(false);
    } catch (err) {
      console.error("Error submitting blog:", err);
      toast.error("Failed to submit blog");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteBlogItem) return;
    setLoading(true);
    await dispatch(deleteBlog(deleteBlogItem.id));
    await dispatch(fetchBlogs());
    setLoading(false);
    setDeleteBlogItem(null);
    toast.success("Blog deleted!");
  };

  return (
    <div className="mx-auto p-0 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 mb-1 flex-wrap">
        <h2 className="text-xl font-bold text-[var(--primary-green)]" style={{ fontFamily: 'var(--font-main)' }}>
          Blogs
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center justify-end">
          <div className="relative w-full sm:w-72">
            <Input
              placeholder="Search blogs..."
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
            <Plus className="w-4 h-4" /> Add Blog
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">No blogs found.</div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
            >
              <div className="relative w-full h-48 bg-gray-100">
                {blog.image ? (
                  <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-gray-300 mx-auto" />
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-main)' }}>
                    {blog.title}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{blog.summary}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="ghost" onClick={() => openEditModal(blog)} className="cursor-pointer">
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteBlogItem(blog)}
                    className="text-destructive cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{editBlog ? "Edit Blog" : "Add Blog"}</DialogTitle>
            </DialogHeader>

            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />

            <label className="block text-sm font-medium">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium">Summary</label>
            <textarea
              placeholder="Summary"
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm resize-y min-h-[100px]"
              required
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
              <Button type="submit" disabled={loading} className="gap-2 cursor-pointer bg-green-500">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} {editBlog ? "Update" : "Add"}
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

      {/* Delete Confirmation */}
      <Dialog open={!!deleteBlogItem} onOpenChange={(open) => !open && setDeleteBlogItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[var(--primary-green)]">{deleteBlogItem?.title}</span>? This action
            cannot be undone.
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete} disabled={loading} className="gap-2 cursor-pointer">
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
