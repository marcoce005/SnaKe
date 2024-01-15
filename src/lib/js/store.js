import { readable, writable } from 'svelte/store';
import { UAParser } from 'ua-parser-js';
import { browser } from '$app/environment';

// export const is_mobile = readable(false);
export const is_mobile = readable(false, (set) => {
	let ua_parser = new UAParser();
	let is_mobile = ua_parser.getResult().device.type
		? ua_parser.getResult().device?.type
		: 'desktop';

	set(is_mobile != 'desktop');
});

//game status
export const start_game = writable(true);

//current game score and best score
export let score = writable(0);

//game local best score backed by localStorage
export const best_score = writable((browser && localStorage.getItem('best_score')) || '0');
best_score.subscribe((val) => {
	if (browser) return (localStorage.best_score = val);
});