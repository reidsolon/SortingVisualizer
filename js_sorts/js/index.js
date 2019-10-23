var array = [];
var sorted_array = [];
var container = document.querySelector('#barsContainer');
var arr_cont = document.querySelector('#array');

//init booleans
var bubble_sorted = false;

var bars_class;
//
var sort_btns = document.getElementsByClassName('sort_btns');
//Last Index
var last_index;

//
var sort_size = document.getElementById('sort_size');
//
var tick = 0;

//
var interval = null;

const activeButtons = () => {
    for (var i = 0; i < sort_btns.length; i++) {
        sort_btns[i].removeAttribute('disabled', 'disabled');
    }

}

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

    clearInterval(interval);
    activeButtons();

    array = [];
    var html = '';
    var arr_html = '';
    for( var i = 0; i < parseInt(_NUM) ; i ++ ) {
       
        array[i] = Math.floor((Math.random() * _LENGTH) + 1);
        html += '<div class="num animate" id="bar_' + array[i] + '" style="height: ' + array[i] + 'px">&nbsp;</div>';
        arr_html += array[i]+' ';

    }
    bars_class = document.getElementsByClassName('num');
    container.innerHTML = html;
    arr_cont.innerHTML = arr_html;
    last_index = array.length - 1;
}

//set a default arrays
generateRandom(sort_size.value, sort_size.value / 4);

const bubbleSort = ( INTERVAL ) => {

    if(!bubble_sorted) {
        disableButtons();
        interval = setInterval(function () {
            bubbleSortAlgo();
            tick++;
            if (tick >= array.length) {
                sortFinish();
                activeButtons();
                stop();
                clearInterval(interval);
                bubble_sorted = true;
                //clear tic k
                tick = 0;
            }
        }, 250);
    }else {
        alert('Already been sorted!');
    }  
}

const bubbleSortAlgo = () => {
    var count = 1;
    for (var i = 0; i < array.length; i++) {

            if (array[i] > array[count]) {
                var _temp = array[i];
                array[i] = array[count];
                array[count] = _temp;
                
            }
            count++;
            refreshBars();
        
    }    
}

const refreshBars = () => {
    var html = '';
    var arr_html = '';
    for(var i = 0; i<array.length; i++){
        html += '<div class="num red" id="bar_' + array[i] + '" style="height: ' + array[i] + 'px">&nbsp;</div>';
        arr_html += array[i] + ' ';
    }
    arr_cont.innerHTML = arr_html;
    container.innerHTML = html;
}

const sortFinish = () => {
    for(var i = 0 ; i<array.length ; i ++){

        bars_class[i].style.backgroundColor = 'rgb(15, 95, 241)';

    }

}

