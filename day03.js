const fs = require('fs');

function processInputFile(inputText) {
    const arr = [];
    const lines = inputText.split('\n');
    let add = true;

    for (const line of lines) {
        if (line.trim() === '') continue;
        // part 1
        // const regexp = /mul\(\d+,\d+\)/g;
        // line.matchAll(regexp).forEach((val) => {
        //     arr.push(val[0]);
        // });
        // part 2
        const regexp = /(?:mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
        for (const val of line.matchAll(regexp)) {
            const str = val[0];
            if (str === 'do()') {
                add = true;
                continue;
            }
            if (str === "don't()") {
                add = false;
                continue;
            }
            if (add) {
                arr.push(str);
            }
        }
    }

    return arr;
}

const filePath = './day03.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const arr = processInputFile(data);
    let total = 0;

    arr.forEach((str) => {
        const numbers = str.substring(4, str.length - 1);
        const first = parseInt(numbers.split(',')[0]);
        const second = parseInt(numbers.split(',')[1]);
        total += first * second;
    });

    console.log(total);
});
