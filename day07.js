const fs = require('fs');

function processInputFile(inputText) {
    const totals = [];
    const inputs = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        const arr = line.split(': ');
        totals.push(parseInt(arr[0]));
        let x = [];
        arr[1].split(' ').forEach(val => x.push(parseInt(val)));
        inputs.push(x);
    }

    return { totals, inputs };
}

const filePath = './day07.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    let total = 0;

    const { totals, inputs } = processInputFile(data);

    // part 1
    // const isValid = (idx) => {
    //     for (let j = 0; j < Math.pow(2, inputs[idx].length - 1); j++) {
    //         const binaryStr = j.toString(2).padStart(inputs[idx].length - 1, '0');
    //         const binaryArr = binaryStr.split('');

    //         let localTotal = inputs[idx][0];
    //         for (let k = 0; k < binaryArr.length; k++) {
    //             if (binaryArr[k] === '0') {
    //                 localTotal = localTotal + inputs[idx][k + 1];
    //             } else {
    //                 localTotal = localTotal * inputs[idx][k + 1];
    //             }
    //         }
    //         if (localTotal === totals[idx]) {
    //             return true;
    //         }
    //     }
    //     return false;
    // };

    // part 2
    const isValid = (idx) => {
        for (let j = 0; j < Math.pow(3, inputs[idx].length - 1); j++) {
            const ternaryStr = j.toString(3).padStart(inputs[idx].length - 1, '0');
            const ternaryArr = ternaryStr.split('');

            let localTotal = inputs[idx][0];
            for (let k = 0; k < ternaryArr.length; k++) {
                if (ternaryArr[k] === '0') {
                    localTotal = localTotal + inputs[idx][k + 1];
                } else if (ternaryArr[k] === '1') {
                    localTotal = localTotal * inputs[idx][k + 1];
                } else {
                    localTotal = parseInt(`${localTotal}${inputs[idx][k+1]}`);
                }
            }
            if (localTotal === totals[idx]) {
                return true;
            }
        }
        return false;
    };

    for (let i = 0; i < totals.length; i++) {
        if (isValid(i)) {
            total += totals[i];
        }
    }

    console.log(total);
});

