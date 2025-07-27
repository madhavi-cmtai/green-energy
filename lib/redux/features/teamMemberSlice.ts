// lib/redux/slices/teamMemberSlice.ts
import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"
import axios from "axios"

export interface TeamMember {
    id?: string
    name: string
    position?: string
    image?: string
    bio?: string
    linkedin?: string
    email?: string
    createdOn?: any
    updatedOn?: any
}

interface TeamMemberState {
    members: TeamMember[]
    selected: TeamMember | null
    loading: boolean
    error: string | null
}

const initialState: TeamMemberState = {
    members: [],
    selected: null,
    loading: false,
    error: null,
}

const teamMemberSlice = createSlice({
    name: "teamMembers",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setMembers(state, action) {
            state.members = action.payload
        },
        setSelected(state, action) {
            state.selected = action.payload
        },
    },
})

export const {
    setLoading,
    setError,
    setMembers,
    setSelected,
} = teamMemberSlice.actions

export default teamMemberSlice.reducer

// Async Thunks
export const fetchTeamMembers = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const res = await axios.get("/api/routes/teams")
        dispatch(setMembers(res.data.data))
    } catch {
        dispatch(setError("Failed to fetch team members"))
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchTeamMemberById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const res = await axios.get(`/api/routes/teams/${id}`)
        dispatch(setSelected(res.data.data))
    } catch {
        dispatch(setError("Failed to fetch member"))
    } finally {
        dispatch(setLoading(false))
    }
}

export const addTeamMember = (formData: FormData) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        await axios.post("/api/routes/teams", formData)
        await dispatch(fetchTeamMembers())
    } catch {
        dispatch(setError("Failed to add team member"))
    } finally {
        dispatch(setLoading(false))
    }
}

export const updateTeamMember = ({ formData, id }: { formData: FormData; id?: string }) => async (dispatch: AppDispatch) => {
    if (!id) return
    dispatch(setLoading(true))
    try {
        await axios.put(`/api/routes/teams/${id}`, formData)
        await dispatch(fetchTeamMembers())
    } catch {
        dispatch(setError("Failed to update team member"))
    } finally {
        dispatch(setLoading(false))
    }
}

export const deleteTeamMember = (id?: string) => async (dispatch: AppDispatch) => {
    if (!id) return
    dispatch(setLoading(true))
    try {
        await axios.delete(`/api/routes/teams/${id}`)
        await dispatch(fetchTeamMembers())
    } catch {
        dispatch(setError("Failed to delete team member"))
    } finally {
        dispatch(setLoading(false))
    }
}

// Selectors
import type { RootState } from "../store"

export const selectTeamMembers = (state: { teamMembers: TeamMemberState }) => state.teamMembers.members;
export const selectTeamMember = (state: RootState) => state.teamMembers.selected
export const selectIsLoading = (state: RootState) => state.teamMembers.loading
export const selectError = (state: RootState) => state.teamMembers.error
