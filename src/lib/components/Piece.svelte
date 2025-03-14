<script lang="ts">
    type Props = {
        src: string;
        i: number;
        x: number;
        y: number;
        mouseDown(event: MouseEvent): void;
    };

    let { src, i, x, y, mouseDown }: Props = $props();

    // const COLUMNS = "abcdefgh";
    // const pieceName = piece.split("/")[1].split(".")[0][1].toLocaleUpperCase();
    // const moveObj = {
    //     move: (pieceName == "P" ? "" : pieceName)+COLUMNS[x / 100]+(y / 100) // Invalid because location is not correct (starting location instead of ending location)
    // };
</script>

<div id="piece-{i}" data-piece={src} role="button" tabindex="-1" onmousedown={mouseDown} class="w-[12.5%] h-[12.5%] absolute select-none z-10" style="transform: translate({x*100}%, {y*100}%)" draggable="false">
    <img class="w-full h-full pointer-events-none" src="pieces/{src}.png" alt="" draggable="false" />
</div>