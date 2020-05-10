export default function registerEasterEgg() {
    const pattern = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'a', 'b'];

    let events = [];
    let timeout;

    const clearEvents = () => {
        events = [];
    };

    window.addEventListener('keydown', (e) => {
        if (pattern.indexOf(e.key.toLowerCase()) >= 0) {
            events.push(e.key.toLowerCase());

            if (pattern.length === events.length && pattern.every((element, index) => element === events[index])) {
                document.querySelector('body').dataset.restart = 'true';
            }

            window.clearTimeout(timeout)
            timeout = window.setTimeout(clearEvents, 1000);
        }
    });
}
