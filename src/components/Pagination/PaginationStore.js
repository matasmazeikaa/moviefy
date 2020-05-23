import { observable, action, computed } from 'mobx';

const DEFAULT_PAGINATION = {
    limit: 30,
    page: 1,
};
const DEFAULT_PAGES = [1, 2, 3];

export class PaginationStore {
    constructor (tableStore) {
        this.tableStore = tableStore;
    }

    @observable currentPage = DEFAULT_PAGINATION.page;
    @observable visiblePageSelections = DEFAULT_PAGES;
    @observable moviesPerPage = DEFAULT_PAGINATION.limit;

    @computed get totalPages () {
        return Math.round(this.tableStore.allMoviesCount / this.moviesPerPage);
    }

    @computed get lastCurrentPage () {
        return this.visiblePageSelections[this.visiblePageSelections.length - 1];
    }

    @action setPage (page) {
        const params = {
            page,
            limit: this.moviesPerPage,
        };

        if (page === this.lastCurrentPage && page !== this.totalPages) {
            this.incrementVisiblePageSelection();
        }

        if (page === this.visiblePageSelections[0] && page !== 1) {
            this.decrementVisiblePageSelection();
        }

        if (page === 1) {
            this.visiblePageSelections = DEFAULT_PAGES;
        }

        if (page === this.totalPages) {
            this.visiblePageSelections = [this.totalPages - 2, this.totalPages - 1, this.totalPages];
        }

        this.tableStore.getPaginatedMovieList(params);
        this.currentPage = page;
    }

    @action.bound setNextPage () {
        const nextPage = this.currentPage + 1;

        this.setPage(nextPage);
    }

    @action.bound setPreviousPage () {
        const previousPage = this.currentPage - 1;

        this.setPage(previousPage);
    }

    @action incrementVisiblePageSelection () {
        this.visiblePageSelections.forEach((page, index) => {
            this.visiblePageSelections[index] = this.visiblePageSelections[index] + 1;
        });
    }

    @action decrementVisiblePageSelection () {
        this.visiblePageSelections.forEach((page, index) => {
            this.visiblePageSelections[index] = this.visiblePageSelections[index] - 1;
        });
    }

    @action pushPageOnIncremention () {
        const pageToPush = this.visiblePageSelections[this.visiblePageSelections.length - 1] + 1;

        this.visiblePageSelections.push(pageToPush);
    }

    @action popPageOnDecremention () {
        this.visiblePageSelections.pop();
    }
}
