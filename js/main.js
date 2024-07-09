const addNoteForm = document.querySelector('#addNoteForm');
const noteTextInput = document.querySelector('#noteTextInput');
const noteTitleInput = document.querySelector('#noteTitleInput')
const CardWrapper = document.querySelector('#CardWrapper')


const formStarter = document.querySelector('.form__start');
const formContent = document.querySelector('.form__content')
const fromTitle = document.querySelector('.form__title')
const fromText = document.querySelector('.form__text')




let notes = [];
// localStorage

if (localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'));
}


formStarter.onclick = () =>{
    formStarter.hidden = 'true';
    formContent.removeAttribute('hidden');
    fromTitle.focus();


    fromTitle.addEventListener('keydown', (e)=>{
         if (e.key === 'Enter'){
            e.preventDefault();
            fromText.focus();
            fromText.innerText = '';
         }
    })
}


// отправка формы 
addNoteForm.addEventListener('submit', (event) =>{

    // делаем форму стандартной 
    event.preventDefault();

    let id = 1; 
    if(notes.length > 0){
        id = notes[notes.length - 1]['id'] +1;
    }
    // добавляем текст заметки в  массив notes
    notes.push({
        id: id,
        title: noteTitleInput.value,
        text: noteTextInput.innerHTML,
    })

    localStorage.setItem('notes',JSON.stringify(notes));

    // Убираем текст с inputa 
    addNoteForm.reset();
    noteTextInput.innerHTML = '';

    // Обращаемся к последнему элементу массива 
    const lastNote = notes[notes.length - 1];
    const outputHtml = `<section class="card ">
                    <div class="card-body">
                        <h5 class="card-title">${lastNote.title}</h5>
                        <p class="card-text">${lastNote.text}</p>
                        <button data-action="delete" data-id=${lastNote.id} class="btn btn-dark btn-sm">Удалить</button>
                    </div>
                </section>`;

CardWrapper.insertAdjacentHTML('afterbegin',outputHtml)
})


// выводим массива на страницу
notes.forEach((item, index)=>{

    const outputHtml = `<section class="card ">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.text}</p>
                        <button data-action="delete" data-id=${item.id} class="btn btn-dark btn-sm">Удалить</button>
                    </div>
                </section>`;
                
    CardWrapper.insertAdjacentHTML('beforeend',outputHtml)
})

// удаление задачи
document.addEventListener('click',(event)=>{
    if(event.target.dataset.action === 'delete'){
        const id = event.target.dataset.id;
       const index= notes.findIndex((item)=>{
            return item.id == id;
        });
        notes.splice(index, 1);
        localStorage.setItem('notes',JSON.stringify(notes));
        event.target.closest('.card').remove();
    }
})
