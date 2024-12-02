const fs = require('fs');

function processInputFile(inputText) {
    const arr = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;
        const parts = line.split(' ');
        const thisArr = [];
        parts.forEach(x => {
          thisArr.push(parseFloat(x.trim()));
        })
        arr.push(thisArr);
    }

    return arr;
}

const filePath = './day02.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const arr = processInputFile(data);
    let total = 0;

    const increasing = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] >= arr[i+1]) {
          return false;
        }
      }
      return true;
    };
    const decreasing = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= arr[i+1]) {
          return false;
        }
      }
      return true;
    };
    const differ = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        const x = Math.abs(arr[i] - arr[i+1]);
        if (x < 1 || x > 3) {
          return false;
        }
      }
      return true;
    };

    // part 1
    // arr.forEach(a => {
    //   if ((increasing(a) || decreasing(a)) && differ(a)) {
    //     total += 1;
    //   }
    // });

    // part 2
    arr.forEach(a => {
      if ((increasing(a) || decreasing(a)) && differ(a)) {
        total += 1;
      } else {
        for (let i = 0; i < a.length; i++) {
          let amod = a.toSpliced(i, 1);
          if ((increasing(amod) || decreasing(amod)) && differ(amod)) {
            total += 1;
            return;
          }
        }
      }
    });

    console.log(total);
});