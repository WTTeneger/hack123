var slov = {
    'open_m': {
        'find': false,
        'filter': false
    }
}


document.addEventListener('click', function() {
    // console.log('sslov', '');
    // console.log(this, arguments);
    cid = arguments[0]['path'][0];

    if (arguments[0]['path'][1].id == 'blFilter' || arguments[0]['path'][0].id == 'blFilter') {
        let sig;
        if (arguments[0]['path'][1].id) {
            sig = arguments[0]['path'][1]
        } else {
            sig = arguments[0]['path'][0]
        }

        console.log(sig);
        console.log(sig.classList.value);
        console.log((sig.classList.value).indexOf('block_filter_active'));
        if ((sig.classList.value).indexOf('block_filter_active') >= 0) {
            sig.classList.remove('block_filter_active')
        } else {
            console.log('ass');
            sig.classList.add('block_filter_active')
        }
        // if (sig.classList)
    }


});