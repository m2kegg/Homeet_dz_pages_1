let flagName = false;
let flagSex = false;
let flagDate = false;
let flagTg = false;
let flagPhone = false;
let flagAbout = false;

// ща будем проверять инпуты
let input_name_surname = document.getElementById("name_surname");
input_name_surname.addEventListener('input', function(e) {
    let k = validateNameSurname(e.target);
    if(k){
        let name_surname_card = document.getElementById('p_name_data');
        let name_surname_text = document.createElement('p');
        name_surname_text.id = 'p_name_data';
        name_surname_text.textContent = e.target.value;
        name_surname_text.style.color = '#040013';
        name_surname_text.style.fontFamily = 'Museo Sans Cyrl';
        name_surname_text.style.fontSize = '18px';
        name_surname_text.style.fontWeight = '600';
        name_surname_text.style.lineHeight = '22px';
        name_surname_card.replaceWith(name_surname_text);
    }
});

function validateNameSurname(input) {
    const regex = /^[A-Za-zА-Яа-я\s\-']*$/;
    const newLocal = `label[for="${input.id}"]`;
    let label = document.querySelector(newLocal);

    if (!regex.test(input.value)) {
        input.classList.add('error');
        label.textContent = "Ошибка: введите только буквы";
        label.style.color = 'red';
        flagName = false;
        return false;
    } else {
        input.classList.remove('error');
        label.textContent = "Имя и фамилия";
        label.style.color = '#5D5B66';
        flagName = true;
        return true;
    }
}

let input_sex1 = document.getElementById("sex1");
let input_sex2 = document.getElementById("sex2");
input_sex1.addEventListener('input', function(e){
    flagSex = true;
    
});
input_sex2.addEventListener('input', function(e){
    flagSex = true;
});

let input_date = document.getElementById("input_tgm");
input_date.addEventListener('input', function(e){
    const regdate = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    if (regdate.test(e.target.value)){
        flagDate = true;
    }
    else{
        flagDate = false;
    }

});



let input_tg = document.getElementById("tg");
input_tg.addEventListener('input', function(e){
    const regtg = /^(@[A-Za-z0-9]*)?$/;
    let labeltg = document.querySelector(`label[for="${e.target.id}"]`);
    if (!regtg.test(e.target.value)){
        flagTg = false;
        e.target.classList.add('error');
        labeltg.textContent = "Ошибка: неверный формат tg (начинать с @)";
        labeltg.style.color = 'red';
    }
    else{
        e.target.classList.remove('error');
        labeltg.textContent = "Телеграм";
        labeltg.style.color ='#5D5B66';
        flagTg = true;
    }
});

// теперь сделаю маску

let input_phone = document.getElementById("number");
input_phone.addEventListener('input', function(e){
    let cursorPosition = e.target.selectionStart;
    let oldValueLength = e.target.value.length;  

    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    
    e.target.value = (x[1] ? '+' : '') + (x[1] ? x[1] + ' ' : '') + 
                     (x[2] ? '(' + x[2] + ')' : '') + 
                     (x[3] ? ' ' + x[3] : '') + 
                     (x[4] ? '-' + x[4] : '') + 
                     (x[5] ? '-' + x[5] : '');
    
    if (e.inputType === "deleteContentBackward") {
        if (e.target.value[cursorPosition - 1] === ' ' || e.target.value[cursorPosition - 1] === '-' || e.target.value[cursorPosition - 1] === '(' || e.target.value[cursorPosition - 1] === ')') {
            cursorPosition--;
        }
        e.target.setSelectionRange(cursorPosition, cursorPosition);
    } else if (e.inputType === "insertText") {
        let diff = e.target.value.length - oldValueLength;
        cursorPosition += diff;
        e.target.setSelectionRange(cursorPosition, cursorPosition);
    }
    validatePhone(e.target);
});

function validatePhone(input) {
    const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    let label = document.querySelector(`label[for="${input.id}"]`)
    if (!regex.test(input.value)) {
        if (input.value != ''){
            input.classList.add('error');
            label.textContent = "Ошибка: введите нормально номер!";
            label.style.color = 'red';
            flagPhone = false;
    
        }else{
            input.classList.add('error');
            label.textContent = "Ошибка: заполните поле!";
            label.style.color = 'red';
            flagPhone = false;
        }
    } else {
        input.classList.remove('error');
        label.textContent = "Номер телефона";
        label.style.color = '#5D5B66';
        flagPhone = true;
    }
}

// по идее маска работает. нужны тесты

// текст о себе не вижу смысла проверять.



