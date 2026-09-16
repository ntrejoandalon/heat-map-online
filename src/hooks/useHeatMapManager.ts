import { useMemo } from "react";
import { useGridContext } from "../features/grid/GridContext"
import computeEuclideanHeatmap from "../utils/heatmapBFS"

function normalizeHeatMap(heatmapState: number[][]) {
    if (!heatmapState || heatmapState.length === 0) return [];

    // 1. Find min, max, and range
    let min = Infinity;
    let max = -Infinity;

    for (let r = 0; r < heatmapState.length; r++) {
        const row = heatmapState[r];
        for (let c = 0; c < row.length; c++) {
            const val = row[c];
            if (val < min) min = val;
            else if (val > max) max = val;
        }
    }

    const range = max - min;
    return heatmapState.map(row =>
        row.map((val) => ((val - min) / range) * 100)
    );
}

function findCenter(heatmapState: number[][]): [number, number] {
    const rows = heatmapState.length;
    if (rows === 0) return [0,0];
    const cols = heatmapState[0].length;

    // Calculate the geometric center of the grid matrix
    const centerR = (rows - 1) / 2;
    const centerC = (cols - 1) / 2;

    let maxVal = -Infinity;
    let minCenterDist = Infinity;
    let coords: [number, number] = [0,0];

    for (let r = 0; r < rows; r++) {
        const row = heatmapState[r];
        for (let c = 0; c < row.length; c++) {
            const val = row[c];

            // 1. Found a strictly higher maximum value
            if (val > maxVal) {
                maxVal = val;
                coords = [r, c];

                // Track distance to the matrix center
                const dr = r - centerR;
                const dc = c - centerC;
                minCenterDist = dr * dr + dc * dc; // Using squared distance to avoid slow Math.sqrt calls
            }
            // 2. Found a tie - check if this cell is physically closer to the matrix center
            else if (val === maxVal) {
                const dr = r - centerR;
                const dc = c - centerC;
                const centerDist = dr * dr + dc * dc;

                if (centerDist < minCenterDist) {
                    minCenterDist = centerDist;
                    coords = [r, c];
                }
            }
        }
    }

    return coords;
}

function calculateMetrics(heatmapState: number[][]) {
    if (!heatmapState || heatmapState.length === 0 || heatmapState[0].length === 0) {
        return { min: 0, max: 0, avg: 0, stdDev: 0 };
    }

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let count = 0;
    const allValues: number[] = [];

    for (let r = 0; r < heatmapState.length; r++) {
        const row = heatmapState[r];
        for (let c = 0; c < row.length; c++) {
            const val = row[c];
            
            
            if (val < min) min = val;
            if (val > max) max = val;
            
            sum += val;
            count++;
            allValues.push(val);
        }
    }

    // Handle edge case where grid is empty or entirely skipped zeros
    if (count === 0) return { min: 0, max: 0, avg: 0, stdDev: 0 };

    const avg = sum / count;

    // Calculate Standard Deviation
    const squaredDifferencesSum = allValues.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0);
    const stdDev = Math.sqrt(squaredDifferencesSum / count); 

    return { min, max, avg, stdDev };
}


export function useHeatMapManager() {
    const { gridState } = useGridContext();

    const heatmapState = useMemo(() => {
        if (!gridState) return [];
        return computeEuclideanHeatmap(gridState);
    }, [gridState]);

    // 2. Derive the normalized heatmap locally from the raw heatmap
    const normalizedHeatMap = useMemo(() => {
        return normalizeHeatMap(heatmapState);
    }, [heatmapState]);

    const center = useMemo(() => {
        return findCenter(heatmapState);
    }, [heatmapState])


    const metrics = useMemo(() => {
        return calculateMetrics(heatmapState);
    }, [heatmapState]);


    return {
        heatmapState,
        normalizedHeatMap,
        center,
        metrics
    };
}

