// IMAGE FORMAT 



// Tell JS query for element with input name format and find the one that has state checked
const imageFormat = document.querySelector('input[name="format"]:checked');



// Text data 
// use document as entry point to the web pages content whhich is the DOM
// use query selector which is a mehtod used on the document object it returns the first element within
// the doc that uses #data
// the data input is a variable that holds the selected element 


// TEXT 
const dataInput = document.querySelector('#data')


const mainColorValue = document.querySelector('#color-value')
const backgroundValue = document.querySelector('#bg-color-value')


// COLORS

// we need to send this information to the API  
// 
const mainColorPicker = document.querySelector('#color') // holds the element for main color
const backgroundColorPicker = document.querySelector('#bg-color') // holds element for background color




// event listener used to find value selected from user selected event 
const updateColor = (e) => {
    const value = e.target.value;
    mainColorValue.innerText= value;

}

const updateBackgroundColor = (e) => {
    //stores value of the event occuring which is th current user selected color 
    const value = e.target.value; // e.target refers to the DOM element that triggers the event, stores the value 
    // change the inner text for the background balue 
    backgroundValue.innerText = value;


}



// this function will listen for changes in the users selection of colors 

const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateColor); // when change occurs call updateColor function
    backgroundColorPicker.addEventListener('change',updateBackgroundColor);


}

addColorPickerEventListeners(); // call function


// SLIDERS 

// These variables grab the elements for sliders 

const sizeSlider = document.querySelector('#size') // holds element for size slider 
const marginSlider  = document.querySelector('#margin') // holds element for margin slider 

// these hold the current user selected value 

const sizeValue = document.querySelector('#size-value') // holds the element that changes UI for current size 
const marginValue = document.querySelector('#margin-value') 

const updateSizeSlider = (e) => {
    const value = e.target.value; // store the user selected value 
    sizeValue.innerText = `${value} x ${value}`; 


}

const updateMarginSlider = (e) =>{
    const value = e.target.value; 
    marginValue.innerText = `${value} x ${value}`; ;
}



const addSliderEventListeners = () => {
    sizeSlider.addEventListener('change',updateSizeSlider)
    marginSlider.addEventListener('change',updateMarginSlider)
}

addSliderEventListeners(); // call the function




const submitButton = document.querySelector("#cta"); // store the submut element button here


// this takes an object as an arugment with several properties in the object 
const prepareParameters = (params) => {
// returns several objects 
  return  {
        data: params.data,
        size: `${params.size}x${params.size}`, 
        color: params.color.replace('#',''),  
        bgcolor: params.bgColor.replace('#',''), 
        qzone: params.qZone,
        format: params.format,
    };

};


const settingsContainer = document.querySelector('#qr-code-settings');
const resultContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped');// flips the front page to back
    resultContainer.classList.add('flipped'); // flips back page to front 
    qrCodeImage.setAttribute('src', imgUrl); // sets the current image source to the returned image address from API 
};



// does request using parameters and base url 
const getQrCode = (parameters) => {
    const urlParams = new URLSearchParams(parameters).toString(); // obtains url parameters for us with the current parameters 
    const baseUrl = "https://api.qrserver.com/v1/create-qr-code"; // base url for api
    const fullUrl = `${baseUrl}?${urlParams}` ; // this is the full url with base  + params
    //checks the url if response is 200 then run display qr code function 
    fetch(fullUrl).then(response => {
        if(response.status === 200){
            displayQrCode(fullUrl);
        }
    });

};

const showInputError = () => {
    dataInput.classList.add('error'); // adds aerror class to datainput(text)
}

// event lister for text field 

const dataInputEventListener = () => {
    dataInput.addEventListener('change', e =>{
        if(e.target.value !== ''){ // if there is something in text box
            dataInput.classList.remove('error'); // remove error class
            submitButton.removeAttribute('disabled');// remove disabled button 
        }else{ // else if there nothing in the text box
            dataInput.classList.add('error'); // add error class 
            submitButton.setAttribute('disabled',true); // set button to disabled 

        }
    });
};

dataInputEventListener(); // call event lsiteneter for 



const onSumbit = () => {
    console.log('clicked');
    // if not text in input

    const data = dataInput.value // sotres text value 

    if(!data.length){ // if data empty 
       return showInputError(); // run this function 

    }

    // store current parameters 
    const color = mainColorPicker.value
    const bgColor = backgroundColorPicker.value
    const size = sizeSlider.value
    const qZone = marginSlider.value
    const format = imageFormat.value

    // create const parameters and run the funciton prepare parameters with the object of several properties tha user has selected 
    // returns an object with same parameters formatted according to the API requirments 
    const parameters =  prepareParameters({data ,color, bgColor,size, qZone, format});

   getQrCode(parameters)// call getQR code with the formattted parameters 

};

// add event listeer to listen for when button is clicked 

const addSubmitEventListener = () => {
    submitButton.addEventListener('click',onSumbit)
}

addSubmitEventListener(); // call event listner for sumbut button 

const editButton = document.querySelector('#edit')

const onEdit = () => {
    settingsContainer.classList.remove('flipped'); 
    resultContainer.classList.remove('flipped'); 

};

const addEditButtonEventListener = () => {
    editButton.addEventListener('click', onEdit); 

   
}

addEditButtonEventListener();
