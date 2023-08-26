class Toggle {
    $checkBox = null;
    data = null;

    constructor({ $target }) {
        this.$checkBox = document.createElement("input");
        this.$checkBox.type = "checkbox";
        this.$checkBox.className = "CheckBox";
        
        this.data = { checked: false };

        $target.appendChild(this.$checkBox);


        this.$checkBox.addEventListener("change", (e) => {
            console.log('e.target',e.target.checked)
            if (e.target.checked) {
                this.setState({ checked: true });
                document.body.classList.add("dark-theme");
            } else {
                this.setState({ checked: false });
                document.body.classList.remove("dark-theme");
            }
        })

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        this.$checkBox.checked = this.data?.checked;
    }
}