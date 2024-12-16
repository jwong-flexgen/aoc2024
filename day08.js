const fs = require('fs');

function processInputFile(inputText) {
    const lines = inputText.split('\n');
    const grid = [];
    const locations = {};

    for (let x = 0; x < lines[0].length - 1; x++) {
        let column = [];
        for (let y = 0; y < lines.length; y++) {
            const char = lines[y].split('')[x];
            column.push(char);
            if (char !== '.') {
                if (locations[char] === undefined) {
                    locations[char] = [[x,y]];
                } else {
                    locations[char].push([x,y]);
                }
            }
        }
        grid.push(column)
    }

    return { grid, locations };
}

const filePath = './day08.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const { grid, locations } = processInputFile(data);
    const maxX = grid.length - 1;
    const maxY = grid[0].length - 1;
    let unique = [];

    const addIfUnique = (x, y) => {
        // console.log(x, y)
        if (!unique.some((val) => val[0] === x && val[1] === y)) {
            unique.push([x, y]);
        }
    }

    // part 1
    // for (const antenna of Object.values(locations)) {
    //     for (let i = 0; i < antenna.length; i++) {
    //         for (let j = 0; j < antenna.length; j++) {
    //             if (i === j) continue;

    //             const first = antenna[i];
    //             const second = antenna[j];
    //             // same x
    //             if (first[0] === second[0]) {
    //                 let dist = first[1] - second[1];
    //                 if (dist < 0) {
    //                     dist = Math.abs(dist);
    //                     if (first[1] - dist >= 0) addIfUnique(first[0], first[1] - dist);
    //                     if (second[1] + dist <= maxY) addIfUnique(second[0], second[1] + dist);
    //                 } else {
    //                     if (second[1] - dist >= 0) addIfUnique(second[0], second[1] - dist);
    //                     if (first[1] + dist <= maxY) addIfUnique(first[0], first[1] + dist);
    //                 }
    //                 continue;
    //             }

    //             // same y
    //             if (first[1] === second[1]) {
    //                 let dist = first[0] - second[0];
    //                 if (dist < 0) {
    //                     dist = Math.abs(dist);
    //                     if (first[0] - dist >= 0) addIfUnique(first[0] - dist, first[1]);
    //                     if (second[0] + dist <= maxX) addIfUnique(second[0] + dist, second[1]);
    //                 } else {
    //                     if (second[0] - dist >= 0) addIfUnique(second[0] - dist, second[1]);
    //                     if (first[0] + dist <= maxX) addIfUnique(first[0] + dist, first[1]);
    //                 }
    //                 continue;
    //             }

    //             const slope = (second[1] - first[1]) / (second[0] - first[0]);
    //             // \
    //             if (slope > 0) {
    //                 let distX = first[0] - second[0];
    //                 let distY = Math.abs(first[1] - second[1]);
    //                 if (distX < 0) {
    //                     distX = Math.abs(distX);
    //                     if (first[0] - distX >= 0 && first[1] - distY >= 0) addIfUnique(first[0] - distX, first[1] - distY);
    //                     if (second[0] + distX <= maxX && second[1] + distY <= maxY) addIfUnique(second[0] + distX, second[1] + distY);
    //                 } else {
    //                     if (second[0] - distX >= 0 && second[1] - distY >= 0) addIfUnique(second[0] - distX, second[1] - distY);
    //                     if (first[0] + distX <= maxX && first[1] + distY <= maxY) addIfUnique(first[0] + distX, first[1] + distY);
    //                 }
    //                 continue;
    //             }

    //             // /
    //             if (slope < 0) {
    //                 let distX = first[0] - second[0];
    //                 let distY = Math.abs(first[1] - second[1]);
    //                 if (distX < 0) {
    //                     distX = Math.abs(distX);
    //                     if (first[0] - distX >= 0 && first[1] + distY <= maxY) addIfUnique(first[0] - distX, first[1] + distY);
    //                     if (second[0] + distX <= maxX && second[1] - distY >= 0) addIfUnique(second[0] + distX, second[1] - distY);
    //                 } else {
    //                     if (second[0] - distX >= 0 && second[1] + distY <= maxY) addIfUnique(second[0] - distX, second[1] + distY);
    //                     if (first[0] + distX <= maxX && first[1] - distY >= 0) addIfUnique(first[0] + distX, first[1] - distY);
    //                 }
    //                 continue;
    //             }
    //         }
    //     }
    // }

    const printGraph = () => {
        unique.forEach((val) => {
            grid[val[0]][val[1]] === '.' ? grid[val[0]][val[1]] = '#' : true;
        });
        const output = [];
        for (let j = 0; j < grid[0].length; j++) {
            let zzz = [];
            for (let i = 0; i < grid.length; i++) {
                zzz.push(grid[i][j]);
            }
            output.push(zzz);
        }
        output.forEach((row) => {
            console.log(row.join(''));
        })
    };

    // part 2
    for (const antenna of Object.values(locations)) {
        for (let i = 0; i < antenna.length; i++) {
            for (let j = 0; j < antenna.length; j++) {
                if (i === j) continue;

                const first = antenna[i];
                const second = antenna[j];

                addIfUnique(first[0], first[1])
                addIfUnique(second[0], second[1])

                // same x
                if (first[0] === second[0]) {
                    let dist = first[1] - second[1];
                    for (let z = 0; z < 30; z++) {
                        const myDist = Math.abs(dist) + (Math.abs(dist) * z);
                        if (dist < 0) {
                            if (first[1] - myDist >= 0) addIfUnique(first[0], first[1] - myDist);
                            if (second[1] + myDist <= maxY) addIfUnique(second[0], second[1] + myDist);
                        } else {
                            if (second[1] - myDist >= 0) addIfUnique(second[0], second[1] - myDist);
                            if (first[1] + myDist <= maxY) addIfUnique(first[0], first[1] + myDist);
                        }
                    }
                }

                // same y
                if (first[1] === second[1]) {
                    let dist = first[0] - second[0];
                    for (let z = 0; z < 30; z++) {
                        const myDist = Math.abs(dist) + (Math.abs(dist) * z);
                        if (dist < 0) {
                            if (first[0] - myDist >= 0) addIfUnique(first[0] - myDist, first[1]);
                            if (second[0] + myDist <= maxX) addIfUnique(second[0] + myDist, second[1]);
                        } else {
                            if (second[0] - myDist >= 0) addIfUnique(second[0] - myDist, second[1]);
                            if (first[0] + myDist <= maxX) addIfUnique(first[0] + myDist, first[1]);
                        }
                    }
                }

                const slope = (second[1] - first[1]) / (second[0] - first[0]);
                // \
                if (slope > 0) {
                    let distX = first[0] - second[0];
                    let distY = Math.abs(first[1] - second[1]);
                    for (let z = 0; z < 30; z++) {
                        const myDistX = Math.abs(distX) + (Math.abs(distX) * z);
                        const myDistY = Math.abs(distY) + (Math.abs(distY) * z);
                        if (distX < 0) {
                            if (first[0] - myDistX >= 0 && first[1] - myDistY >= 0) addIfUnique(first[0] - myDistX, first[1] - myDistY);
                            if (second[0] + myDistX <= maxX && second[1] + myDistY <= maxY) addIfUnique(second[0] + myDistX, second[1] + myDistY);
                        } else {
                            if (second[0] - myDistX >= 0 && second[1] - myDistY >= 0) addIfUnique(second[0] - myDistX, second[1] - myDistY);
                            if (first[0] + myDistX <= maxX && first[1] + myDistY <= maxY) addIfUnique(first[0] + myDistX, first[1] + myDistY);
                        }
                    }
                }

                // /
                if (slope < 0) {
                    let distX = first[0] - second[0];
                    let distY = Math.abs(first[1] - second[1]);
                    for (let z = 0; z < 30; z++) {
                        const myDistX = Math.abs(distX) + (Math.abs(distX) * z);
                        const myDistY = Math.abs(distY) + (Math.abs(distY) * z);
                        if (distX < 0) {
                            if (first[0] - myDistX >= 0 && first[1] + myDistY <= maxY) addIfUnique(first[0] - myDistX, first[1] + myDistY);
                            if (second[0] + myDistX <= maxX && second[1] - myDistY >= 0) addIfUnique(second[0] + myDistX, second[1] - myDistY);
                        } else {
                            if (second[0] - myDistX >= 0 && second[1] + myDistY <= maxY) addIfUnique(second[0] - myDistX, second[1] + myDistY);
                            if (first[0] + myDistX <= maxX && first[1] - myDistY >= 0) addIfUnique(first[0] + myDistX, first[1] - myDistY);
                        }
                    }
                }
            }
        }
    }

    printGraph();
    console.log(locations)
    console.log(unique.length);
});
