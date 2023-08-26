class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
    loading = false;
    absense = false;
  
    constructor({ $target, initialData, onClick, focusFunc, unfocusFunc, loading, absense }) {
      this.$searchResult = document.createElement('div');
      this.$searchResult.className = 'SearchResult';
      $target.appendChild(this.$searchResult);
  
      this.data = initialData;
      this.onClick = onClick;
      this.loading = loading;
      this.absense = absense
  
      this.$searchResult.addEventListener("mouseover", e => {
        focusFunc()
      });
  
      this.$searchResult.addEventListener("mouseleave", e => {
        unfocusFunc()
      });
  
      this.render();
    }
  
    setState(nextData, nextLoading, nextAbsense) {
      this.data = nextData;
      this.absense = nextAbsense
      this.loading = nextLoading;
      this.render();
    }
  
    setAbsense(nextAbsense) {
      this.absense = nextAbsense
      this.render();
    }
  
    loadImagesLazy() {
      const images = this.$searchResult.querySelectorAll("img[data-src]");
  
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      });
  
      images.forEach(img => observer.observe(img));
    }
  
    render() {
      if (this.absense) {
        this.$searchResult.innerHTML = `<div class="loading">검색결과가 존재하지 않습니다</div>`
      }
      else if (this.loading) {
        this.$searchResult.innerHTML = `<div class="loading">Loading...</div>`
      } else {
        this.$searchResult.innerHTML = `
          <div class="grid-container">
            ${this.data
            .map(
              cat => `
                  <div class="item">
                    <img data-src="${cat.url}" alt="${cat.name}" loading="lazy"/>
                    <span>${cat.name}</span>
                  </div>
                `
            )
            .join("")}
          </div>
        `;
  
        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
          $item.addEventListener("click", () => {
            this.onClick(this.data[index]);
  
          });
  
          $item.addEventListener("mouseover", () => {
            console.log(`이름: ${this.data[index].name}`);
            const $span = $item.querySelector("span");
            if ($span) $span.style.display = "block";
          });
        
          $item.addEventListener("mouseleave", () => {
            const $span = $item.querySelector("span");
            if ($span) $span.style.display = "none";  //
          });
        });
        this.loadImagesLazy();
      }
    }
  }