import { action, flow, observable } from 'mobx';
import { getPaginatedMovieList } from '../utils/api-service';

const DEFAULT_PARAMS = {
    page: 1,
    limit: 30,
};

export class TableStore {
    @observable moviesList = [];
    @observable allMoviesCount = 0;
    @observable isLoadingTableData = false;
    @observable tableError = null;

    *_getPaginatedMovieList (params = DEFAULT_PARAMS) {
        this.setLoadingTableData(true);

        try {
            const { data } = yield getPaginatedMovieList(params);

            this.setAllMoviesCount(data.count);
            this.setMoviesList(data.list);
        } catch (error) {
            this.setTableError(error.data);
        } finally {
            this.setLoadingTableData(false);
        }
    }
    getPaginatedMovieList = flow(this._getPaginatedMovieList);

    @action setMoviesList (data) {
        this.moviesList = data;
    }

    @action setAllMoviesCount (count) {
        this.allMoviesCount = count;
    }

    @action setLoadingTableData (value) {
        this.isLoadingTableData = value;
    }

    @action setTableError (error) {
        this.tableError = error;
    }
}
