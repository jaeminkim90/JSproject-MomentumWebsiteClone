const API_KEY = "cee80621c1c0d67a633040d4fa499e40"; // Open Weather Map API_KEY
const COORDS = "coords";

// 좌표를 저장하는 함수
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    // KEY:COORDS VALUE:coordsObj 로컬저장소 저장
}

// 성공했을 때 위치를 받아오는 함수
function handleGeoSucces(position) {
    const latitude = position.coords.latitude; // 위도 받기
    const longitude = position.coords.longitude; // 경도 받기
    const coordsObj = {
        latitude,
        longitude
        // 객체안에 있는 변수의 key와 value가 동일할 때 위와 같이 사용 가능
    };
    saveCoords(coordsObj);//객체를 인자로 담아서 저장함수 호출

}

function handleGeoError() {
    console.log('Cant access geo location')
}

// 위치값을 요청하는 함수
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    // getCurrentPosition()을 통해 현재 위치정보를 가져올 수 있다
    // 위치가 확인되면 첫 번째 정의된 콜백 함수 실행, 에러 발생 시 두 번째 콜백함수 실행
}

// 저장된 지역정보를 가져오는 함수
function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);   //위치값 불러오기
    if (loadedCords === null) {  // 기존 저장된 값이 없을 경우
        askForCoords(); // 위치값 요청 함수 호출
    } else {
        // getWeather() // 날씨정보 받기
    }
}


function init() {
    loadCoords();

}

init();