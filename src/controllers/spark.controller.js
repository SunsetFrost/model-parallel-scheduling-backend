const moment = require('moment');

/* 
 * @param { startTime,  时间戳
            currentTime, 
            totalNum, 
            speed }
 * @return { completeNum }
 */
exports.mockSpark = (startTime, currentTime, totalNum, cpu) => {
    const diff = Math.abs(moment(startTime).diff(moment(currentTime), 'seconds'));
    const speed = 60 / cpu;  
    const completeNum = Math.floor(diff / speed);
    if(completeNum <= totalNum) {
        return completeNum;
    } else {
        return totalNum;
    }
}
