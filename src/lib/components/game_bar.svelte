<script>
	import { score, best_score, start_game } from '../js/store';
    import { fly, fade } from 'svelte/transition';

    const ANIMATION_LEN = 500;
    let current_score = 0;
    let delta_score = 0;

    let animate_score = false;

    /* function score_animation(timeout) {
        //start animation and stop it after a timeout
        //then update score and best score
        animate_score = true;
        setTimeout(() => {
                animate_score = false;
                current_score += delta_score;
                if (current_score > $best_score) $best_score = current_score;
            }
            , timeout
        );
    }

	//update best score if needed
    score.subscribe((v) => {
        // this is a trick as gained points might be the same on different moves
        // this way we can recognize changes in score for every move
        delta_score = v - current_score;
        if(delta_score > 0) score_animation(ANIMATION_LEN); 
    }); */

	function new_game() {
		$score = 0;
        delta_score = 0;
        current_score = 0;
		$start_game = true;
	}
</script>

<div class="controller">
    <!-- animation score -->
    <!-- {#if animate_score}
        <div class="delta-score text"  
            in:fly={{ delay:0, duration: ANIMATION_LEN, x: 0, y: 80 }}
        >
                +{delta_score}
        </div>
    {:else}
        <div class="delta-score text hidden">+{delta_score}</div>
    {/if}
	<div class="title text">2048</div>
	<div class="cell-score score text">
		<span class="cell-score-title">SCORE</span>
		<span class="cell-score-value">{current_score}</span>
	</div>
	<div class="cell-score best text">
		<span class="cell-score-title">BEST</span>
		<span class="cell-score-value">{$best_score}</span>
	</div>
	<div class="subtitle text">Join the numbers and get to the <b>2048 tile!</b></div> -->
	<button class="new text" on:click={new_game}>New Game</button>
</div>

<style>
	.controller {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		row-gap: 15px;
		column-gap: 10px;
		align-items: center;
	}

	.cell-score {
  		display: flex;
		flex-direction: column;
		border-radius: 3px;
		background-color: var(--cell-bg);
		width: 100%;
		aspect-ratio: 1;
		font-weight: bold;
	}

	.score {
		grid-column: 5/6;
	}

	.best {
		grid-column: 6/7;
	}

	.cell-score-title {
		color: #eee4da;
		font-size: 14px;
		margin-top: 10px;
	}

	.cell-score-value {
		color: var(--button-fg) !important;
		padding-top: 10px;
		font-size: 18px;
	}

	.text {
		color: var(--main-text-color);
		font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
	}

	.title {
		grid-column: 1/4;
		font-size: 60px;
		font-weight: bold;
	}

	.subtitle {
		grid-column: 1/5;
	}

	.new {
		all: unset;
		grid-column: 5/7;
		background-color: var(--button-bg);
		color: var(--button-fg);
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		font-weight: bold;
		border-radius: 3px;
		cursor: pointer;
	}

    .delta-score {
        font-size: 28px;
        font-weight: bolder;
        position: relative;
        top: 15px;
        grid-column: 5/6;
    }

    .hidden {
        visibility: hidden;
    }

	@media only screen and (max-width: 600px) {
		.cell-score-title {
			font-size: 12px;
			margin-top: 5px;
		}

		.cell-score-value {
			color: var(--button-fg) !important;
			margin-bottom: 10px;
			font-size: 12px;
		}

		.new {
			height: 40px;
			line-height: 40px;
			font-size: 16px;
		}

        .delta-score {
            font-size: 22px;
            font-weight: bolder;
            position: relative;
            top: 25px;
            grid-column: 5/6;
        }
	}
</style>