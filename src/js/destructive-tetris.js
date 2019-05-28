jQuery.noConflict();
(($, PLUGIN_ID) => {
    'use strict';
    console.log('hello world');

    let black = (element) => {
        $(element).css('background-color', 'black');
    }

    kintone.events.on(['app.record.index.show'], (event) => {
        console.log('start');
        console.log(event);
        let hoge1 = kintone.app.getFieldElements('$id');

        let rowMax = $('table.recordlist-gaia td').parent().length;
        let colMax = $('table.recordlist-gaia td').parent()[0].cells.length;
        console.log('rowMax', rowMax);
        console.log('colMax', colMax);

        $('table.recordlist-gaia td').on('click', (event) => {
            let row = $('table.recordlist-gaia tr').index($(event.currentTarget).parent()[0]);
            let col = $(event.currentTarget).index();
            console.log('row', row);
            console.log('col', col);

            black(event.currentTarget);
        });
    });
})(jQuery, kintone.$PLUGIN_ID);
