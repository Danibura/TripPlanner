function setData(){
    var code=Math.random()*100000000;
    code=parseInt(code);
    document.getElementById("code-area").innerHTML=code;
}

function addActivity(){
    const addButton=document.getElementById("add-activity");
    addButton.remove();
    const node=document.createElement("textarea");
    const textnode = document.createTextNode("");
    node.appendChild(textnode);
    node.style.backgroundColor="#ffffff";
    node.style.borderRadius="10px";
    node.style.padding="10px";
    node.style.width="90%";
    node.style.marginBottom="15px";
    document.getElementById("box-activities").appendChild(node);
    document.getElementById("box-activities").appendChild(addButton);
}

