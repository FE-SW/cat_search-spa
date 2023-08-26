class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
  
      this.data = data;
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
  
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
        this.$imageInfo.style.display = "block";
  
        // display를 변경하고 바로 클래스를 추가/제거하면 transition 효과가 제대로 작동하지 않을 수 있음
        // 따라서 requestAnimationFrame을 사용하여 브라우저에 다음 애니메이션 프레임에 클래스 변경을 스케쥴링함
        window.requestAnimationFrame(() => {
          this.$imageInfo.classList.add('visible');
        });
  
        const $contentWrapper = this.$imageInfo.querySelector('.content-wrapper');
        const $close = this.$imageInfo.querySelector('.close');
  
  
        $close.addEventListener('click', () => {
          console.log(22)
          this.setState({ ...this.data, visible: false });
        });
  
        $contentWrapper.addEventListener('mouseleave', () => {
          this.setState({ ...this.data, visible: false });
        });
  
  
        // keyup 이벤트는 focusable한 요소들(예: input, button 등) 또는 document, window에 바인드할 수 있음
        // 일반적인 div 엘리먼트에는 focus를 받지 못하므로 keyup 이벤트를 사용할 수 없음
        // 이벤트 리스너를 document 레벨에서 설정하는 것이 바람직함
  
        document.addEventListener("keyup", e => {
          if (e.keyCode === 27) { // esc 버튼 누르면 모달창 닫힘
            console.log(11)
            this.setState({ ...this.data, visible: false });
          }
        });
  
      } else {
        //fade out 
        this.$imageInfo.classList.remove('visible');
        this.$imageInfo.addEventListener('transitionend', () => {
          if (!this.$imageInfo.classList.contains('visible')) {
            this.$imageInfo.style.display = "none";
          }
        }, { once: true });
      }
    }
  }
  
  // 주의해야 할 점은, CSS transition은 display 속성에 적용되지 않기 때문에 opacity를 조절하고 display 속성을 따로 설정하여 모달을 보이게/숨기게 적용
  // transitionend 이벤트를 사용하여 fade out 애니메이션이 완료되면 display를 "none"으로 설정하여 모달을 실제로 화면에서 제거함