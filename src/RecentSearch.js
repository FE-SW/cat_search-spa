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
            <section class="recentSearch-container">
                <ul>
                    ${this.data.map(d => `<li class="recentSearch-box" key=${d}>${d}
                </li>
                `)}
            </ul>
            </section>
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