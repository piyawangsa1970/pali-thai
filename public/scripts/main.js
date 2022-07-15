

// Change style of top container on scroll
// window.onscroll = function() {myFunction()};
// function myFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.getElementById("myTop").classList.add("w3-card-4", "w3-animate-opacity");
//     document.getElementById("myIntro").classList.add("w3-show-inline-block");
//   } else {
//     document.getElementById("myIntro").classList.remove("w3-show-inline-block");
//     document.getElementById("myTop").classList.remove("w3-card-4", "w3-animate-opacity");
//   }
// }

// Open and close the sidebar on medium and small screens
var currentEL = null
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}


// Accordions
function toggleAcc(event) {
  const target = event.target
  target.nextElementSibling.classList.toggle("w3-hide")
  if (target.classList.contains('acc-img-down')) {
    target.classList.remove('acc-img-down')
    target.classList.add('acc-img-up')
  }else{
    target.classList.remove('acc-img-up')
    target.classList.add('acc-img-down')
  }
}

function openTab(evt, tabName) {
  let arrTab = tabName.split("-")
  let selTab = +arrTab[2]
  x = document.getElementsByClassName(arrTab[0]);  //  div  ผลลัพธ์
  l = +arrTab[1]  // shorthand + : string to number
  for (i = 0; i <= l; i++) {
    x[i].style.display = "none";
  }
  x[selTab].style.display = "block";

  let tablinks = document.getElementsByClassName(`tab${arrTab[0]}`);  // div แท็บ
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-teal", "");
  }
  tablinks[selTab].className += " w3-teal"
}

function include_keyboard(){
  let char_keys=[
    "อ","อา","อิ","อี","อุ","อู","เอ","โอ"
    ,"กฺ","ขฺ","คฺ","ฆฺ","งฺ"
    ,"จฺ","ฉฺ","ชฺ","ฌฺ","ญฺ"
    ,"ฏฺ","ฐฺ","ฑฺ","ฒฺ","ณฺ"
    ,"ตฺ","ถฺ","ทฺ","ธฺ","นฺ"
    ,"ปฺ","ผฺ","พฺ","ภฺ","มฺ"
    ,"ยฺ","รฺ","ลฺ","วฺ","สฺ","หฺ","ฬฺ","อํ"]
  let keyboard=''
  for (let i=0; i<char_keys.length; i++){
    keyboard += `<div onClick=(insert_augkara('${char_keys[i]}'))>${char_keys[i]}</div>`
  }
  return keyboard
}

function openQuestion(event){
  let parent=event.target.parentElement.parentElement
  let question = document.getElementById ("question");
  if (question!=null) question.remove()
  
  let node = document.createElement("div");
  let textnode = document.createTextNode("question");
  node.appendChild(textnode); 
  node.setAttribute("id","question")
  node.setAttribute("class","quest-santhi w3-light-grey")
  parent.appendChild(node)
  question = document.getElementById ("question");

  question.innerHTML=`
    <div>
      <button style="width:30px" onclick="decrease_augkara_input()">&minus;</button> 
      <span id="num_of_augkarani">1</span>
      <button style="width:30px" onclick="increase_augkara_input()">&plus;</button>
    </div>
    <div id="getAugkarani">
      <div class="input-augkara intro w3-border w3-border-green" onClick="setActive(0)">_</div>
    </div>
    <div class="keyboard w3-center">
    ${include_keyboard()}
    </div>
    <div class="clearfix"></div>
    <div class="w3-center">
      <button class="w3-button w3-green" onClick="send_arr_of_augkara()"> ส่งคำตอบ </button>
    </div>`
}


/*
function openQuestion(event){
  let el=event.target.parentElement.parentElement
  let char_keys=["อ","อา","อิ","อี","อุ","อู","เอ","โอ"
                ,"กฺ","ขฺ","คฺ","ฆฺ","งฺ"
                ,"จฺ","ฉฺ","ชฺ","ฌฺ","ญฺ"
                ,"ฏฺ","ฐฺ","ฑฺ","ฒฺ","ณฺ"
                ,"ตฺ","ถฺ","ทฺ","ธฺ","นฺ"
                ,"ปฺ","ผฺ","พฺ","ภฺ","มฺ"
                ,"ยฺ","รฺ","ลฺ","วฺ","สฺ","หฺ","ฬฺ","อํ"]
  let div_inn=''
  for (let i=0; i<char_keys.length; i++){
    div_inn += `<div onClick=(insert_augkara('${char_keys[i]}'))>${char_keys[i]}</div>`
  }
  el.innerHTML = `
  <br>
  <div class="container">ผู้ใคร่ศึกษา พึงสนธิอักขระตามที่กำหนดให้ดังต่อไปนี้ อกฺขอรฺออํ 
  </div>
  <div class="w3-center">
    <button 
      class="w3-button w3-teal mb-16" 
      onclick="openQuestion(event)"
      > ทำแบบฝึกหัด 
    </button>
  </div>

  <div class="quest-santhi w3-light-grey">
    <div>
      <button style="width:30px" onclick="decrease_augkara_input()">&minus;</button> 
      <span id="num_of_augkarani">1</span>
      <button style="width:30px" onclick="increase_augkara_input()">&plus;</button>
    </div>
    <div id="getAugkarani">
      <div class="input-augkara intro w3-border w3-border-green" onClick="setActive(0)">_</div>
    </div>
    <div class="keyboard w3-center">
      ${div_inn}
    </div>
    <div class="clearfix"></div>
    <div class="w3-center">
      <button class="w3-button w3-green" onClick="send_arr_of_augkara()"> ส่งคำตอบ </button>
    </div>
  </div>`
}
*/
function increase_augkara_input(){
  let num = document.getElementById("num_of_augkarani")
  let count = +num.innerHTML
  if (count < 12) {
    count +=1 
    num.innerText= count
    let el = document.getElementById("getAugkarani")
    let inn = el.innerHTML
    el.innerHTML = inn+`<div class="input-augkara" onClick="setActive(${count-1})">_</div>`
  }
}

function decrease_augkara_input(){
  let num = document.getElementById("num_of_augkarani")
  if (+num.innerHTML > 1) {
    num.innerText = +num.innerText - 1
    let el = document.getElementById("getAugkarani")
    el.removeChild(el.lastChild);

  }
}

function setActive(num){
  let x = document.getElementsByClassName("input-augkara")
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" intro w3-border w3-border-green", "");
  }
  x[num].className += " intro w3-border w3-border-green"
}

function insert_augkara(ch){
  // const x = document.querySelectorAll("p.intro");
  let x = document.getElementsByClassName("intro");
  for (i = 0; i < x.length; i++){
    x[0].innerHTML=ch
  }
  
}

function send_arr_of_augkara(){
  
  let arr_of_augkara = []
  let x = document.getElementsByClassName("input-augkara")
  for (i = 0; i < x.length; i++) {
    if(x[i].textContent!='_') arr_of_augkara.push(x[i].textContent)
  }
  document.getElementById('modal').style.display='block'
  console.log('send_arr_of_augkara()',arr_of_augkara);
  augkarani.value = arr_of_augkara
  let res = augkarani.get_th_read()
  //display_result(augkarani.th_read)
}


function display_augkara_input(result){
  document.getElementById("augkara_input").innerHTML='อักขระสนธิ: '+result
}

function display_thai_read_result(result){
  document.getElementById("thai_read_result").innerHTML='อ่านว่า: '+result
}

function display_thai_read_error(result){
  document.getElementById("thai_read_error").innerHTML='ตรวจสอบ: '+ result
}