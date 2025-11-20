
function uploadMedia(){
    if(document.getElementById('title').value != ""){
        //creates portfolio item container
        const portfolioItem = document.createElement('div');
        portfolioItem.className = "portfolio-item";

        //creates image 
        const portfolioImage = document.createElement('img');
        portfolioImage.className = "portfolioImage";
        portfolioImage.src = "images/Conservation.png";

        //creates name of portfolio
        const portfolioName = document.createElement('div');
        portfolioName.className = "item-title";
        portfolioName.textContent = document.getElementById('title').value;

        portfolioItem.appendChild(portfolioImage);
        portfolioItem.appendChild(portfolioName);
        
        portfolioList = document.getElementById('portfolio');
        portfolioList.insertBefore(portfolioItem, portfolioList.children[0]);

        addMedia.addEventListener("click", togglePopup);
        togglePopup();
    }
}

function uploadFile(){
    imageThumbnail = document.getElementById('uploadImage');
    imageThumbnail.src = "images/Conservation.png";
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
    document.getElementById('uploadImage').style.height = '30vh';
    document.getElementById('uploadImage').style.width = '50vw';
    
}

