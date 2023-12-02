export class Random {
    constructor({ $target, onClick }) {
        this.$random = document.createElement("button");;
        this.$random.type = "button"

        this.$random.className = "button";
        this.$random.textContent = "랜덤"
        $target.appendChild(this.$random);


        this.$random.addEventListener("click", e => {
            onClick()
        });
    }

    render() { }
}
