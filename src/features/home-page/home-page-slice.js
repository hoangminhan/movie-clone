import { createSlice } from "@reduxjs/toolkit";
import {
  getCastsMovie,
  getDetail,
  getDetailKeyword,
  getDetailMovie,
  getDiscoverMovieTv,
  getEpisodeTv,
  getKeywords,
  getListGenresMovie,
  getListMovieKeyword,
  getListMovieOfGenres,
  getListReviews,
  getListTrending,
  getRecommendationMovie,
  getSeasonTv,
  getSimilarMovie,
  getTrailerMovie,
  handleGetListMovie,
  handleGetListMovieTopRated,
  handleGetListMovieUpComming,
} from "./api-thunk";
const initialState = {
  listMovie: [],
  listMovieTopRated: [],
  listMovieUpComing: [],
  listCastsMovie: [],
  listSimilarMovie: [],
  listRecommendationMovie: [],
  listKeywordsMovie: [],
  listReviewsMovie: {},
  infoTrailerMovie: {},
  listGenresMovie: [],
  dataDiscoverMovie: {},
  listMovieKeyword: {},
  dataDetailKeyword: {},
  listMovieOfGenres: {},
  dataSeasonTv: {},
  dataEposideTv: {},
  isLoading: false,
  detail: {
    currentPage: 1,
    totalPages: 1,
  },
  listTrending: [],
  detailTrending: {
    currentPage: 1,
    totalPages: 1,
  },
  dataDetail: {},
  isLoadingChangeTab: false,
};
export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    reducerClearSimilarMovie: (state, action) => {
      state.listSimilarMovie = [];
    },
    reducerLoadingChangeTab: (state, action) => {
      state.isLoadingChangeTab = action.payload;
    },
  },
  extraReducers: {
    // handle get list movie
    [handleGetListMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [handleGetListMovie.fulfilled]: (state, action) => {
      const { results, page, total_pages } = action.payload;
      state.listMovie = results;
      state.detail = {
        ...state.detail,
        currentPage: page,
        totalPages: total_pages,
      };
      state.isLoading = false;
    },
    [handleGetListMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // movie top rated
    [handleGetListMovieTopRated.pending]: (state, action) => {
      state.isLoading = true;
    },
    [handleGetListMovieTopRated.fulfilled]: (state, action) => {
      const { results, page, total_pages } = action.payload;
      state.listMovieTopRated = results;
      // state.detail = {
      //   ...state.detail,
      //   currentPage: page,
      //   totalPages: total_pages,
      // };
      state.isLoading = false;
    },

    [handleGetListMovieTopRated.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // get list upComing

    [handleGetListMovieUpComming.fulfilled]: (state, action) => {
      const { results, page, total_pages } = action.payload;
      state.listMovieUpComing = results;
    },

    // handle get list trending
    [getListTrending.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListTrending.fulfilled]: (state, action) => {
      const { results, page, total_pages } = action.payload;
      state.listTrending = results;
      state.detailTrending = {
        ...state.detailTrending,
        currentPage: page,
        totalPages: total_pages,
      };

      state.isLoading = false;
    },
    [getListTrending.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // get detail movie
    [getDetailMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDetailMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dataDetail = action.payload;
    },
    [getDetailMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // get trailer movie
    [getTrailerMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTrailerMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.infoTrailerMovie =
        action.payload.results[action.payload.results.length - 1];
    },
    [getTrailerMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // similar movie
    [getSimilarMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getSimilarMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listSimilarMovie = [
        ...state.listSimilarMovie,
        ...action.payload.results,
      ];
    },
    [getSimilarMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // recommendation movie
    [getRecommendationMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getRecommendationMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listRecommendationMovie = action.payload.results;
    },
    [getRecommendationMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // get list casts of movie
    [getCastsMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCastsMovie.fulfilled]: (state, action) => {
      const { cast } = action.payload;
      state.listCastsMovie = cast.filter((item, index) => index <= 8);
      state.isLoading = false;
    },
    [getCastsMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // get list keywords of movie
    [getKeywords.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getKeywords.fulfilled]: (state, action) => {
      const { keywords, results } = action.payload;
      state.listKeywordsMovie = keywords ? [...keywords] : [...results];
      state.isLoading = false;
    },
    [getKeywords.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // get list reviews of movie
    [getListReviews.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListReviews.fulfilled]: (state, action) => {
      state.listReviewsMovie = { ...action.payload };
      state.isLoading = false;
    },
    [getListReviews.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // list genres movie
    [getListGenresMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListGenresMovie.fulfilled]: (state, action) => {
      state.listGenresMovie = [...action.payload.genres];
      state.isLoading = false;
    },
    [getListGenresMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // list discover movie
    [getDiscoverMovieTv.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDiscoverMovieTv.fulfilled]: (state, action) => {
      const { results } = action.payload;
      // const newResult = results.filter((item) => item.poster_path);
      // state.dataDiscoverMovie = { ...action.payload, results: [...newResult] };
      state.dataDiscoverMovie = { ...action.payload };
      state.isLoading = false;
    },
    [getDiscoverMovieTv.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // list  movie keyword
    [getListMovieKeyword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListMovieKeyword.fulfilled]: (state, action) => {
      state.listMovieKeyword = { ...action.payload };
      state.isLoading = false;
    },
    [getListMovieKeyword.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // list  detail keyword
    [getDetailKeyword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDetailKeyword.fulfilled]: (state, action) => {
      state.dataDetailKeyword = { ...action.payload };
      state.isLoading = false;
    },
    [getDetailKeyword.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // list movie of genres
    [getListMovieOfGenres.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListMovieOfGenres.fulfilled]: (state, action) => {
      state.listMovieOfGenres = { ...action.payload };
      state.isLoading = false;
    },
    [getListMovieOfGenres.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // get season tv
    [getSeasonTv.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getSeasonTv.fulfilled]: (state, action) => {
      state.dataSeasonTv = { ...action.payload };
      state.isLoading = false;
    },
    [getSeasonTv.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // get season tv
    [getEpisodeTv.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getEpisodeTv.fulfilled]: (state, action) => {
      state.dataEposideTv = { ...action.payload };
      state.isLoading = false;
    },
    [getEpisodeTv.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { reducer, actions } = movieSlice;
export const { reducerClearSimilarMovie, reducerLoadingChangeTab } = actions;
export default reducer;
