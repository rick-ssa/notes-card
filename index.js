function note (id,text,color) {
    this.id = id
    this.text = text
    this.color = color
}

const notes = []

const changeColor = el => {
    el.style.backgroundColor = el.value
    if(el.value==='yellow'){
        el.style.color='black'   
    } else {
        el.style.color='white'
    }
}

function createNote(n){
    let container = document.getElementById('note-container')
    let note = document.createElement('div')
    let body = document.createElement('div')
    let footer = document.createElement('div')
    let edit = document.createElement('a')
    let del = document.createElement('a')
    let text = document.createTextNode(n.text)
    let txtEdit = document.createTextNode('Edit')
    let txtDel = document.createTextNode('Delete')
    
    note.classList.add('note')
    body.classList.add('body')
    footer.classList.add('footer')
    del.classList.add('delLink')
    
    edit.appendChild(txtEdit)
    del.appendChild(txtDel)
    footer.appendChild(edit)
    footer.appendChild(del)
    body.appendChild(text)
    note.appendChild(body)
    note.appendChild(footer)
    container.appendChild(note)

    edit.href = 'javascript:edit(' + n.id + ')'
    del.href = 'javascript:del(' + n.id + ')'
    
    note.style.backgroundColor = n.color
    footer.style.backgroundColor = n.color
    note.id = 'note - ' + n.id
}

function add(){
    var text = prompt('type the message')
    if(text) {
        var color = document.getElementById('inColors').value
        var n = new note(notes.length,text,color)
        notes.push(n)
        createNote(n)
    }
}

function render(n) {
    clear()
    n = n.map((v,i)=>{
        v.id = i
        return v
    })
    for(let i=0;i<n.length;i++){
        createNote(n[i])
    }
}

function clear() {
    let totalElements = document.getElementsByClassName('note').length
    let container = document.getElementById('note-container')
    for (let i=0; i<totalElements; i++) {
        container.removeChild(document.getElementById('note - ' + i))
    }
}

function edit(id) {
    text = prompt("Edit the text, to edit the color change it in the select color before hit edit link:",
    notes[id].text)
    let note = document.getElementById('note - ' + id)
    let footer = note.getElementsByClassName('footer')[0]
    if(text){
        notes[id].text = text
        note.getElementsByClassName('body')[0].innerHTML = text
        note.style.backgroundColor = notes[id].color   
        footer.style.backgroundColor=notes[id].color
    }
    notes[id].color = document.getElementById('inColors').value
    
}

function del(id) {
    notes.splice(id,1)
    render(notes)
}