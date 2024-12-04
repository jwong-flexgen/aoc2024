const fs = require('fs');

function processInputFile(inputText) {
    const arr = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;
        const myArr = [];
        arr.push(line.split(''));
        line.split('');
    }

    return arr;
}

const filePath = './day04.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const grid = processInputFile(data);
    let total = 0;

    // part 1
    // for (let i = 0; i < grid.length; i++) {
    //     for (let j = 0; j < grid[i].length; j++) {
    //         // north
    //         if (j >= 3) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i][j - q];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //         // northeast
    //         if (j >= 3 && i <= grid.length - 4) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i + q][j - q];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //         // east
    //         if (i <= grid.length - 4) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i + q][j];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //         // southeast
    //         if (j <= grid[i].length - 4 && i <= grid.length - 4) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i + q][j + q];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //         // south
    //         if (j <= grid[i].length - 4) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i][j + q];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //         // southwest
    //         if (j <= grid[i].length - 4 && i >= 3) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i - q][j + q];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //         // west
    //         if (i >= 3) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i - q][j];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //         // northwest
    //         if (j >= 3 && i >= 3) {
    //             let testStr = '';
    //             for (let q = 0; q <= 3; q++) {
    //                 testStr += grid[i - q][j - q];
    //             }
    //             if (testStr === 'XMAS') {
    //                 total += 1;
    //             }
    //         }
    //     }
    // }

    // part 2
    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            if (grid[i][j] === 'A') {
                const upleft = grid[i-1][j-1];
                const upright = grid[i+1][j-1];
                const downleft = grid[i-1][j+1];
                const downright = grid[i+1][j+1];
                if ((upleft === 'M' && downright === 'S') ||
                    (upleft === 'S' && downright === 'M'))
                {
                    if ((downleft === 'M' && upright === 'S') ||
                        (downleft === 'S' && upright === 'M'))
                    {
                        total += 1;
                    }
                }
            }
        }
    }

    console.log(total);
});

