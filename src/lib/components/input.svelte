<script>
	import { is_mobile } from '../js/store';
	import { createEventDispatcher } from 'svelte';

	const THRESHOLD = 25; //define swipe sensitivity
	const dispatch = createEventDispatcher();

	//swipe object used to calculate the direction of swipe
	let swipe = {
		start: false,
		_angle: 0,
		x_start: 0,
		y_start: 0,
		x_end: 0,
		y_end: 0,
		_calc_angle: function () {
			// calculate the angle on swipe
			this._angle =
				(Math.atan(Math.abs(this.y_end - this.y_start) / Math.abs(this.x_end - this.x_start)) *
					180) /
				Math.PI;
		},
		get_swipe: function () {
			// based on angle calculate the final direction of swipe otherwise INVALID
			this._calc_angle();
			if (this._angle >= 90 - THRESHOLD && this._angle <= 90)
				return this.y_end < this.y_start ? 'UP' : 'DOWN';

			if (this._angle >= 0 && this._angle <= THRESHOLD)
				return this.x_end > this.x_start ? 'RIGHT' : 'LEFT';

			return 'INVALID';
		}
	};

	function key_pressed(k) {
		if (!$is_mobile) {
			//if on desktop dispatch arrow key press as swipe
			if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(k.key))
				dispatch('move', k.key.substring(5).toUpperCase());
		}
	}

	function touch_start(e) {
		//start tracking the swipe action
		if ($is_mobile) {
			swipe.start = true;
			swipe.x_start = e.touches[0].screenX;
			swipe.y_start = e.touches[0].screenY;
		}
	}

	function touch_move(e) {
		//swipe action in progress
		//we do care just about last point
		if ($is_mobile) {
			if (swipe.start) {
				swipe.x_end = e.touches[0].screenX;
				swipe.y_end = e.touches[0].screenY;
			}
		}
	}

	function touch_end() {
		//swipe action end
		//if valid direction trigger notify caller
		if ($is_mobile) {
			swipe.start = false;
			let direction = swipe.get_swipe();
			if (direction != 'INVALID') dispatch('move', direction);
		}
	}
</script>

<svelte:window
	on:keydown={key_pressed}
	on:touchstart={touch_start}
	on:touchmove={touch_move}
	on:touchend={touch_end}
/>