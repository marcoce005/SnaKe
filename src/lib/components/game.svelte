<script>
    import Input from "./input.svelte";
    import { start_game, score } from "../js/store";

    const base = 10;

    let list = Array(base * base).fill({ prev: -1, type: "" });

    let head = 14;
    list[head] = { prev: 14, type: "h" };
    list[15] = { prev: 15, type: "b" };
    list[16] = { prev: 16, type: "b" };
    list[17] = { prev: 17, type: "b" };

    /* const get_row = (r) => {
        return list.slice(r * base, r * base + base);
    };

    const update_row = (r, row) => {
        list.splice(r * base, base, ...row);
    }; */
    
    const update_head = () => {
        list.filter((e, i) => {
            if (e === "h") head = i;
        });
    };
    
    function handle_move(e) {
        /* deal with the event created by input.svelte */
        console.log(e.detail);
        motion(e.detail);
    }

    const motion = (direction) => {
        /* selector of the type of movement, it deal with the event created by component input */
        switch (direction) {
            case "LEFT":
                left();
                //setTimeout(() => left(), 250);
                break;
            case "RIGHT":
                right();
                break;
            case "UP":
                break;
            case "DOWN":
                break;
            default:
                break;
        }
        //setTimeout(() => motion(direction), 250);
    };

    const left = () => {
        //you can go left only verse id different to right
        /* let row = get_row(Math.floor(head / 10));
        row.splice(row.length, 0, row.splice(0, 1)[0]);
        update_row(Math.floor(head / 10), row);
        list = [...list]; */

        head--;
        
        update_head();
    };

    const right = () => {
        console.log("stop");
    };
</script>

<div class="grid">
    {#each list as l, i}
        <div class="cell {l.type}">{i}</div>
    {/each}
</div>

<Input on:move={handle_move} />

<style>
    .grid {
        margin-left: auto;
        margin-right: auto;
        width: 320px;
        display: grid;
        grid-template-columns: repeat(10, 32px);
    }

    .cell {
        width: 32px;
        height: 32px;
        border: 1px dotted black;
    }

    .h {
        background-color: red;
    }

    .b,
    .t {
        background-color: green;
    }
</style>
