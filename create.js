function addActivity(){
    const addButton=document.getElementById("add-activity");
    addButton.remove();
    const node=document.createElement("textarea");
    const textnode = document.createTextNode("");
    node.appendChild(textnode);
    document.getElementById("box-activities").appendChild(node);
    document.getElementById("box-activities").appendChild(addButton);
}