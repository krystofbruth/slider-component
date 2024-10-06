class MoveEvent extends Event {
  constructor(name, value) {
    super(name);
    this.value = value;
  }
}

class SliderComponent extends EventTarget {
  constructor(root, params) {
    super();

    this.root = root;
    this.params = params || {};
    this.params.mode = this.params.mode || "precise";

    if (this.params.mode === "performance") {
      this.min = 0;
      this.max = 100;
    } else {
      this.min = this.params.min || 0;
      this.max = this.params.max || 100;
    }

    this.mouseover = false;

    this.constructChildElements();

    this.value = this.params.startValue || this.min;
    this.range = this.max - this.min;

    this.calculateDimensions();
    window.addEventListener("resize", () => {
      this.calculateDimensions();
      this.move(this.value);
    });

    this.move(this.value);

    this.root.addEventListener("mouseover", () => {
      this.mouseover = true;
    });

    this.root.addEventListener("mouseleave", () => {
      this.mouseover = false;
    });

    document.addEventListener("mousedown", (event) => {
      if (this.mouseover) {
        this.beginDrag(event);
      }
    });
  }

  move(value) {
    this.value = this.clamp(value, this.min, this.max);

    if (this.params.mode === "precise" || this.params.mode === "performance") {
      let position = (this.width / this.range) * this.value;

      this.setThumbElementPosition(position);
      this.setProgressElementWidth(position);
      return;
    }

    if (this.params.mode === "staggered") {
      this.value = Math.round(this.value);
      let position = this.pieceWidth * (this.value - this.min);

      this.setThumbElementPosition(position);
      this.setProgressElementWidth(position);
      return;
    }
  }

  beginDrag(initialEvent) {
    this.thumbElement.classList.add("active");

    const moveListener = this.getMoveListener();

    moveListener(initialEvent);

    document.addEventListener("mousemove", moveListener);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveListener);

      this.thumbElement.classList.remove("active");
      this.dispatchEvent(new MoveEvent("finished", this.value));
    });
  }

  getMoveListener() {
    if (this.params.mode === "precise") {
      return (event) => {
        let relativePosition =
          this.clamp(event.clientX, this.startX, this.endX) - this.startX;

        let percentage = (100 * relativePosition) / this.width;
        this.value = (percentage * this.range) / 100 + this.min;

        this.setThumbElementPosition(relativePosition);
        this.setProgressElementWidth(relativePosition);

        this.dispatchEvent(new MoveEvent("change", this.value));
      };
    }

    if (this.params.mode === "performance") {
      return (event) => {
        let relativePosition =
          this.clamp(event.clientX, this.startX, this.endX) - this.startX;
        this.value = (100 * relativePosition) / this.width;

        this.setThumbElementPosition(relativePosition);
        this.setProgressElementWidth(relativePosition);
      };
    }

    if (this.params.mode === "staggered") {
      return (event) => {
        let relativePosition =
          this.clamp(event.clientX, this.startX, this.endX) - this.startX;

        let pieceCount = this.clamp(
          Math.round(relativePosition / this.pieceWidth),
          0,
          this.range
        );

        if (this.value !== pieceCount + this.min) {
          this.value = pieceCount + this.min;
          this.setThumbElementPosition(pieceCount * this.pieceWidth);
          this.setProgressElementWidth(
            pieceCount * this.pieceWidth + this.thumbWidth
          );
          this.dispatchEvent(new MoveEvent("change", pieceCount + this.min));
        }
      };
    }
  }

  setProgressElementWidth(position) {
    if (this.value === this.min) {
      this.progressElement.style.width = "0px";
      return;
    }

    switch (this.params.mode) {
      case "precise":
      case "performance":
        this.progressElement.style.width = `${
          position + this.thumbWidth / 4
        }px`;
        break;
      case "staggered":
        this.progressElement.style.width = `${position}px`;
        break;
      default:
        break;
    }
  }

  setThumbElementPosition(position) {
    switch (this.params.mode) {
      case "precise":
      case "performance":
        this.thumbElement.style.left = `${position - this.thumbWidth / 2}px`;
        break;
      case "staggered":
        this.thumbElement.style.left = `${position}px`;
        break;
      default:
        break;
    }
  }

  clamp(value, min, max) {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }

  calculateDimensions() {
    this.thumbWidth = this.thumbElement.getBoundingClientRect().width;

    let boundingClientRect = this.root.getBoundingClientRect();
    this.width = boundingClientRect.width - this.thumbWidth;
    this.startX = boundingClientRect.x;
    this.endX = boundingClientRect.x + boundingClientRect.width;

    if (this.params.mode === "staggered") {
      this.pieceWidth = this.width / this.range;
    }
  }

  constructChildElements() {
    this.progressElement = document.createElement("div");
    this.progressElement.classList.add("progress");
    this.progressElement.setAttribute("draggable", "false");
    this.thumbElement = document.createElement("div");
    this.thumbElement.classList.add("thumb");
    this.thumbElement.setAttribute("draggable", "false");

    this.root.appendChild(this.progressElement);
    this.root.appendChild(this.thumbElement);
  }
}
