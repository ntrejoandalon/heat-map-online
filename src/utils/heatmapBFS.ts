export default function runAlg(currGrid: number[][]): number[][] {
    return computeEuclideanHeatmap(currGrid);
}

function computeEuclideanHeatmap(grid: number[][]): number[][] {
    const rows = grid.length;
    if (rows === 0) return [];
    const cols = grid[0].length;

    // 8-directional movement vectors
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    const distMatrix: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const sourceMatrix: [number, number][][] = Array.from({ length: rows }, () => Array(cols).fill(null));    
    const queue: [number, number][] = [];
    let head = 0;

    function addSource(r: number, c: number) {
        distMatrix[r][c] = 0;
        sourceMatrix[r][c] = [r, c];
        queue.push([r, c]);
    }

    // Mark all complete squares
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] == 1) { //1 indicated complete
                addSource(r, c);
            }
        }
    }

    //BFS wave
    while (head < queue.length) {
        const curr = queue[head++];
        if (!curr) continue;
        const [r, c] = curr;
        
        const source = sourceMatrix[r][c];
        if (!source) continue;
        const [sr, sc] = source;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                // Calculate precise Euclidean distance from neighbor to the original obstacle anchor
                const distR = nr - sr;
                const distC = nc - sc;
                const newTrueDist = Math.sqrt(distR * distR + distC * distC);

                // If this is a shorter path to an obstacle than previously found, update and expand
                if (newTrueDist < distMatrix[nr][nc]) {
                    distMatrix[nr][nc] = newTrueDist;
                    sourceMatrix[nr][nc] = [sr, sc];
                    queue.push([nr, nc]);
                }
            }
        }
    }

    return distMatrix;
}
