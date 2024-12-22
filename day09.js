const fs = require('fs');

function processInputFile(inputText) {
    const inputArray = [];
    const lines = inputText.split('\n');
    let isFile = true;
    let id = 0;

    for (const line of lines) {
        line.split('').forEach(element => {
            if (isFile) {
                inputArray.push(...Array(parseInt(element)).fill(id));
                id++;
            } else {
                inputArray.push(...Array(parseInt(element)).fill(null));
            }
            isFile = !isFile;
        });
    }

    return inputArray;
}

const filePath = './day09.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const blocks = processInputFile(data);
    let total = 0;
    let movedBlocks = JSON.parse(JSON.stringify(blocks));

    // part 1
    // for (let i = blocks.length - 1; i >= 0; i--) {
    //     if (movedBlocks[i] === null) {
    //         continue;
    //     }
    //     let swapIdx = movedBlocks.findIndex((v) => v === null);
    //     movedBlocks[swapIdx] = movedBlocks[i];
    //     movedBlocks[i] = null;
    // }
    // movedBlocks.splice(0, 1);

    // part 2
    const findSpace = (maxIdx, space) => {
        for (let i = 0; i < maxIdx; i++) {
            if (movedBlocks[i] !== null) continue;
            let curSize = 1;
            do {
                if (curSize >= space) {
                    return i;
                }
                if (movedBlocks[i + curSize] !== null) {
                    break;
                }
                curSize++;
            } while (i + curSize <= maxIdx)
        }
        return false;
    };

    const printLine = () => {
        let line = '';
        for (const x of movedBlocks) {
            if (x === null) {
                line += '.';
            } else {
                line += x;
            }
            line += '|';
        }
        console.log(line);
    };

    for (let i = blocks.length - 1; i >= 0; i--) {
        // printLine();
        if (movedBlocks[i] === null) {
            continue;
        }
        const current = movedBlocks[i];
        let length = 1;
        while (movedBlocks[i - 1] === current) {
            length++;
            i--;
        }
        const firstSpace = findSpace(i, length);
        if (!firstSpace) continue;

        for (let j = 0; j < length; j++) {
            movedBlocks[firstSpace + j] = current;
            movedBlocks[i + j] = null;
        }
    }

    // checksum
    for (let i = 0; i < movedBlocks.length; i++) {
        total += i *  movedBlocks[i];
    }

    console.log(total);
});
