<script lang="ts">
    import { remap } from "$lib/utils/remap";
    import Piece from "$lib/components/Piece.svelte";

    const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq – 0 1";
    // const FEN = "rnbqkbnr/pppppppp/3q4/8/8/8/PPPqPPPP/RNBQKBNR w KQkq – 0 1";

    let draggedElement: HTMLDivElement | null;
    let board: HTMLDivElement;
    let hightlight: HTMLDivElement;

    function FenInterpretor() {
        const board = FEN.split(' ')[0];
        const rows = board.split('/');
        const pieces = [];

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
                const char = rows[i][j];
                const charInt = parseInt(char);

                if (isNaN(charInt))
                    pieces.push({
                        src: ((char === char.toUpperCase()) ? "w" : "b") + char.toLowerCase(),
                        x: j,
                        y: i
                    });
                else
                    j += charInt;
            }
        };
        return pieces;
    }

    function mouseDown(event:MouseEvent, i: number) {
        draggedElement = document.getElementById(`piece-${i}`) as HTMLDivElement;
        mouseMove(event);
        draggedElement.classList.add('dragged');
        hightlight.classList.remove('invisible'); 
    }

    function normalize(coord: string | number) {
        if (typeof coord === 'string')
            coord = parseInt(coord);

        coord /= 100;

        if (coord< 0)
            coord = 0;
        if (coord > 7)
            coord = 7;

        return Math.floor(coord + 0.5);
    }

    function mouseMove(event: MouseEvent) {
        if (!draggedElement)
            return;

        const bounds = board.getBoundingClientRect();
        const elementBounds = draggedElement.getBoundingClientRect();
        const newX = remap(event.clientX - bounds.left - (elementBounds.width / 2), 0, bounds.width - elementBounds.width, 0, 700);
        const newY = remap(event.clientY - bounds.top - (elementBounds.height / 2), 0, bounds.height - elementBounds.height, 0, 700);

        hightlight.style.transform = `translate(${normalize(newX) * 100}%, ${normalize(newY) * 100}%)`;
        draggedElement.style.transform = `translate(${newX}%, ${newY}%)`;
    }

    function mouseUp() {
        if (!draggedElement)
            return;
        
        const transform = draggedElement.style.transform;
        const [x, y] = transform.replace('translate(', '').replace(')', '').replace('%', "").split(', ').map(normalize);

        draggedElement.style.transform = `translate(${x*100}%, ${y*100}%)`;
        draggedElement.classList.add('remove');
        hightlight.classList.add('invisible');
        draggedElement = null;
    }
</script>

<div class="w-full h-screen flex justify-center items-center bg-black/90">
    <div bind:this={board} role="button" tabindex="-1" class="h-full aspect-square bg-board bg-cover bg-center bg-no-repeat relative overflow-hidden" onmousemove={mouseMove} onmouseup={mouseUp}>
        {#each FenInterpretor() as piece, i}
            <Piece {...piece} {i} mouseDown={(e) => mouseDown(e, i)}/>
        {/each}

        <div bind:this={hightlight} class="w-[12.5%] h-[12.5%] pointer-events-none border-8 border-slate-400 invisible z-0"></div>
    </div>
</div>

<style lang="postcss">
    :global(.dragged) {
        filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));
    }
</style>