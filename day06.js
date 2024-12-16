const fs = require('fs');

function processInputFile(inputText) {
    const rows = [];
    const lines = inputText.split('\n');
    let x = 0;
    let y = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') continue;
        rows.push(line.split(''));
        
        const idx = line.split('').indexOf('^');
        if (idx !== -1) {
            x = idx;
            y = i;
        }
    }

    return [rows, x, y];
}

const filePath = './day06.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // part 1
    // let [rows, x, y] = processInputFile(data);
    // const visited = [];
    // let direction = 0;
    // let exited = false;

    // const add = () => {
    //     if (!visited.some((previous) => previous[0] === x && previous[1] === y)) {
    //         visited.push([x, y]);
    //     }
    // };

    // const up = () => {
    //     if (rows[y-1][x] === '#') {
    //         direction = 1;
    //         return;
    //     }
    //     y -= 1;
    //     if (y < 0) {
    //         exited = true;
    //         return;
    //     }
    //     add();
    // };
    // const right = () => {
    //     if (rows[y][x+1] === '#') {
    //         direction = 2;
    //         return;
    //     }
    //     x += 1;
    //     if (x >= rows.length - 1) {
    //         exited = true;
    //         return;
    //     }
    //     add();
    // };
    // const down = () => {
    //     if (rows[y+1][x] === '#') {
    //         direction = 3
    //         return;
    //     }
    //     y += 1;
    //     if (y >= rows[0].length - 1) {
    //         exited = true;
    //         return;
    //     }
    //     add();
    // };
    // const left = () => {
    //     if (rows[y][x-1] === '#') {
    //         direction = 0;
    //         return;
    //     }
    //     x -= 1;
    //     if (x < 0) {
    //         exited = true;
    //         return;
    //     }
    //     add();
    // };

    // add();
    // while (!exited) {
    //     switch (direction) {
    //         case 0:
    //             up();
    //             break;
    //         case 1:
    //             right();
    //             break;
    //         case 2:
    //             down();
    //             break;
    //         case 3:
    //             left();
    //             break;
    //     }
    // }

    // let total = visited.length;

    // console.log(total);

    // part 2
    let [rows, x, y] = processInputFile(data);
    let original = [x, y];
    let validTraps = [];
    let direction = 0;
    let exited = false;

    const up = () => {
        if (y === 0) {
            exited = true;
            return;
        }
        if (rows[y-1][x] === '#') {
            direction = 1;
            return;
        }
        y -= 1;
    };
    const right = () => {
        if (x === rows[0].length - 1) {
            exited = true;
            return;
        }
        if (rows[y][x+1] === '#') {
            direction = 2;
            return;
        }
        x += 1;
    };
    const down = () => {
        if (y === rows.length - 1) {
            exited = true;
            return;
        }
        if (rows[y+1][x] === '#') {
            direction = 3
            return;
        }
        y += 1;
    };
    const left = () => {
        if (x === 0) {
            exited = true;
            return;
        }
        if (rows[y][x-1] === '#') {
            direction = 0;
            return;
        }
        x -= 1;
    };

    let originalPath = [];
    while (!exited) {
        if (!originalPath.some((o) => o[0] === x && o[1] === y)) {
            originalPath.push([x,y]);
        }
        switch (direction) {
            case 0:
                up();
                break;
            case 1:
                right();
                break;
            case 2:
                down();
                break;
            case 3:
                left();
                break;
        }
    }
    x = original[0];
    y = original[1];
    direction = 0;

    for (let p of originalPath.slice(1)) {
        let i = p[0];
        let j = p[1];

        let visited = [];
        rows[j][i] = '#';

        while (!exited) {
            if (visited.length > originalPath.length * 3) {
                validTraps.push([i, j]);
                exited = true;
            } else {
                visited.push([x, y, direction]);
            }
            switch (direction) {
                case 0:
                    up();
                    break;
                case 1:
                    right();
                    break;
                case 2:
                    down();
                    break;
                case 3:
                    left();
                    break;
            }
        }

        x = original[0];
        y = original[1];
        direction = 0;
        rows[j][i] = '.';
        exited = false;
    }

    console.log(validTraps.length);
});

