//var letters = ""; //"emdbhir"; //pekirti
let combi = [];
let uncheckedList = [];
let final = [];
let arr = [];
let uniqueChars = [];
async function getPosibleWords(letters){
  var tree = function (leafs) {
    var branches = [];
    if (leafs.length == 1) return leafs;
    for (var k in leafs) {
      var leaf = leafs[k];
      tree(leafs.join('').replace(leaf, '').split('')).concat("").map(function (subtree) {
        branches.push([leaf].concat(subtree));
      });
    }
    return branches;
  };
  combi = tree(letters.split('')).map(function (str) {
    return str.join('')
  })
}

async function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200) {
        var allText = rawFile.responseText;
        lines = rawFile.responseText.split("\n");
        arr.push(lines)
      }
    }
  }
  rawFile.send(null);
}

async function checklistofwords() {
  for (let b = 0; b < combi.length; b++) {
    if (arr[0].includes(combi[b])) {
      uncheckedList.push(combi[b])
    }
  }
}

async function removedup(){
  uncheckedList.forEach((element) => {
      if (!uniqueChars.includes(element)) {
          uniqueChars.push(element);
      }
  });
}

async function sortList(){
  final = uniqueChars.sort((a, b) => a.length - b.length);
}

function printonsite() {
  for (let pos = 0; pos < final.length; pos++) {
    const para = document.createElement("p");
    const node = document.createTextNode(final[pos]);
    para.appendChild(node);
    document.getElementById("demo").appendChild(para);
  }
}

async function runall() {
  var letters = document.getElementById("myText").value;
  if(letters !== ""){
    // console.log("running everything now...please wait");
    // document.getElementById("demo").innerHTML = "running everything now...please wait"
    await getPosibleWords(letters)
    await readTextFile("./text.txt");
    await checklistofwords();
    await removedup()
    await sortList();
    printonsite()
    console.log(final);
    console.log("dooone");
  }else{
    console.log("didnt do anything");
    document.getElementById("demo").innerHTML = "cant get words, please enter up to 7 letters"
  }

}

//things to do 
// add so user can enter letters by them self like a html text area...............working
// make the print out better .. preferebely in a col but a grid maybe works too...working
// css can be added too for a bit nicer looking site..............................not working