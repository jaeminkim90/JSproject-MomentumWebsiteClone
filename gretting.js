// HTML element 변수 선언
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");


const USER_LS = "currentUser",  // 로컬저장소의 유저 키값
    SHOWING_CN = "showing"; // css class name

// 유저네임 저장하는 함수
function saveName(text) {
    localStorage.setItem(USER_LS, text);    //로컬저장소에 키,밸류 set
}

// 유저네임이 입력되면 처리하는 함수
function handleSubmit(event){
    event.preventDefault(); // 이벤트 동작 막음(새로고침막음)
    const currentValue = input.value; //현재 입력 된 값을 저장
    paintGreeting(currentValue);    // 유저네임 출력
    saveName(currentValue); // 유저네임 로컬저장소에 저장

}


// 저장된 유저 이름이 없을 경우 실행 함수
function askForName() {
    form.classList.add(SHOWING_CN); //값을 받을수 있도록 form 클래스 노출
    form.addEventListener("submit", handleSubmit) //엔터키 인식 
}

// 저장된 유저네임이 있을 경우 실행 함수
function paintGreeting(text){
    form.classList.remove(SHOWING_CN); //form 클래스 숨김
    greeting.classList.add(SHOWING_CN); // greetings 클래스 노출
    greeting.innerText = `Hello ${text}`; // 텍스트 출력
}

// 유저네임 불러오기
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    
    // 저장된 값이 있을 경우와 없을 경우로 나눠서 처리한다
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);

    }
}

//초기화 함수
function init() {
    loadName();
}

init();