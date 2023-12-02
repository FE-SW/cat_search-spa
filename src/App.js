import { SearchInput } from './SearchInput.js';
import { RecentSearch } from './RecentSearch.js';
import { SearchResult } from './SearchResult.js';
import { ImageInfo } from './ImageInfo.js';
import { Toggle } from './Toggle.js';
import { Random } from './Random.js';
import * as api from './api.js';

console.log("app is running!");

export class App {
  $target = null;
  data = [];
  loading = false;
  absense = false;

  constructor($target) {
    this.$target = $target;
    const savedData = sessionStorage.getItem('data');
    if (savedData !== null) {
      this.data = JSON.parse(savedData);
    }
    else {
      this.data = []
    }

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading = true;
        this.absense = false;
        this.searchResult.setState(this.data, this.loading);
        this.recentSearch.setState(keyword);
        api.fetchCats(keyword).then(({ data }) => this.setState(data)).catch(() => this.absense = true);
      },
    });

    
    this.recentSearch = new RecentSearch({
      $target,
      onClick: keyword => {
        this.loading = true;
        this.absense = false;
        this.searchResult.setState(this.data, this.loading);
        api.fetchCats(keyword).then(({ data }) => this.setState(data)).catch(() => this.absense = true);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        const data = await api.cat(image.id)
        this.imageInfo.setState({
          visible: true,
          image: data.data
        });
      },
      focusFunc: this.searchInput.focusInput.bind(this.searchInput),
      unfocusFunc: this.searchInput.unfocusInput.bind(this.searchInput),
      loading:this.loading,
      absense:this.absense
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.toggle = new Toggle({
      $target,
    });

    this.random = new Random({
      $target,
      onClick:() => {
        this.loading = true;
        this.absense = false;
        this.searchResult.setState(this.data, this.loading);
        api.random().then(({ data }) => this.setState(data));
      },
    });

  }

  setState(nextData) {
    this.data = nextData;
    this.loading = false;

    if(nextData.length>0){
      this.searchResult.setState(nextData,this.loading,this.absense);
      sessionStorage.setItem('data', JSON.stringify(nextData));
    }
    else{
      this.absense = true;
      this.searchResult.setAbsense(this.absense)
      sessionStorage.removeItem('data')
    }
  }
}