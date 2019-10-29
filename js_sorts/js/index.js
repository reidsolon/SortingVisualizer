var array = [];
var sorted_array = [];
var container = document.querySelector('#barsContainer');
var arr_cont = document.querySelector('#array');

var isSorted = false;
//
var jsDefaultSort = [];

//init booleans
var bubble_sorted = false;

var bars_class;
//
var sort_btns = document.getElementsByClassName('sort_btns');

//Last Index
var last_index;


var sort_size = document.getElementById('sort_size');

var tick = 0;
var total_loops = 0, temp_ticks = 0, temp_loops;
var interval = null;
var bubbleInterval = null;
var sortedInterval = null;

//info tracker declarations
var total_array = document.getElementById('total-array');
var sort_speed = document.getElementById('sort-speed');
var condition = document.getElementById('condition');
var view_loops = document.getElementById('total-loops');
var total_tick = document.getElementById('total-ticks');
var status = document.getElementById('status');

//active all buttons
const activeButtons = () => {
    for (var i = 0; i < sort_btns.length; i++) {
        sort_btns[i].removeAttribute('disabled', 'disabled');
    }

}

//disabling all buttons
const disableButtons = () => {
    for (var i = 0; i < sort_btns.length; i++) {
        sort_btns[i].setAttribute('disabled', 'disabled');
    }
}


const generateNewArray = () => {
    
    if(sort_size != null ){
        generateRandom(sort_size.value, sort_size.value / 4);
    }
}

const generateRandom = (_LENGTH, _NUM) => {
    //clear tick
    tick = 0;
    //clear booleans 
    bubble_sorted = false;
    isSorted = false;

    clearInterval(interval);
    clearInterval(bubbleInterval);
    total_loops = 0;
    view_loops.innerHTML = 0;
    temp_ticks = 0;
    total_tick.innerHTML = 0;
    activeButtons();

    array = [];
    sorted_array = [];
    var html = '';
    var arr_html = '';
    for( var i = 0; i < parseInt(_NUM) ; i ++ ) {
        var new_array = Math.floor((Math.random() * _LENGTH) + 1);
        if (array.includes(new_array)) {
            new_array = Math.floor((Math.random() * _LENGTH) + 1);
        }

        array[i] = new_array;
        html += '<div class="num animate bar_' + array[i] + '" id="bar_' + array[i] + '" style="height: ' + array[i] + 'px; background-color:#6399F1; width: '+ (80-(sort_size.value/3))+'px;">&nbsp;</div>';
        arr_html += array[i]+' ';

    }
    bars_class = document.getElementsByClassName('num');
    container.innerHTML = html;
    arr_cont.innerHTML = arr_html;
    last_index = array.length - 1;
    sort_speed.innerHTML = 550 - sort_size.value;
    total_array.innerHTML = array.length;
}

//set a default arrays
generateRandom(sort_size.value, sort_size.value / 4);

const bubbleSortAlgo = () => {
    disableButtons();
    var i = 0, count = 1, tick = 0;

    
        bubbleInterval = setInterval(() => {
            if (!isSorted) {
                status.innerHTML = 'Sorting..';
                total_tick.innerHTML = temp_ticks;

                _doAnimation(array[i], array[count]);
                if (array[i] > array[count]) {
                    _doSwapAnimation(array[i], array[count]);
                    var _temp = array[i];
                    array[i] = array[count];
                    array[count] = _temp;

                    _doSwapAnimation(array[i], array[count]);

                }



                if (total_loops == array.length - 1) {
                    clearInterval(bubbleInterval);
                    total_loops = 0;
                    isSorted = true;
                    activeButtons();
                    status.innerHTML = 'Sorted';
                    sortedAnimation();
                    clearInterval(sortedInterval);
                }

                count++;
                i++;
                tick++;
                temp_ticks++;

                if (tick == array.length - (total_loops + 1)) {
                    tick = 0;
                    total_loops++;
                    view_loops.innerHTML = total_loops;
                    clearInterval(bubbleInterval);
                    sorted_array.push(array[i]);
                    console.log(sorted_array);
                    bubbleSortAlgo();
                }

            } else {

                activeButtons();
                clearInterval(bubbleInterval);

            }
        }, 550 - sort_size.value);
    

        function _doAnimation(arr1, arr2){
            // for (var i = 0; i < bars_class.length; i++) {
            //     bars_class[i].style.backgroundColor = 'blueviolet';
            // }
            document.getElementsByClassName('bar_' + arr1)[0].style.backgroundColor = '#6CDB7B';
            document.getElementsByClassName('bar_' + arr2)[0].style.backgroundColor = '#6CDB7B';

            setTimeout(() => {
                refreshBars();
            }, 100);

            
        }

        function _doSwapAnimation(arr1,arr2){      

            setTimeout(() => {
                document.getElementsByClassName('bar_' + arr1)[0].style.backgroundColor = '#DD5C5C';
                document.getElementsByClassName('bar_' + arr2)[0].style.backgroundColor = '#DD5C5C';
            }, 20);
            
            setTimeout(() => {
                refreshBars();
            }, 40); 

            setTimeout(() => {
                document.getElementsByClassName('bar_' + arr1)[0].style.backgroundColor = '#DD5C5C';
                document.getElementsByClassName('bar_' + arr2)[0].style.backgroundColor = '#DD5C5C';
            }, 40 );
            
                       
            
        }
       
}

 
const refreshBars = () => {
    var html = '';
    var arr_html = '';
    for(var i = 0; i<array.length; i++){
        html += '<div class="num bar_' + array[i] + '" id="bar_' + array[i] + '" style="height: ' + array[i] + 'px; background-color: #6399F1;width: ' + (80 - (sort_size.value / 3)) +'px;">&nbsp;</div>';
        arr_html += array[i] + ' ';
    }
    
    arr_cont.innerHTML = arr_html;
    container.innerHTML = html;

    for (var i = 0; i < sorted_array.length; i++) {
        document.getElementsByClassName('bar_' + sorted_array[i])[0].style.backgroundColor = '#B578E8';
    }
}


const sortedAnimation = () => {
    var i = 0; 
    sortedInterval = setInterval(() => {

        if(i<array.length){
            bars_class[i].style.backgroundColor = '#6CDB7B';
            i++;
        }
        
    }, 30);

    i=0;


    setTimeout(() => {
            bars_class[i].style.backgroundColor = '#B578E8';
        
    }, 50);
    
}


//valdiate purposes
const areEqual = (firstArray, secondArray)=> {
    if (firstArray !== secondArray) return false;

    for(var i = 0; i < firstArray.length ; i++){
        if(firstArray[i] !== secondArray[i]) return false;
    }

    return true;
}