import { action, computed, flow, observable } from 'mobx';
import { getPaginatedMovieList } from '../utils/api-service';

export const DEFAULT_PARAMS = {
    page: 1,
    limit: 20,
    order: 'asc',
    sort_by: 'title',
};

export class TableStore {
    @observable moviesList = [];
    @observable paginatedMoveList = [];
    @observable allMoviesCount = 0;
    @observable selectedMovieData = {
        title: '',
        rottenTomatoesRating: '',
        imdbRating: null,
        imdbVotes: null,
    };
    @observable lastClickedRowIndex = '';
    @observable filterParams = DEFAULT_PARAMS;
    @observable loadedPages = [];

    @observable isLoadingTableData = false;
    @observable isSelectedMovieModalVisible = false;
    @observable isInfiniteListEnabled = false;

    @observable isFirstLoad = true;

    @observable tableError = null;

    @computed get paginatedMovieList () {
        const startIndex = (this.filterParams.page - 1) * this.filterParams.limit;
        const endIndex = this.filterParams.page * this.filterParams.limit;

        return this.moviesList.slice(startIndex, endIndex);
    }

    @computed get lastConsecutivePage () {
        let lastConsecutivePage = null;

        for (let index = 0; index < this.loadedPages.length; index = index + 1) {
            if (this.loadedPages[index] === this.loadedPages[index + 1]) {
                lastConsecutivePage = index + 1;

                break;
            }
        }

        return lastConsecutivePage;
    }

    @computed get infiniteMovieList () {
        let lastConsecutiveMovie = null;

        for (let index = 0; index < this.moviesList.length; index = index + 1) {
            if (this.moviesList[index + 1] === undefined) {
                lastConsecutiveMovie = index + 1;

                break;
            }
        }

        return this.moviesList.slice(0, lastConsecutiveMovie);
    }

    *_getPaginatedMovieList () {
        if (this.loadedPages.includes(this.filterParams.page)) {
            return;
        }

        this.setTableError(null);
        this.setLoadingTableData(true);

        try {
            const { data } = yield getPaginatedMovieList(this.filterParams);

            if (this.isFirstLoad) {
                this.moviesList = [...Array(data.count)];
                this.isFirstLoad = false;
            }

            this.loadedPages.push(this.filterParams.page);
            this.setAllMoviesCount(data.count);
            this.setMoviesList(data.list);
        } catch (error) {
            this.setTableError(error.response.data.message);
        } finally {
            this.setLoadingTableData(false);
        }
    }
    getPaginatedMovieList = flow(this._getPaginatedMovieList);

    @action setMoviesList (data) {
        const startIndex = (this.filterParams.page - 1) * this.filterParams.limit;

        this.moviesList.splice(startIndex, data.length, ...data);
    }

    @action setCurrentFilterParams (filterParams) {
        this.filterParams = { ...this.filterParams, ...filterParams };
    }

    @action changeOrderDirection () {
        this.filterParams.order = this.filterParams.order === 'asc' ? 'desc' : 'asc';
        this.resetMovieListAndGetMovies();
    }

    @action changeSortBy (sortBy) {
        this.filterParams.sort_by = sortBy;
        this.filterParams.order = 'asc';
        this.resetMovieListAndGetMovies();
    }

    @action resetMovieListAndGetMovies () {
        this.moviesList = [];
        this.loadedPages = [];
        this.isFirstLoad = true;
        this.filterParams.page = 1;
        this.getPaginatedMovieList();
    }

    @action setAllMoviesCount (count) {
        this.allMoviesCount = count;
    }

    @action setLoadingTableData (value) {
        this.isLoadingTableData = value;
    }

    @action setSelectedMovieData (data, index) {
        this.selectedMovieData = data;
        this.lastClickedRowIndex = index;
    }

    @action setSelectedMovieModalVisible (value) {
        this.isSelectedMovieModalVisible = value;
    }

    @action.bound toggleInfiniteList () {
        this.isInfiniteListEnabled = !this.isInfiniteListEnabled;
    }

    @action setTableError (error) {
        this.tableError = error;
    }
}
