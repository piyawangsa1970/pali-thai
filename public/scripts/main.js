
// ะ \u0E30   &#3632;
//  ั \u0E31   &#3633;
// า \u0E32  &#3634;
//   ิ  \u0E34  &#3636;
//   ี  \u0E35 &#3637;
//   ุ  \u0E38 &#3640;
//   ู  \u0E39 &#3641;
//  เ  \u0E40 &#3648;
//  โ \u0E42 &#3650;
// .  \u0E3A  &#3642;
//   ํ  \u0E4D &#3661;
//   figure space  \u2007 &#8199;


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

function openQuestion(event,num_of_work){
  // doselect
  // 0 สะกด
  // 1 รวมพยัญชนะเข้ากับสระ
  doselect=[
    {cmd:"ส่งคำตอบ"},                       // 0
    {cmd:"รวมพยัญชนะเข้ากับสระ"}              // 1
  ]
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
      <button class="w3-button w3-green" onClick="send_arr_of_augkara(${num_of_work})"> ${doselect[num_of_work].cmd} </button>
    </div>`
}

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

function send_arr_of_augkara(num){
  
  let arr_of_augkara = []
  let x = document.getElementsByClassName("input-augkara")
  for (i = 0; i < x.length; i++) {
    if(x[i].textContent!='_') arr_of_augkara.push(x[i].textContent)
  }
  document.getElementById('modal').style.display='block'
  document.getElementById('sum_augkara').style.display='none'
  augkarani.value = arr_of_augkara
 
  let res = null
  switch (num){
    case 0: // ตรวจสอบการผสมอักขระ
      res = augkarani.get_th_read()
      break
    case 1: // รวมพยัญชนะ เข้ากับสระ 
      res = augkarani.get_th_read()
      // id="sum_augkara"
      if (document.getElementById("thai_read_result").innerHTML.includes("ออก")){
        document.getElementById('sum_augkara').style.display='none'
      }else{
        document.getElementById('sum_augkara').style.display='block'
      }
      break;
  }
  // การแสดงผล ให้แต่ละ function แสดง
}


function display_augkara_input(result){
  document.getElementById("augkara_input").innerHTML='ปกติสนธิ: '+result
  blingWord = result
  document.getElementById("sum_payanchana_with_sara").innerHTML=result
  
}

function display_thai_read_result(result){
  document.getElementById("thai_read_result").innerHTML='อ่านว่า: '+result
}

function display_thai_read_error(result){
  document.getElementById("thai_read_error").innerHTML='ตรวจสอบ: '+ result
}

// sum augkara
var n=1
var myinterval = null
var blingWord = null
var blingWord_blank

function sumaugkara1(){ 
  n=0
  myinterval = setInterval(bling, 500);
  blingWord_blank = replace_text_for_bling(blingWord)
  
}

function bling(){
  const el = document.getElementById("sum_payanchana_with_sara")
  n = n+1 
  if (n%2==1) el.innerHTML=blingWord_blank
  else el.innerHTML=blingWord 
  if (n>5) {
    stopInterval();
    n = 0
  }
}

function replace_text_for_bling(x){
  let l = x.length
  x += '__'
  let y = x.split('')
  let res =''
  
  for(let i=0; i< l;i++){
    if (y[i]=='\u0E3A'){  // pintu
      if (y[i+1]=='อ'){
        y[i]=''
        y[i+1]='\u00A0\u2006'
      }else if (y[i+1]=='เ' || y[i+1]=='โ') {
        y[i]=''
        y[i+2]='\u00A0\u2006'
      }
    }else if(y[i]=='อ' && y[i+1]=="\u0E4D"){
      y[i]='\u00A0\u2006'
    }
    res += y[i]
  }
 
  return res
}

function sum_decrease(x){
  let l = x.length
  x = '__' + x + '__'
  let y = x.split('')
  let res = ''
  
  for(let i=2; i< l+2;i++){
    if (y[i]=='\u0E3A'){  // pintu
      if (y[i+1]=='อ'){
        y[i]=''
        y[i+1]=''
      }else if (y[i+1]=='เ' || y[i+1]=='โ') {
        y[i]=''
        if (y[i-2]=='\u0E3A'){  // pintu  มีพยัญชนะสังโยค
          y[i-3]=y[i+1]+y[i-3]     
        }else{
          y[i-1]=y[i+1]+y[i-1]
        }
        y[i+1]=''
        y[i+2]=''
      }
    }else if (y[i+1]=="\u0E4D"){
      y[i]=''
    }
  }

  for(let i=2;i<l+2;i++){
    res += y[i] 
  }
 
  return res
}

function stopInterval() {
  clearInterval(myinterval);
}

function sumaugkara2(){
  const el = document.getElementById("sum_payanchana_with_sara")
  el.innerHTML = blingWord_blank
}
function sumaugkara3(){
  const el = document.getElementById("sum_payanchana_with_sara")
  el.innerHTML = sum_decrease(blingWord)
}