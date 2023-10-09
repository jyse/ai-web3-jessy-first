import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  generatedImages: [
    {
      tokenId: "",
      prompt: "Astronaut girl with dark blue hair, illustration style",
      style: "Character",
      bookmarked: false,
      images: [
        "/output/genImgs/1.png",
        "/output/genImgs/2.png",
        "/output/genImgs/3.png",
        "/output/genImgs/4.png",
      ],
    },
    {
      tokenId: "",
      prompt:
        "8k portrait inspired by Wassily Kandinsky's 'Abstract Art,' featuring geometric shapes, vibrant colors, and spiritual themes.",
      style: "Art",
      bookmarked: false,
      images: [
        "/output/genImgs/5.png",
        "/output/genImgs/6.png",
        "/output/genImgs/7.png",
        "/output/genImgs/8.png",
      ],
    },
  ],
  loading: "idle",
};

export const fetchGeneratedImages = createAsyncThunk(
  "images/fetchGeneratedImages",
  async () => {
    const response = await fetch("/api/images");
    return response.data;
  }
);

export const generatedImages = createSlice({
  name: "generatedImages",
  initialState,
  reducers: {
    reset: () => initialState,
    addImage: (state) => {
      state.value;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchGeneratedImages.fulfilled, (state, action) => {
      state.generatedImages.push(action.payload);
    });
  },
});

export const {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
  reset,
} = generatedImages.actions;
export default generatedImages.reducer;
