const augkarani={
  pintu:'\u0E3A',
  yamaga:'\u0E4E',
  hanargasa:'\u0E31',
  value:[],
  group:[],
  th_read:[],
  oneVoice:["กฺกฺ","กฺขฺ","คฺคฺ","คฺฆฺ","งฺกฺ","งฺขฺ",
  "งฺคฺ","งฺฆฺ","งฺยฺ","งฺลฺ","จฺจฺ","จฺฉฺ",
  "ชฺชฺ","ชฺฌฺ","ญฺจฺ","ญฺฉฺ","ญฺชฺ","ญฺฌฺ",
  "ญฺญฺ","ฏฺฏฺ","ฏฺฐฺ","ฑฺฑฺ","ฑฺฒฺ","ฒฺฒฺ",
  "ณฺฏฺ","ณฺฐฺ","ณฺฑฺ","ณฺณฺ","ตฺตฺ","ตฺถฺ",
  "ทฺทฺ","ทฺธฺ","นฺตฺ","นฺถฺ","นฺทฺ","นฺธฺ",
  "นฺนฺ","ปฺปฺ","ปฺผฺ","พฺพฺ","พฺภฺ","ภฺยฺ",
  "มฺปฺ","มฺผฺ","มฺพฺ","มฺภฺ","มฺมฺ","ยฺยฺ",
  "ลฺลฺ", "สฺสฺ","หฺมฺ"],
  twoVoice:["กฺยฺ","กฺรฺ","กฺลฺ","กฺวฺ","ขฺยฺ","ขฺวฺ",
  "คฺยฺ","คฺรฺ","จฺยฺ","ญฺหฺ","ฏฺยฺ","ณฺยฺ",
  "ณฺหฺ","ตฺนฺ","ตฺยฺ","ตฺรฺ","ตฺวฺ","ถฺยฺ",
  "ทฺมฺ","ทฺรฺ","ทฺวฺ","ธฺยฺ","ธฺวฺ","นฺยฺ",
  "นฺวฺ","นฺหฺ","ปฺทฺ","ปฺยฺ","ปฺลฺ","พฺยฺ",
  "พฺรฺ","มฺยฺ","มฺหฺ","ยฺวฺ","ยฺหฺ","ลฺยฺ",
  "ลฺวฺ","ลฺหฺ","วฺยฺ","วฺหฺ","สฺตฺ","สฺนฺ",
  "สฺมฺ","สฺยฺ","สฺลฺ","สฺวฺ","หฺวฺ",
  "ฬฺหฺ"],
  isRassa:function(ch){return ["อ","อิ","อุ"].includes(ch)},
  isSara:function(ch){return ["อ","อา","อิ","อี","อุ","อู","เอ","โอ"].includes(ch)},
  isPayanchana:function(ch){
    return [
      "กฺ","ขฺ","คฺ","ฆฺ","งฺ",
      "จฺ","ฉฺ","ชฺ","ฌฺ","ญฺ",
      "ฏฺ","ฐฺ","ฑฺ","ฒฺ","ณฺ",
      "ตฺ","ถฺ","ธฺ","ทฺ","นฺ",
      "ปฺ","ผฺ","พฺ","ภฺ","มฺ",
      "ยฺ","รฺ","ลฺ","วฺ","สฺ","หฺ","ฬฺ"].includes(ch)
  },
  isNiccahit:function(ch){return (ch=="อํ")},
  isAugkara:function(ch){return (this.isSara(ch) || this.isPayanchana(ch) || this.isNiccahit(ch))},
  isYRLWH:function(ch){return (['ย','ร','ล','ว','ห'].includes(ch[2]) && ch!="รฺรฺ" && ch!="วฺวฺ" && ch!="หฺหฺ")},
  isOneVoiceSanyoko:function(ch){
    return this.oneVoice.includes(ch)
  },
  isTwoVoiceSanyoko:function(ch){
    return (this.twoVoice.includes(ch) || this.isYRLWH(ch))
  },
  err_pali:function(ch){
    if (this.isAugkara(ch)) return {state:false,message:''}
    else return {state:true,message:'มีอักขระที่ไม่รู้จัก'}
  },
  err_HM:function(front, after){return {state:(front=='พฺรฺ' && after == 'หฺมฺ'),message:"การใช้ พฺรฺ-หฺมฺ"}},
  err_triple:function(ch){
    if (ch.length>4) return {state:true,message:"ซ็อนเกินสอง"}
    else return {false:true,message:null}
  },
  err_niccahit:function(before_niccahit){
    if (this.isRassa(before_niccahit)) return {state:false,message:null}
    else return {state:true,message:'อํ วางหลัง อ อิ หรือ อุ เท่านั้น'}
  },
  err_sanyoko:function(ch){ 
    // ณฺฒฺ ไม่มีใช้เลย  หฺมฺ ตอนเป็นตัวสะกดออก 2 เสียง ตอนนำออกเสียงเดียว เลยจัดกลุ่มไม่ได้ เช็คเป้นพิเศษ
    if (!this.isOneVoiceSanyoko(ch) && !this.isYRLWH(ch) && (ch!='ณฺฒฺ') && (ch!='หฺมฺ')){  
      return {state:true,message:this.get_possible_sanyoko(ch[0])}
    }else{
      return {state:false,message:null} 
    }
  },
  get_possible_sanyoko:function(front){
    // เลือกตอบเราจึงเลือกที่มีใช้เอามาจากทั้ง 2 ที่
    let syk = []
    this.oneVoice.forEach(ww=>{
      if (front==ww[0]) syk.push(ww)
    })
    this.twoVoice.forEach(ww=>{
      if (front==ww[0]) syk.push(ww)
    })
    if (syk.length>0 && front=='ง') return `การใช้ ${front+this.pintu} ต้องซ้อนเสมอ มีอุทาหรณ์ว่า ${syk.join(', ')}`
    else if (syk.length>0) return `การใช้ ${front+this.pintu} สัญโญโค มีอุทาหรณ์ว่า ${syk.join(', ')}`
    else return `การใช้ ${front+this.pintu} สัญโญโค ไม่มี `
  },
  get_th_read:function(){
    // ตรวจว่ามีเฉพาะบาลีเท่านั้น
    let augkarani=this.value
    let l = augkarani.length
    display_augkara_input(augkarani.join(''))
    let error
    
    for(let i=0;i<l;i++){
      error=this.err_pali(augkarani[i])
      if (error.state){
        display_thai_read_result("อ่าน-ไม่-ออก")
        display_thai_read_error(error.message)
        return
      }
    }

    
    for(let i=0;i<l;i++){
      let w=augkarani
      if (l-i>=3 && this.isPayanchana(w[i]) && this.isPayanchana(w[i+1]) && this.isPayanchana(w[i+2])) {
        display_thai_read_result("อ่าน-ไม่-ออก")
        display_thai_read_error(`${w[i]+w[i+1]+w[i+2]} ซ้อนเกินสอง`)
        return
      }
    }

    for(let i=0;i<l;i++){
      let w=augkarani[i]
      if (this.isNiccahit(w)) {
        if (i==0) {
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error(`นิคคหิต จะไม่อยู่ตามลำพัง`)
          return
        }
        if (!this.isRassa(augkarani[i-1])){
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error(`นิคคหิต จะวางหลัง อ อิ หรือ อุ เท่านั้น`)
          return
        }
      }
    }
    // เช็ค หฺมฺ  ก่อน เพราะเดี๋ยวไปเจอ กล้ำ
    let w=augkarani
    for(let i=0;i<l-1;i++){
      if (w[i]+w[i+1]=='หฺมฺ'){
        if (i-3>=0){
          if(w[i-3]+w[i-2]!='พฺรฺ'){
            display_thai_read_result("อ่าน-ไม่-ออก")
            display_thai_read_error('หฺมฺ ใช้คู่กับ พฺรฺ-หฺมฺ')
            return
          }
        }else{
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error('หฺมฺ ใช้คู่กับ พฺรฺ-หฺมฺ')
          return
        }
      } 
    }

    //  เช็ค สัญโญค
    for(let i=0;i<l-1;i++){
      let w1=augkarani[i]
      let w2=augkarani[i+1]

      if(this.isPayanchana(w1) && this.isPayanchana(w2)) {
        let wx = w1+w2
        error = this.err_sanyoko(wx)  // ส่ง 2 ตัวติดกัน
        if(error.state){
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error(error.message)
          return
        }
      }
    }

    
    //  เช็ค เสียงแรก
    if (l>1){
      let w1=augkarani[0]
      let w2=augkarani[1]
      if(this.isPayanchana(w1) && this.isPayanchana(w2)) {
        if (!this.isTwoVoiceSanyoko(w1+w2)){
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error(`${w1+w2} มีเสียงไม่กล้ำ เสียงแรกถ้าซ้อนต้องกล้ำ`)
          return
        }
      }
    }
    //  เช็ค ง สังโญค
    for(let i=0;i<l;i++){
      let w=augkarani[i]
      if (w=='งฺ') {
        if (i==0) {
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error(`งฺ ต้องวางหลังสระ`)
          return
        }else{
          if (!this.isSara(augkarani[i-1])){
            display_thai_read_result("อ่าน-ไม่-ออก")
            display_thai_read_error(`งฺ ต้องวางหลังสระ`)
            return
          }else if(l-i>=2) {
            if (this.isSara(augkarani[i+1])){
              display_thai_read_result("อ่าน-ไม่-ออก")
              display_thai_read_error(this.get_possible_sanyoko('ง'))
            }
          }
        }
      }
    }
    // เช็คว่ามี สระ หรือไม่ 
    for(let i=0;i<l-1;i++){
      let w1=augkarani[i]
      let w2=augkarani[i+1]

      if(this.isPayanchana(w1) && this.isPayanchana(w2)){
        if(l-i>=2 && !this.isSara(augkarani[i+2])){
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error(`${w1+w2} ต้องวางหน้าสระ`)
          return
        }else if(l-i==1){
          display_thai_read_result("อ่าน-ไม่-ออก")
          display_thai_read_error(`${w1+w2} ต้องวางหน้าสระ`)
          return
        }
      }
    }
    if (this.isPayanchana(augkarani[l-1])) {
      display_thai_read_result("อ่าน-ไม่-ออก")
      display_thai_read_error(`${augkarani[l-1]} ต้องวางหน้าสระ`)
      return
    }

    // แบ่งเป็นพยางค์    
    this.th_read=[]
    let pyc=[]  // payanchanani
    let payang = ''
    w = w.concat(["โอ","โอ"])
    for(let i=0;i<l;i++){
      console.log('i  payang ก่อน เจอ สระ pyc.length', i, payang, pyc.length);
      if (this.isSara(w[i])){
        // ------------ พยัญชนะ -----------------------------
        payang=''
        if (pyc.length==2){
          if(this.isTwoVoiceSanyoko(pyc.join(''))){
            payang+=pyc[0][0]+this.yamaga+pyc[1][0]
          }
        }else if(pyc.length==1){
          payang+=pyc[0][0]
          console.log('i  payang ก่อน เจอ สระ', i, payang);

        }
        // --------------สระ และ ตัวสะกด ถ้ามีตัวสะกด เลื่อน i ให้ -----------------------------
        if (this.isNiccahit(w[i+1])){
          if (payang=='') payang='อ'
          if (w[i]=='อ') this.th_read.push(payang+this.hanargasa+'ง')
          else this.th_read.push(payang+w[i][1]+this.hanargasa+'ง')
          pyc=[]
          i++
        }
        else if(w[i+1]+w[i+2]=="หฺมฺ"){
          // มันถูกมาหมดแล้ว เพราะตรวจไว้แล้ว หฺมฺ  
          if (w[i]=='อ') this.th_read.push('พ๎รัห๎ม')
          if (w[i]=='อา') this.th_read.push('พ๎ราห๎ม')
          pyc=[]
          i++
        }
        else if(!this.isSara(w[i+1])&&!this.isSara(w[i+2])){// เป็นสังโยคที่เลื่อน กับไม่เลื่อน
          if (payang=='') payang='อ'  // ไม่มีอักขระนำ
          if (w[i]== "อ") this.th_read.push(payang+this.hanargasa+w[i+1][0])  // สระ อ
          else if (w[i][0]=="อ") this.th_read.push(payang+w[i][1]+w[i+1][0])  // สระ อา อิ อี อุ อู เอ โอ
          else this.th_read.push(w[i][0]+payang+w[i+1][0]) // สระ เอ โอ
          pyc=[]
          let ww=w[i+1]+w[i+2]
          console.log('i, ww',i, ww);
          if(!this.isTwoVoiceSanyoko(ww)) i++  // เสียงเดืยว เลื่อน
          console.log('i, ww',i, ww);
        
        }else if(this.isSara(w[i+1]) || this.isSara(w[i+2])){ // ไม่มีสังโยค
          if (payang=='') payang='อ'  // ไม่มีอักขระนำ
          if (w[i]== "อ") this.th_read.push(payang+'ะ')  // สระ อ
          else if (w[i][0]=="อ") this.th_read.push(payang+w[i][1])  // สระ อา อิ อี อุ อู เอ โอ
          else this.th_read.push(w[i][0]+payang) // สระ เอ โอ
          pyc=[]
        }
      }else{
        pyc.push(w[i])

        console.log('i เก็บ w[i],pyc.length ', i, w[i], pyc.length);
      }
    }
    display_thai_read_result(this.th_read.join('-'))
    display_thai_read_error(`ถูกต้อง`)
  }

}