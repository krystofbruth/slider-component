<div align="center">
  <a href="#">
  	<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGk3MzlyMXlhOWZhcDd5N204ODdoaG94YTY3bXEwMzJncGZrZXI0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r150JmHhKiOMfBfq0j/200.gif" alt="Logo of the project" height="160" />
  </a>
  <br>
  <br>
  <p>
    <b>slider-component</b>
  </p>
  <p>
     <i>Highly customizable and stylable range input (slider) built using vanilla CSS and JS.</i>
  </p>
  <p>

![Latest Version](https://img.shields.io/badge/Release-1.0.0-green)
![CSS Version](https://img.shields.io/badge/CSS-3-blue)
![ES version](https://img.shields.io/badge/Mimal_ES_version-2015-yellow)
![Package size](https://img.shields.io/badge/Size-12_kB-red)
[![code style: prettier](https://img.shields.io/badge/Code_style-Prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

  </p>
</div>

---

**Content**

- [Features](##features)
- [Install](##install)
- [Usage](##usage)
- [Exemples](##exemples)
- [Documentation](##documentation)

## Features ✨

- Style any part of the slider using CSS variables.
- Listen to events and change your content in real-time.
- Create staggered sliders for choosing from a set of options (see examples below).
- Have a range input that doesn't suck and doesn't look generic. ✨

## Install 🐙

Copy the repo and self host the contents of `src` at a location of your choice, then include it in your document like so:

```
// In <head> element
<link rel="stylesheet" href="path/to/SliderComponent.css" />
// At the end of <body>, but before your scripts
<script src="path/to/SliderComponent.js"></script>
```

_There currently isn't an official CDN link, using external sources is at your own risk!_

## Usage 💡

First, create an empty element with class `Slider` and set the `draggable` attribute to `false`:

```
<div class="Slider" draggable="false"></div>
```

Then, to initialize the component, simply call the constructor of the `SliderComponent` object and pass the empty element as a first parameter:

```
new SliderComponent(document.querySelector("div.Slider"));
```

Optionally, provide an object with parameters as a second parameter of the constructor:

```
new SliderComponent(document.querySelector("div.Slider"), { min: 10, max: 50, mode: "staggered" });
```

For more information about parameters, refer to the [documentation](##documentation);

## Examples 🖍

```
const sliderElement = document.querySelector("section.demo div.Slider");
let slider = new SliderComponent(sliderElement, {
  mode: "staggered",
  min: 0,
  max: 3,
});

let difficulties = [
  { color: "#4682B4" },
  { color: "#008000" },
  { color: "#ffdf00" },
  { color: "#FF0000" },
];
sliderElement.style.setProperty("--track", `${difficulties[0].color}55`);
sliderElement.style.setProperty("--selection", difficulties[0].color);
sliderElement.style.setProperty("--thumb", difficulties[0].color);
selection.style.color = difficulties[0].color;

slider.addEventListener("change", (event) => {
  sliderElement.style.setProperty(
    "--track",
    `${difficulties[event.value].color}55`
  );
  sliderElement.style.setProperty(
    "--selection",
    difficulties[event.value].color
  );
  sliderElement.style.setProperty(
    "--thumb",
    difficulties[event.value].color
  );
  selection.style.color = difficulties[event.value].color;
});
```

<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGk3MzlyMXlhOWZhcDd5N204ODdoaG94YTY3bXEwMzJncGZrZXI0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r150JmHhKiOMfBfq0j/200.gif" alt="Logo project" height="160" />

## Documentation 📄

Refer to the documentation inside the `/demo/<lang>/index.html` document.

## License ⚖️

This project is licenced under the **MIT License**. For more information, refer to `LICENSE.md`.
