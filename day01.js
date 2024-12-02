const fs = require('fs');

function processInputFile(inputText) {
    const firstArray = [];
    const secondArray = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;
        const parts = line.split('   ');
        if (parts.length === 2) {
            const num1 = parseFloat(parts[0].trim());
            const num2 = parseFloat(parts[1].trim());
            if (!isNaN(num1) && !isNaN(num2)) {
                firstArray.push(num1);
                secondArray.push(num2);
            }
        }
    }

    return { firstArray, secondArray };
}

const filePath = './day01.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const { firstArray, secondArray } = processInputFile(data);

    const sortedFirstArray = firstArray.sort((a, b) => a - b);
    const sortedSecondArray = secondArray.sort((a, b) => a - b);
    let total = 0;

    // part 1
    // for(let i = 0; i < sortedFirstArray.length; i++) {
    //   total += Math.abs(sortedFirstArray[i] - sortedSecondArray[i]);
    // }

    // part 2
    for(let i = 0; i < sortedFirstArray.length; i++) {
      let localTotal = 0;

      sortedSecondArray.forEach((x) => {
        if(x === sortedFirstArray[i]) {
          localTotal += 1;
        }
      });

      total += sortedFirstArray[i] * localTotal;
    }

    console.log(total);
});
