appendAddMedia();
function appendAddMedia(){
    const addMediaButton = document.createElement('img');
    addMediaButton.src = 'images/plus_icon.png';
    addMediaButton.className = 'portfolioImage';
    addMediaButton.id = 'addMedia';

    document.getElementById('portfolio').appendChild(addMediaButton);
    addMedia.addEventListener("click", togglePopup);

}

function togglePopup(){
    console.log("clicked");
    let upload = document.getElementById('uploadPop');
    if(upload.style.display === 'inline'){
        upload.style.display = 'none';
    }
    else{
        upload.style.display = 'inline';
    }
}


const views = ['gallery view', 'slide view'];
let currentView = 0;
function cycleView(){

    var images = document.querySelectorAll('img');


    switch(currentView){
        //set to single view
        case 0:
            document.getElementById('portfolio').style.gridTemplateColumns = '1fr';
            images.forEach((image) => {
                image.style.height = '50vh';
                image.style.width = '50vw';
            });
            currentView++;
            break;
        //switch to gallery view
        case 1:
            images.forEach((image) => {
                image.style.height = '27vh';
                image.style.width = '27vw';
            });
            document.getElementById('portfolio').style.gridTemplateColumns = '1fr 1fr 1fr';
            currentView = 0;
            break;
    }
    document.getElementById('view').textContent = views[currentView];
    
}

