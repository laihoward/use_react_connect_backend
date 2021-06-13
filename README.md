# Back-end use react and Front-end use flask to realize array visualization

使用react實作使用者介面，並且利用Python Flask進行後端網路開發，最後將前後端進行串聯。
可對array進行push(加入資料)、Clear(清除資料)和Sorting(排列資料)三種操作。
![](https://i.imgur.com/a1hHyU1.png)
排列後
![](https://i.imgur.com/EcUVLgO.png)
## 建立React
一開始先在命令列程式中輸入，專案資料夾名稱為backend_connect_frontend
```javascript=
npx create-react-app backend_connect_frontend
```
輸入以下的指令切換到backend_connect_frontend資料夾中，然後啟動網站伺服器
```javascript=
cd backend_connect_frontend
npm start
```
在index.js中會去呼叫App.js，因此會在App.js中編寫主要的程式。
![](https://i.imgur.com/l8uFQsS.png)
```javascript=
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## React架構
以下介紹如何在App.js中編寫主要程式
### React.Component
在 React 中，你可以將 component 定義成 class 。定義為 class 的 component 提供了多種功能，React.Component中一定要定義render()因為Component會接受名為 props的參數，並透過render()這個方法回傳一個有階層架構的view到螢幕上。
```javascript=
class App extends React.Component{
    render(){
        return 
    }
}
```
### constructor() 
在React.Component中宣告與初始化變數。
```javascript=
constructor(props){
    super(props);
    this.state={
      array:[], /*資料儲存容器*/
      inputValue:''/*輸入框內的資料*/
    }
    this.handleInputChange = this.handleInputChange.bind(this);/*讓函式能取用變數*/
}
```
### render()

render()為React中必要存在的生命週期函數，接受輸入的資料並回傳需要顯示的內容。只要預設的變數發生改變，render()會自動進行一次，因此建置網頁格式與外觀的內容就會寫在此函數中，並且使用[JSX語法](https://zh-hant.reactjs.org/docs/introducing-jsx.html)，傳入給元件的輸入資料可以透過 this.props存取。

### export default 
只需要回傳一個值時，使用export default。import後可直接讀取module供index.js使用。
```javascript=
export default App;
```
如果要回傳多個值，使用export。

## 建立網頁格式與外觀
在上述提到的render()中編寫網頁格式與外觀的內容，有關於頁面的設計的語法基本跟HTML的寫法相似。
### **標題**
![](https://i.imgur.com/Iz8KmX5.png)
```javascript=
<h1>array visualization</h1>
```
### **功能欄位**
![](https://i.imgur.com/vPdDgmc.png)
輸入欄位:使用Ant Design的表單元件Input
```javascript=
<Input className="inputData"/>
```
按鈕:3個按鈕分別負責push(加入資料)、Clear(清除資料)和Sorting(排列資料)
```javascript=
<button   
    className="pushBtn"
>Push</button>

<button 
    className="clearBtn"
>Clear</button>
            
<button 
    className="sortingBtn"
>Sorting</button>
```
### **資料視覺化**
![](https://i.imgur.com/0ys1TGZ.png)
使用map函數逐一將array中每個值對應的value和index傳給標籤Circlemade
```javascript=
let circleDiv = this.state.array.map((value,index)=><Circlemade
    key={index}  
    data={value}
/>)
```
在src資料夾中新增component資料夾，並在component資料夾中新增負責將array中資料視覺化的circle.js和circle.css。
![](https://i.imgur.com/eZNMpkY.png)
在circle.js中編寫標籤Circlemade的內容，標籤Circlemade將輸入的資料，以圓形視覺化呈現。
```javascript=
function Circlemade({data}) {
    return (
      <div className="circlemade" >{data}</div>
    )
  }
  export default Circlemade;
```
接著利用CSS Code讓標籤Circlemade的HTML文件裡data元素以下顯示。
![](https://i.imgur.com/2D362cb.png)

```css=
.circlemade {
    flex-direction:row;/*將資料以row方向排列 */
    background: black;
    margin-top:50px;
    margin:10px;
    width:35px;
    height:35px;
    color: aliceblue;
    border:2px solid #000;
    text-align:center;
    line-height:35px;
    border-radius:50%;
  }
```
## 重要工具
### setState 
state變數是read-only的，因此不能用this.state直接修改state中的變數。
```javascript=
/*錯誤示範*/
this.state.inputValue = 'Hello';
```
必須要透過React預寫好的函數setState()來進行更改。
```javascript=
/*正確示範*/
this.setState({inputValue: 'Hello'});
```
### arrow function
將函數寫法精簡化，以下範例
一般函數寫法:
```javascript=
function test(){
    console.log("Hello")
}
```
arrow function寫法:
```javascript=
var test = () => {
    console.log("Hello")
}
```
### async function
當 async function被呼叫時，它會回傳一個[Promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果該async function回傳了一個值，Promise的狀態將為一個帶有該回傳值的 resolved。如果async function拋出例外或某個值，Promise的狀態將為一個帶有被拋出值的rejected。

async function內部可以使用await表達式，它會暫停此async function的執行，並且等待傳遞至表達式的Promise的解析，解析完之後會回傳解析值，並繼續此async function的執行。
### Fetch API
提供JavaScript來操作 HTTP pipeline，可以發送request和接收response。
#### 發送request
輸入URI，從伺服器獲取JSON資料，fetch接收到的response是一個[Stream物件](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)，response.json()是一個非同步操作，取出所有內容，並將其轉為 JSON 物件。
```javascript=
fetch("http://localhost:5000/array")
    .then(response=>
      response.json()
          .then(data=>{
            let newarray = data.slice() ;
            this.setState({array:newarray})
          })
    )
```
#### 定製HTTP請求
為了要上傳JSON資料，需要定製HTTP請求，上述介紹fetch()的第一個參數為URI，以下介紹第二個參數為一個物件，包含HTTP請求的方法、標頭、資料...，以下以POST請求為例。
```javascript=
fetch("http://localhost:5000/add_array", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state.inputValue)
});
```
<font color=red>method</font>：HTTP請求的方法，包含POST、DELETE、PUT都在這個屬性設定。
<font color=red>headers</font>：一個物件，用來定製HTTP請求的標頭。
<font color=red>body</font>：POST請求的資料體。
### 在開發環境中代理API請求
在package.json中添加proxy字段
![](https://i.imgur.com/77EmPgt.png)
```javascript=
"proxy": "http://localhost:5000",
```
當你在開發中使用fetch('/array')時，開發服務器將識別出它不是靜態資源，並將你的請求代理到`http://localhost:5000/array`作為後備。
## 設計按鍵功能
### Input 輸入框 
取得輸入資料，Input輸入框內的資料會宣告為變數inputValue，當元素內容改變時就觸發onChange事件來執行函式handleInputChange
```htmlmixed=
<Input
    className="inputData"
    value = {this.state.inputValue}
    onChange={this.handleInputChange} 
/>
```
函式handleInputChange:運用setState將inputValue更改為Input輸入框內新的資料。
```javascript=
handleInputChange=(e)=>{
    this.setState({
      inputValue:e.target.value
    })
}
```
### Push Button:
當按下Push Button隨即觸發onClick事件來執行函式pushDataBtn，將輸入的資料傳入array中。
```htmlmixed=
<button   
    className="pushBtn"
    onClick={()=>this.pushDataBtn()}
>Push
</button>
```
將新增的inputValue以JSON型態提交到`http://localhost:5000/add_array`，並發送request到`http://localhost:5000/array`取得更新過後的array，並使用setState更改array。
```javascript=
pushDataBtn=async()=>{
    const response =await fetch("/add_array", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state.inputValue)
    });
    if (response.ok) {
      console.log("response worked!");
      this.setState({inputValue:''})
    }
    fetch("/array").then(response=>
      response.json().then(data=>{
        let newarray = data.slice();
        this.setState({array:newarray})
      }))
  }
```
### Clear Button:
當按下Clear Button隨即觸發onClick事件來執行函式clearDataBtn，清空array中的資料。
```htmlmixed=
<button 
    className="clearBtn"
    onClick={()=>this.clearDataBtn()}
>Clear
</button>
```
將array以JSON型態提交到`http://localhost:5000/clear_array`，並發送request到`http://localhost:5000/array`取得清空的array，並使用setState更改array。
```javascript=
 clearDataBtn=async()=>{
    const response =await fetch("/clear_array", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state.array)
    });
    if (response.ok) {
      console.log("response worked!");
      this.setState({inputValue:''})
    }
    fetch("/array").then(response=>
      response.json().then(data=>{
        let newarray = data.slice() ;
        this.setState({array:newarray})
      }))
  }
```
### sorting Button:
當按下sorting 隨即觸發onClick事件來執行函式sortDataBtn，由小到大排列array中的資料。
```htmlmixed=
<button 
    className="sortingBtn"
    onClick={()=>this.sortDataBtn()}
>Sorting
</button>
```
將array以JSON型態提交到`http://localhost:5000/sort_array`，並發送request到`http://localhost:5000/array`取得排列後的array，並使用setState更改array。
```javascript=
 sortDataBtn=()=>{
    const response = fetch("/sort_array", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state.array)
    });
    if (response.ok) {
      console.log("response worked!");
      this.setState({inputValue:''})
    }
    fetch("/array").then(response=>
      response.json().then(data=>{
        let newarray = data.slice() ;
        this.setState({array:newarray})
      }))
  }
```
## Flask前端架設

### 製作API

