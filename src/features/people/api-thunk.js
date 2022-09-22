import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPeople } from "api";

// get detail cast
export const getDetailCast = createAsyncThunk(
  "detail-casts",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiPeople.getDetailCast(id, params);
    return response;
  }
);
