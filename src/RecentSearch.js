class RecentSearch {
    data = [];
    onClick = null;
    constructor({ $target, onClick }) {
        this.$recentSearch = document.createElement("div");;

        this.$recentSearch.className = "recentSearch";
        this.onClick = onClick;
        $target.appendChild(this.$recentSearch);

        this.render()
    }

    setState(search){
        if(this.data.length<5){
            this.data.push(search)
        }
        else{
            this.data.splice(0, 1)
            this.data.push(search)
        }
        this.render();
    }

    render() {
        if (this.data.length > 0) {
            this.$recentSearch.innerHTML = `
            <div class="recentSearch-container">
              ${this.data
                    .map(
                        d => `
                    <div class="recentSearch-box" key=${d}>
                      ${d}
                    </div>
                  `
                    )}
            </div>
          `;

            this.$recentSearch.querySelectorAll(".recentSearch-box").forEach(($item, index) => {
                $item.addEventListener("click", () => {
                    console.log('this.data[index]', this.data[index])
                    this.onClick(this.data[index]);

                });
            });
        }
    }
}