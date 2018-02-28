import pipboySelect from '../../assets/sounds/pipboy/ui_pipboy_select.wav';
import pipboyHighlight from '../../assets/sounds/pipboy/ui_pipboy_highlight.wav';
import pipboyMode from '../../assets/sounds/pipboy/ui_pipboy_mode.wav';

export const SoundService = {
   
    init() {
        this.sounds =  {
            select: new Audio(pipboySelect),
            highlight: new Audio(pipboyHighlight),
            mode: new Audio(pipboyMode)
        };
    },

    play(soundName) {
        this.sounds[soundName].play();
    }

}
