const body = document.querySelector("body"); // body element를 가져온다

const IMG_NUMBER = 24; // 전체 이미지 개수를 담는다

function handleImgLoad() {
    console.log("finished loading");
} 

// 이미지를 출력하는 함수
function paintImage (imgNumber) {
    const image = new Image();  // 새로운 이미지 객체 생성
    image.src = `images/${imgNumber + 1}.jpg`; // 이미지 파일명 변수에 담는다
    image.classList.add('bgImage'); // 새로운 클래스네임 추가
    body.appendChild(image);
    //image.addEventListener("loadend",handleImgLoad);
    // API에서 받아오는 것이 아님으로 필요 없음.(이미지로드가 완료 되는 시점을 이벤트 등록)  
}

// 사진 제목으로 들어갈 숫자 랜덤생성
function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);   // 24개의 사진제목을 랜덤하게 뽑는다 
    return number
}

function init(){ // initialisation(초기화)의 약자
    const randomNumber = genRandom(); // 사진이름에 해당하는 랜덤 수를 받아온다
    paintImage(randomNumber); // 받아온 랜덤 수를 출력하는 함수 호출
}

init();