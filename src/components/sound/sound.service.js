import pipboySelect from "../../assets/sounds/pipboy/ui_pipboy_select.wav";
import pipboyHighlight from "../../assets/sounds/pipboy/ui_pipboy_highlight.wav";
import pipboyMode from "../../assets/sounds/pipboy/ui_pipboy_mode.wav";

export const SoundService = {
  init() {
    this.enabled = "true" === localStorage.getItem("soundEnabled");
    this.sounds = {
      // '.' - added for production support of static files, problem with finding them on production.
      select: new Audio("." + pipboySelect),
      highlight: new Audio("." + pipboyHighlight),
      mode: new Audio("." + pipboyMode),
    };
  },

  play() {
    return;
    //
    // if(this.enabled) {
    // this.sounds[soundName].play();
    // }
  },

  toggleSound(value) {
    localStorage.setItem("soundEnabled", value);
    this.enabled = value;
  },
};
