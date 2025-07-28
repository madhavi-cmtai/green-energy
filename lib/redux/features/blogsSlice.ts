import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { setLoading } from "./leadSlice";

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  summary: string;  
  features: string[];        
  category: string;
  image?: string;          
  date: string;
}

interface BlogState {
  blogs: BlogItem[];
  isLoading: boolean;
  error: string | null;
  selectedBlog: BlogItem | null; 
}

const initialState: BlogState = {
  blogs: [],
  isLoading: false,
  error: null,
  selectedBlog: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
    clearBlogs: (state) => {
      state.blogs = [];
    },
  },
});

export const { setBlogs, setIsLoading, setError, setSelectedBlog, clearSelectedBlog, clearBlogs} = blogSlice.actions;

export const fetchBlogs = () => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get("/api/routes/blogs");
    if (response.status === 200) {
      dispatch(setBlogs(response.data.data));
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message || "Unknown error"));
  }
};

export const fetchBlogById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(`/api/routes/blogs/${id}`);
    if (response.status === 200) {
      dispatch(setSelectedBlog(response.data.data));
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message || "Unknown error"));
  }
};


export const titleToSlug = (title: string) =>
  encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));

// Fetch blog by slug
export const fetchBlogByTitle = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`/api/routes/blogs/${id}`);
    dispatch(setSelectedBlog(res.data.data));
  } catch (err: any) {
    dispatch(setError(err?.message || "Failed to fetch blog"));
  }
};


export const addBlog = (formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post("/api/routes/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      dispatch(setBlogs(response.data.data));
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message || "Unknown error"));
  }
};

export const updateBlog = (formData: FormData, id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.put(`/api/routes/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      dispatch(setBlogs(response.data.data));
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message || "Unknown error"));
  }
};

export const deleteBlog = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.delete(`/api/routes/blogs/${id}`);
    if (response.status === 200) {
      dispatch(setBlogs(response.data.data));
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message || "Unknown error"));
  }
};

// Selectors
export const selectBlogs = (state: RootState) => state.blogs.blogs;
export const selectSelectedBlog = (state: RootState) => state.blogs.selectedBlog;
export const selectIsLoading = (state: RootState) => state.blogs.isLoading;
export const selectError = (state: RootState) => state.blogs.error;

// Export the reducer
export default blogSlice.reducer;
