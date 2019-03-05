// toDoList 영역에 해당하는 element 참조변수 선언
const toDoform = document.querySelector(".js-toDoForm"),
toDoInput = toDoform.querySelector("input"),   // const임으로 변수명을 다르게 선언
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS='toDos';


let toDos= []; // toDos를 저장할 수 있도록 array 생성(값 변화로 인해 let 사용)

// delBtn을 눌렀을 때 리스트를 삭제하는 함수
function deleteToDo(event) {
    const btn = event.target; // 이벤트 트리거의 속성을 btn으로 가져온다
    const li = btn.parentNode;  // 부모노드 속성을 li로 가져온다
    toDoList.removeChild(li);   // 이벤트 트리거에 해당하는 자식 element를 삭제한다
    const cleanToDos = toDos.filter(function(toDo){ // filter를 통과하는 요소 array로 반환
        
        return toDo.id !== parseInt(li.id);
         // 이벤트 트리거의 부모노드(li)를 통해 얻은 id를 기존리스트(toDo)와 비교 후 리턴
    }); 
    toDos = cleanToDos
    saveToDos();

    
}

// 로컬저장소에 저장
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON을 이용하여 object를 string로 변환

}

// TO DO LIST를 신규 생성하는 함수
function paintToDo(text) {  // parameter로 사용자 입력값을 받는다
    const li = document.createElement("li")  // li 생성
    const delBtn = document.createElement("button"); // button 생성
    const span = document.createElement("span");
    const newId = toDos.length + 1; // toDos에 사용 될 아이디 생성    
    delBtn.innerHTML = "❌"; // 버튼값으로 이모지 추가
    delBtn.addEventListener("click", deleteToDo); // 삭제를 위한 클릭 이벤트
    span.innerText = text;  // span에 파라미터로 들어온 text값 전달
    li.appendChild(delBtn); // li 영역에 삭제버튼 추가
    li.appendChild(span); // li 영역에 span 엘리먼트 추가
    li.id = newId; // li마다 id부여
    toDoList.appendChild(li); // 만들어진 li를 toDoList에 추가
    const toDoObj = { //입력값과 아이디를 부여하여 배열로 array로 저장
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();// 로컬저장소에 저장
    

}

// 입력 값을 받는 함수
function handleSubmit(event){
    event.preventDefault(); // summit 방지
    const currentValue = toDoInput.value;   // 현재 입력값을 변수에 저장
    paintToDo(currentValue); // 출력 함수 실행 
    toDoInput.value = ""; // 빈칸 초기화
}

// 로컬저장소에 저장된 toDoList가 있으면 가져온다
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS); 
    if(loadedToDos != null) {   // 저장된 toDos 불러오기
        const parsedToDos = JSON.parse(loadedToDos); // string을 object로 변환, 변수 저장
        parsedToDos.forEach(function(toDo){ //forEach는 array요소 각각이 함수를 실행
           paintToDo(toDo.text); // toDo객체의 text값을 출력한다
        });
    } 
}




function init() {
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit)// 텍스트 입력 후 summit 이벤트 함수 실행

}

init();