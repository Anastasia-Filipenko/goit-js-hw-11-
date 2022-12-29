import axios from 'axios';

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  
  async fetchSearch() {
    const API_KEY = '32445891-4e5aca6c6794ec22921e6fc5b';

    const response = await axios(
      `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    const result = await response.data;
    this.incrementPage();
      return result;
      
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

