const fs = require('fs');

function processInputFile(inputText) {
    const rules = [];
    const pages = [];
    const lines = inputText.split('\n');
    let isPages = false;

    for (const line of lines) {
        if (line.trim() === '') {
            isPages = true;
            continue;
        }
        if (!isPages) {
            const unparsed = line.split('|');
            rules.push([parseInt(unparsed[0]), parseInt(unparsed[1])]);
        } else {
            const unparsed = line.split(',');
            const currentPages = [];
            for (let x = 0; x < unparsed.length; x++) {
                currentPages.push(parseInt(unparsed[x]));
            }
            pages.push(currentPages);
        }
    }

    return [rules, pages];
}

const filePath = './day05.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const [rules, pages] = processInputFile(data);
    // part 1
    // const validPages = [];

    // for (let p = 0; p < pages.length; p++) {
    //     const current = pages[p];
    //     let valid = true;

    //     // process rules
    //     for (const rule of rules) {
    //         const first = current.indexOf(rule[0]);
    //         const second = current.indexOf(rule[1]);
    //         if (first !== -1 && second !== -1) {
    //             if (first > second) {
    //                 valid = false;
    //                 break;
    //             }
    //         }
    //     }

    //     if (valid) validPages.push(current);
    // }


    // let total = 0;
    // validPages.forEach((x) => {
    //     total += x[Math.floor(x.length / 2)];
    // });
    // console.log(total);

    // part 2
    const invalidPages = [];

    for (let p = 0; p < pages.length; p++) {
        const current = pages[p];
        let valid = true;

        // process rules
        for (const rule of rules) {
            const first = current.indexOf(rule[0]);
            const second = current.indexOf(rule[1]);
            if (first !== -1 && second !== -1) {
                if (first > second) {
                    valid = false;
                    break;
                }
            }
        }

        if (!valid) invalidPages.push(current);
    }

    for (const page of invalidPages) {
        page.sort((a, b) => {
            let value = -1;
            for (const rule of rules) {
                if (a === rule[1] && b === rule[0]) {
                    return 1;
                }
            }
            return value;
        });
    }

    let total = 0;
    invalidPages.forEach((x) => {
        total += x[Math.floor(x.length / 2)];
    });
    console.log(total);
});


