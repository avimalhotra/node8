const netList = require('network-list');

// netList.scanEach({}, (err, obj) => {
//     console.log(obj); // device object
// });


netList.scan({}, (err, arr) => {
    console.table(arr); // array with all devices
});