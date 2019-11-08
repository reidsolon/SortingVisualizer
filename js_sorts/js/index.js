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
var selectionInterval = null;
var sortedInterval = null;

//info tracker declarations
var total_array = document.getElementById('total-array');
var sort_speed = document.getElementById('sort-speed');
var condition = document.getElementById('condition');
var view_loops = document.getElementById('total-loops');
var total_tick = document.getElementById('total-ticks');
var status_txt = document.getElementById('status');

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
    clearInterval(selectionInterval);
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
        var new_array = Math.floor((Math.random() * _LENGTH) + 20);
        if (array.includes(new_array)) {
            new_array = Math.floor((Math.random() * _LENGTH) + 20);
        }

        array[i] = new_array;
        html += '<div class="num animate bar_' + array[i] + '" id="bar_' + array[i] + '" style="height: ' + array[i] + 'px; background-color:#6399F1; width: 3px;">&nbsp;</div>';
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
                status_txt.innerHTML = 'Sorting..';
                total_tick.innerHTML = temp_ticks;

                _doAnimation(array[i], array[count]);
                if (array[i] > array[count]) {
                    _doAnimation(array[i], array[count]);
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
                    status_txt.innerHTML = 'Sorted';

                    sortedAnimation();
                    
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
                    sorted_array.unshift(array[i]);
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
const mergeSortAlgo = () => {

    nums = array;

    // const mergeSort = (nums) => {
    //     const sortedArray = nums;
    //     if (sortedArray.length < 2) {
    //         return nums;
    //     }
    //     const length = sortedArray.length;
    //     const middle = Math.floor(length / 2);
    //     const left = sortedArray.slice(0, middle);
    //     const right = sortedArray.slice(middle);

    //     return merge(mergeSort(left), mergeSort(right));
    // };

    // const merge = (left, right) => {
    //     const results = [];
    //     while (left.length && right.length) {
    //         if (left[0] <= right[0]) {
    //             results.push(left.shift());
    //         }
    //         else {
    //             results.push(right.shift());
    //         }
    //     }
    //     return results.concat(left, right);
    // };

    const emptyArray = [];

    const mergeSort = ()=> {
        
    }

    const merge = ()=>{ 

    }

    alert(mergeSort(nums));

}

const selectionSortAlgo = () => {
    disableButtons();
    var startIdx = 0;
    var currentMinimum = array[startIdx];
    var currentMinimumIdx = 0;
    var loop_counter = 0;
    var needSwap = false;

    var i = 1;
    selectionInterval = setInterval(() => {
        if( i != (array.length) - loop_counter) {

            _doAnimation(currentMinimum, array[startIdx+i]);
            if (array[startIdx+i] < currentMinimum) {
                currentMinimum = array[startIdx+i];
                currentMinimumIdx = startIdx+i;

                console.log('New minimum:'+ currentMinimum+" "+'NewMinimumIdx: '+currentMinimumIdx);

                _doAnimation(currentMinimum, array[startIdx+i]);

                needSwap = true;
            }

            i++;   

        } else{
            if(needSwap) {
                _doSwapAnimation(currentMinimumIdx, startIdx);
                needSwap = false;
            } else {

                sorted_array.push(currentMinimum);
            }
            
            

            i = 1;
            startIdx++;
            loop_counter++;


            currentMinimum = array[startIdx];
        }
        
        if (loop_counter+2 == array.length) {

            clearInterval(selectionInterval);
            activeButtons();
            sortedAnimation();

        }

    }, 550 - sort_size.value);

    function _doAnimation(minimum, currentElement) {
        
        document.getElementsByClassName('bar_' + minimum)[0].style.backgroundColor = '#6CDB7B';
        document.getElementsByClassName('bar_' + currentElement)[0].style.backgroundColor = '#DD5C5C';
        
        setTimeout(() => {
            refreshBars();
        }, 60);
    }

    function _doSwapAnimation(currentMinimumIdx, startIdx) {
        
        setTimeout(()=> {
            document.getElementsByClassName('bar_' + array[currentMinimumIdx])[0].style.backgroundColor = '#6CDB7B';
            document.getElementsByClassName('bar_' + array[startIdx])[0].style.backgroundColor = '#6CDB7B';
        }, 20);

        setTimeout(() => {
            var _temp = array[startIdx];
            var sortedValue = array[startIdx] = array[currentMinimumIdx];
            array[currentMinimumIdx] = _temp;

            sorted_array.push(sortedValue);

            console.log(sortedValue);
            console.log(sorted_array);
        }, 40);

        setTimeout(() => {
            refreshBars();
        }, 50);
    }

}
 
const refreshBars = () => {
    var html = '';
    var arr_html = '';
    for(var i = 0; i<array.length; i++){
        html += '<div class="num bar_' + array[i] + '" id="bar_' + array[i] + '" style="height: ' + array[i] + 'px; background-color: #6399F1;width: 3px;">&nbsp;</div>';
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
        } else {
          clearInterval(sortedInterval);
          refreshBars();
        }
        
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