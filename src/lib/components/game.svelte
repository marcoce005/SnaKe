<script>
    const base = 10;

    let list = Array(base * base).fill({ moved: 0, type: "" });
    let head = 14;
    let tail = 17;

    list[14] = { moved: 0, type: "h" };
    list[15] = { moved: 0, type: "b" };
    list[16] = { moved: 0, type: "b" };
    list[17] = { moved: 0, type: "t" };

    const get_row = (r) => {
        return list.slice(r * base, r * base + base);
    };

    const update_row = (r, row) => {
        list.splice(r * base, base, ...row);
    };

    const update_head_tail = () => {
        list.filter((e, i) => {
            if (e === "h") head = i;
            else if (e === "t") tail = i;
        });
    };

    const left = () => {
        /* you can go left only verse id different to right */
        let row = get_row(Math.floor(head / 10));
        row.splice(row.length, 0, row.splice(0, 1)[0]);
        update_row(Math.floor(head / 10), row);
        list = [...list];
        update_head_tail();
        setTimeout(() => left(), 250);
    };

    const down = () => {
        console.log("stop");
    };
</script>

<div class="grid">
    {#each list as l, i}
        <div class="cell {l.type}">{i}</div>
    {/each}
</div>

<input type="button" value="left" on:click={left} />
<input type="button" value="down" on:click={down} />

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
