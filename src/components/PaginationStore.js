import { observable, action } from 'mobx';


export class PaginationStore {
    @observable currentPage = 1;

    @action setNextPage () {
        this.currentPage += this.currentPage + 1;
    }

    @action setPreviousPage () {
        this.currentPage -= this.currentPage;
    }
}
