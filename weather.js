const weather = document.querySelector(".js-weather");

const API_KEY = "cee80621c1c0d67a633040d4fa499e40"; // Open Weather Map API_KEY
const COORDS = "coords";

// API 호출하고 날씨정보 얻는 함수
function getWeather(lat, lng) {
    fetch( 
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){ // 데이터가 완전히 들어온 다음 than()호출. 만약 fetch()를 기다리지 않고 다음 작업을 지시하면 비동기방식으로 처리 됨. fetch()가 정상적으로 완료되지 않을 수 있음
        return response.json(); //
    })
    .then(function(json){ // JS에서 뭔가를 기다리게 하는 방법은 then을 쓰면 된다
       const temperature = json.main.temp; // json에서 온도 가져온다
       const place = json.name; // json에서 지역 가져온다
       weather.innerText = `${temperature} @ ${place}`;
        

    });
}

// 좌표를 저장하는 함수
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    // KEY:COORDS VALUE:coordsObj 로컬저장소 저장
    // JSON.stringify(): JSON object를 string object로 변환
}

// 좌표값 새로받기가 성공했을 때 -> 위치를 받아오는 함수
function handleGeoSucces(position) {
    const latitude = position.coords.latitude; // 위도 받기
    const longitude = position.coords.longitude; // 경도 받기
    const coordsObj = {
        latitude,
        longitude
        // 객체안에 있는 변수의 key와 value가 동일할 때 위와 같이 사용 가능
    };
    saveCoords(coordsObj);//객체를 인자로 담아서 저장함수 호출
    getWeather(latitude,longitude); // geographic coordinates 가져오는 함수 호출

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
    const loadedCoords = localStorage.getItem(COORDS);   //위치값 불러오기
    if (loadedCoords === null) {  // 기존 저장된 값이 없을 경우
        askForCoords(); // 위치값 요청 함수 호출
    } else {
        const parsedCoords = JSON.parse(loadedCoords); // JSON 객체로 parse
        //JSON.parse(): sting object를 JSON object로 변환
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init() {
    loadCoords();

}

init();