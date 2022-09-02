$(document).ready(function () {
    var startDate;
    var endDate;
    var departDate;
    var returnDate;
    //Jquery ui datepicker
    $(".from, .depart").datepicker({
        minDate: 0,
        maxDate: "+1y",
        dateFormat: "DD, MM dd, yy",
    });
    $(".to").datepicker({
        minDate: "+1d",
        maxDate: "+1y",
        dateFormat: "DD, MM dd, yy",
    });
    $(".return").datepicker({
        minDate: 0,
        maxDate: "+1y",
        dateFormat: "DD, MM dd, yy",
    });

    $(".from").change(function () {
        startDate = $(this).datepicker("getDate");
        startDate.setDate(startDate.getDate() + 1);
        $(".to").datepicker("option", "minDate", startDate);
    });
    $(".to").change(function () {
        endDate = $(this).datepicker("getDate");
        endDate.setDate(endDate.getDate() - 1);
        $(".from").datepicker("option", "maxDate", endDate);
    });
    $(".depart").change(function () {
        departDate = $(this).datepicker("getDate");
        $('.return').datepicker("option", "minDate", departDate);
    });
    $(".return").change(function () {
        returnDate = $(this).datepicker("getDate");
        $(".depart").datepicker("option", "maxDate", returnDate);
    });

    //rotate the button
    $(".rotate").on("click", function () {
        $(this).toggleClass("turn");
    });
});
//Vue 
const app = Vue.createApp({
    data() {
        return {
            arrs: [],
            secArray: [],
            active: 0,
            seat: 0,
            category: ["One-way", "Round-trip"],
            seats: ["Economy", "Premium Economy", "Business", "First"],
            details: [
                {
                    name: "Adults(12years and above)",
                    nums: 1
                },
                {
                    name: "Children",
                    nums: 0
                },
                {
                    name: "Rooms",
                    nums: 1
                }
            ],
            passenger: [
                {
                    client: "Adults(12years and above)",
                    number: 1
                },
                {
                    client: "Children",
                    number: 0
                }
            ],
            isShowingTab: true,
            showItem: false,
            showPassenger: false
        }
    },
    methods: {
        toggleTab(ShowTab) {
            this.isShowingTab = ShowTab;
        },
        isRoundTrip(index) {
            this.active = index;
        },
        whatSeat(index) {
            this.seat = index;
        },
        minusNum(item) {
            if (item.nums !== 0) {
                item.nums -= 1;
            }
            const same = this.arrs.find(people => people.name === item.name);
            if(!same) {
                this.arrs.push({
                    nums: item.nums,
                    name: item.name
                });
            } else {
                if(same.nums !== 0) {
                    same.nums --;
                }
            };
 
            var whole = [];
            for(let i = 0; i < this.arrs.length; i++) {
                var names = this.arrs[i].nums + " " + this.arrs[i].name;
                whole.push(" " + names);
                document.getElementById("room").value = whole;
            }
        },
        plusNum(item) {
            item.nums += 1;
            const same = this.arrs.find(people => people.name === item.name);
            if(!same) {
                this.arrs.push({
                    nums: item.nums,
                    name: item.name
                });
            } else {
                same.nums ++;
            };
            
            var whole = [];
            for(let i = 0; i < this.arrs.length; i++) {
                var names = this.arrs[i].nums + " " + this.arrs[i].name;
                whole.push(" " + names);
                document.getElementById("room").value = whole;
            }
        },
        subtractNum(item) {
            if (item.number !== 0) {
                item.number -= 1;
            }
            const same = this.secArray.find(people => people.client === item.client);
            if(!same) {
                this.secArray.push({
                    number: item.number,
                    client: item.client
                });
            } else {
                if(same.number !== 0) {
                    same.number --;
                }
            };
            
            var whole = [];
            for(let i = 0; i < this.secArray.length; i++) {
                var names = this.secArray[i].number + " " + this.secArray[i].client;
                whole.push(" " + names);
                document.getElementById("passenger").value = whole;
            }
        },
        addNum(item) {
            item.number += 1;
            const same = this.secArray.find(people => people.client === item.client);
            if(!same) {
                this.secArray.push({
                    number: item.number,
                    client: item.client
                });
            } else {
                same.number ++;
            };
            
            var whole = [];
            for(let i = 0; i < this.secArray.length; i++) {
                var names = this.secArray[i].number + " " + this.secArray[i].client;
                whole.push(" " + names);
                document.getElementById("passenger").value = whole;
            }
        },
        switchtext() {
            //switch the value of the input
            let objOne = document.getElementById("place");
            let objTwo = document.getElementById("destination");

            let change = objOne.value;
            objOne.value = objTwo.value;
            objTwo.value = change;
        }
    }
});
app.mount('#app');