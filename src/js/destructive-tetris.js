jQuery.noConflict();
(($, PLUGIN_ID) => {
    'use strict';
    console.log('hello world');

    let board = [];
    let rowMax = 0, colMax = 0;

    let black = (element) => {
        $(element).css('background-color', 'black');
    }

    let initializeBoard = () => {
        let colList = [];
        for (let col = 0; col < colMax; col++) {
            colList.push(0);
        }

        for (let row = 0; row < rowMax; row++) {
            board.push(colList.concat()); // 値渡し
        }
    }

    let drawBoard = () => {
        for (let row = 0; row < rowMax; row++) {
            for (let col = 0; col < colMax; col++) {
                if (board[row][col] === 1) {
                    $(`table.recordlist-gaia:eq(0) tr:eq(${row}) td:eq(${col})`).addClass('dt-block');
                } else if (board[row][col] === 0) {
                    $(`table.recordlist-gaia:eq(0) tr:eq(${row}) td:eq(${col})`).removeClass('dt-block');
                }
            }
        }
    }

    let activeCell = (row, col) => {
        board[row][col] = 1;
    }

    let passiveCell = (row, col) => {
        board[row][col] = 0;
    }

    let fallBlock = () => {
        let under = [];  // 下の行にブロックがあるかどうかを保持する配列
        for (let i = 0; i < colMax; i++) {
            under.push(1);
        }

        for (let row = rowMax - 1; row >= 0; row--) {
            for (let col = 0; col < colMax; col++) {
                if (under[col] === 0) {
                    if (board[row][col] === 0) {
                        // 下に何もなくそのマスがブロックでもないとき
                        under[col] = 0;
                    } else {
                        // 下に何もなくそのマスがブロックであるとき
                        console.log(row, col, board[row + 1], row + 1);
                        board[row + 1][col] = board[row][col];
                        board[row][col] = 0;
                        under[col] = 0;
                    }
                } else {
                    if (board[row][col] === 0) {
                        // 下がブロックでそのマスがブロックでないとき
                        under[col] = 0;
                    } else {
                        // 下がブロックでそのマスがブロックのとき
                        under[col] = 1;
                    }
                }
            }
        }
    }

    let summon = () => {
        board[0][4] = 1;
        board[1][4] = 1;
        board[2][4] = 1;
        board[3][4] = 1;
    }

    kintone.events.on(['app.record.index.show'], (event) => {
        rowMax = $('table.recordlist-gaia td').parent().length;
        colMax = $('table.recordlist-gaia td').parent()[0].cells.length;
        console.log('rowMax:', rowMax, 'colMax:', colMax);


        initializeBoard();
        summon()

        drawBoard();
        setInterval(() => {
            fallBlock();
            drawBoard();
        }, 2000);

        $(document).on('keydown', (e) => {
            var keyCode = e.which;
            console.log('key press', keyCode);
        })

    });
})(jQuery, kintone.$PLUGIN_ID);
