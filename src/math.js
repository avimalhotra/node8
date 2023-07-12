//global.getSin=function(rad){ return Math.sin(rad * Math.PI/180) }
//global.getCos=function(rad){ return Math.cos(rad * Math.PI/180) }
//global.getTan=function(rad){ return Math.tan(rad * Math.PI/180) }

const pi=3.14;
const r=5;
const area=pi * r * r;


/* CJS  */
//module.exports=area;                       // export value
exports.p=pi;                                // export property
exports.radius=r;


/* EJS */
//export { area as a };