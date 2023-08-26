const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    this.$searchInput = document.createElement("input");;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    this.$searchInput.className = "SearchInput";
    $target.appendChild(this.$searchInput);

    // keyup 이벤트는 focusable한 요소들(예: input, button 등) 또는 document, window에 바인드할 수 있음 
    this.$searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    this.$searchInput.addEventListener("click", e => {
      const contents = this.$searchInput.value

      if (contents !== "") {
        this.$searchInput.value = ""
      }
    });
  }

  focusInput() {
    this.$searchInput.focus();
  }

  unfocusInput() {
    this.$searchInput.blur();
  }

  render() { }
}
