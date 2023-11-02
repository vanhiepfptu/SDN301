const Order = require("../models/OrderModel")
const LIMIT_ACCOUNT = 10;
const totalOrder = (time, number) => {
    return new Promise(async (resolve, reject) => {
        try {
            var query = {};
            var currentDay = new Date();  // Tạo một đối tượng Date hiện tại
            var year = currentDay.getFullYear();  // Lấy năm hiện tại
            var month = currentDay.getMonth() + 1;  // Lấy tháng hiện tại (lưu ý: tháng bắt đầu từ 0 nên phải cộng thêm 1)
            var day = currentDay.getDate();  // Lấy ngày hiện tại
            var currentTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            if (time === 'day') {
                if (!number) {
                    var nextTime = new Date()
                    nextTime.setDate(nextTime.getDate() + 1);
                    nday = nextTime.getDate()
                    nmonth = nextTime.getMonth() + 1
                    nyear = nextTime.getFullYear()
                    nextTime = `${nyear}-${nmonth.toString().padStart(2, '0')}-${nday.toString().padStart(2, '0')}`;
                } else {
                    var nextTime = new Date(`${year}-${month}-${number}`)
                    nextTime.setDate(nextTime.getDate() + 1);
                    nday = nextTime.getDate()
                    nmonth = nextTime.getMonth() + 1
                    nyear = nextTime.getFullYear()
                    currentTime = `${year}-${month.toString().padStart(2, '0')}-${number.toString().padStart(2, '0')}`;
                    nextTime = `${nyear}-${nmonth.toString().padStart(2, '0')}-${nday.toString().padStart(2, '0')}`;
                }
                query = {
                    createdAt: {
                        $gte: (currentTime),
                        $lt: nextTime
                        // $gte: ('2023-10-10'),
                        // $lt: ('2023-10-11')
                    },
                    isDeliverySuccess: true
                }
            }
            if (time === 'month') {
                if (!number) {
                    var nextTime = new Date()
                    nextTime = new Date(nextTime.getFullYear(), nextTime.getMonth() + 1, 0);
                    currentTime = new Date(year, month - 1, 1);
                    nextTime = JSON.stringify(nextTime).split("T")[0]
                    currentTime = JSON.stringify(currentTime).split("T")[0]
                } else {
                    var nextTime = new Date()
                    nextTime = new Date(nextTime.getFullYear(), number, 0);
                    currentTime = new Date(year, number - 1, 1);
                    nextTime = JSON.stringify(nextTime).split("T")[0].split("\"")[1];
                    currentTime = JSON.stringify(currentTime).split("T")[0].split("\"")[1];

                }
                query = {
                    createdAt: {
                        $gte: (currentTime),
                        $lt: (nextTime)
                        // $gte: ('2023-10-10'),
                        // $lt: ('2023-10-11')
                    },
                    isDeliverySuccess: true
                }
            }
            if (time === 'year') {
                if (!number) {
                    var firstDayOfYear = new Date(year, 0, 1);  // Tạo ngày đầu năm
                    var endDayOfYear = new Date(year, 11, 31);
                    endDayOfYear = JSON.stringify(endDayOfYear).split("T")[0]
                    firstDayOfYear = JSON.stringify(firstDayOfYear).split("T")[0]
                } else {
                    var firstDayOfYear = new Date(parseInt(number), 0, 1);
                    console.log(firstDayOfYear) // Tạo ngày đầu năm
                    var endDayOfYear = new Date(parseInt(number), 11, 31);
                    endDayOfYear = (JSON.stringify(endDayOfYear).split("T")[0]).split("\"")[1];
                    firstDayOfYear = JSON.stringify(firstDayOfYear).split("T")[0].split("\"")[1];
                    console.log(endDayOfYear)
                }
                query = {
                    createdAt: {
                        $gte: (firstDayOfYear),
                        $lt: (endDayOfYear)
                    },
                    isDeliverySuccess: true
                }
            }
            const totalOrder = await Order.count(query);
            const allOrder = await Order.find(query);
            var totalMoney = 0;
            if (allOrder) {
                for (const item of allOrder) {
                    totalMoney += item.totalPrice;
                }
            }
            resolve({
                status: 'OK',
                totalOrder: totalOrder,
                // allOrder,
                totalMoney,
                startTime: time === 'year' ? firstDayOfYear : currentTime,
                endTine: time === 'year' ? endDayOfYear : nextTime
            })

        } catch (err) {
            reject(err)
        }
    })
}

const numberOrder = () => {
     return new Promise(async (resolve, reject) => {
        try{
            var query = {}
            var listNumberOrder = []
            var listIncome = []
            var listDay = []
            var today = new Date()
            var year = today.getFullYear();  // Lấy năm hiện tại
            var month = today.getMonth() + 1;  // Lấy tháng hiện tại (lưu ý: tháng bắt đầu từ 0 nên phải cộng thêm 1)
            var day = today.getDate();
            var currentTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


            for(var number=1; number<= day; number++){
                var nextTime = new Date(`${year}-${month}-${number}`)
                nextTime.setDate(nextTime.getDate() + 1);
                nday = nextTime.getDate()
                nmonth = nextTime.getMonth() + 1
                nyear = nextTime.getFullYear()
                currentTime = `${year}-${month.toString().padStart(2, '0')}-${number.toString().padStart(2, '0')}`;
                nextTime = `${nyear}-${nmonth.toString().padStart(2, '0')}-${nday.toString().padStart(2, '0')}`;
                query = {
                            createdAt: {
                                $gte: (currentTime),
                                $lt: nextTime
                                // $gte: ('2023-10-10'),
                                // $lt: ('2023-10-11')
                            },
                            isDeliverySuccess: true
                        }
                const totalOrder = await Order.count(query);
                const allOrder = await Order.find(query);
                var totalMoney = 0;
                if (allOrder) {
                    for (const item of allOrder) {
                        totalMoney += item.totalPrice;
                    }
                }
                listNumberOrder.push(totalOrder)
                listIncome.push(totalMoney)
                listDay.push('Day: ' + number)
            }

             resolve({
                status: 'OK',
                orders: listNumberOrder,
                incomes: listIncome,
                days: listDay
            })
        }catch(err){
            reject(err)
        }
        

     })
}

const dataMonth = () => {
    return new Promise(async (resolve, reject) => {
        try{
            var query = {}
            var listNumberOrder = []
            var listIncome = []
            var listMonths = []
            var today = new Date()
            var year = today.getFullYear();  // Lấy năm hiện tại
            var month = today.getMonth() + 1;  // Lấy tháng hiện tại (lưu ý: tháng bắt đầu từ 0 nên phải cộng thêm 1)
            var day = today.getDate();
            var currentTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


            for(var number=1; number<= month; number++){
               listMonths.push("Month: " + number);

               var nextTime = new Date()
                nextTime = new Date(nextTime.getFullYear(), number, 1);
                currentTime = new Date(year, number - 1, 1);
                nextTime = JSON.stringify(nextTime).split("T")[0].split("\"")[1];
                currentTime = JSON.stringify(currentTime).split("T")[0].split("\"")[1];
                query = {
                    createdAt: {
                        $gte: (currentTime),
                        $lt: (nextTime)
                        // $gte: ('2023-10-10'),
                        // $lt: ('2023-10-11')
                    },
                    isDeliverySuccess: true
                }
                const totalOrder = await Order.count(query);
                const allOrder = await Order.find(query);
                var totalMoney = 0;
                if (allOrder) {
                    for (const item of allOrder) {
                        totalMoney += item.totalPrice;
                    }
                }
                listNumberOrder.push(totalOrder)
                listIncome.push(totalMoney)
            }

             resolve({
                status: 'OK',
                orders: listNumberOrder,
                incomes: listIncome,
                days: listMonths
            })
        }catch(err){
            reject(err)
        }
        

     })
}

module.exports = {
    totalOrder, 
    numberOrder,
    dataMonth
}
