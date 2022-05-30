// User

class User {
    #data = {};

    constructor(obj) {
        this.#data = obj;
    }

    edit(obj) {
        if (Array.isArray(obj) || typeof obj != 'object') return 'Введены неверные данные';

        this.#data = { ...this.#data, ...obj };
    }

    get() {
        return this.#data;
    }
}


// Contacts
class Contacts {
    #data = [];
    #lastId = 0;

    add(contactUser) {
        this.#lastId++;

        contactUser = { ...contactUser, ...{ id: this.#lastId } }

        const newContactuser = new User(contactUser)

        if (!newContactuser.get) return;

        this.#data.push(newContactuser);
    }

    edit(id = 0, obj = {}) {
        let contact = this.get(id);

        if (!contact) return;

        contact.edit(obj);
    }

    get(id = 0, showData = false) {
        if (id > 0) {
            let contact = this.#data.find(elem => {
                return elem.get().id == id;
            });

            if (contact) {
                if (showData) return contact.get();
                return contact;
            } else {
                return;
            }
        } else{
            if(showData) {
                let dataTmp = this.#data.map(elem =>{
                    return elem.get();
                });

               if (dataTmp && dataTmp.length > 0){
                   return dataTmp;
               }
        }
    }
        return this.#data;
    }

    remove(id = 0) {
        if (!id) return;

        let dataTmp = this.#data.filter(elem => {
            return elem.get().id != id;
        });

        this.#data = dataTmp;

    }
}

class ContactsApp extends Contacts {
    constructor() {
        super();
    }

    #app;

    update(){
        const data = this.get(0, true);
        
        this.appUl.innerHTML = '';

        data.forEach ((item) => {
            const liElem = document.createElement('li');
            liElem.classList.add('contacts__item');

            const nameElem = document.createElement('h2');
            nameElem.classList.add('list__name');
            nameElem.setAttribute('contenteditable', 'true')


            const emailElem = document.createElement('div');
            emailElem.classList.add('list__email');
            emailElem.setAttribute('contenteditable', 'true')

            const addressElem = document.createElement('div');
            addressElem.classList.add('list__address');
            addressElem.setAttribute('contenteditable', 'true')

            const phoneElem = document.createElement('div');
            phoneElem.classList.add('list__phone');
            phoneElem.setAttribute('contenteditable', 'true')

            const btnDelElem = document.createElement('button');
            btnDelElem.classList.add('list__btn-del');
            btnDelElem.innerHTML = 'Delete';


            if(item.name && item.name.length > 0){
                nameElem.innerHTML = item.name;
                liElem.append(nameElem);
            }

            if(item.email && item.email.length > 0){
                emailElem.innerHTML = item.email;
                liElem.append(emailElem);
            }

            if(item.address && item.address.length > 0){
                addressElem.innerHTML = item.address;
                liElem.append(addressElem);
            }

            if(item.phone && item.phone.length > 0){
                phoneElem.innerHTML = item.phone;
                liElem.append(phoneElem);
            }

            liElem.append(btnDelElem);

            this.appUl.append(liElem);

            btnDelElem.addEventListener('click',() => {
                this.onDel(item.id);
            })
        })  
    }

    onDel(id){
        this.remove(id);
        this.update();
    }

     create (idElem) {

        if (!idElem) return;
        
        const appElem = document.querySelector(`#${idElem}`);
        console.log(appElem)
        
        if (!appElem) return;

        this.#app = document.createElement('div')
        this.#app.classList.add('contacts');

        this.appForm = document.createElement('form');
        this.appForm.classList.add('contacts__form');

        this.inputName = document.createElement('input');
        this.inputName.classList.add('contacts__name');
        this.inputName.placeholder = 'Name';

        this.inputEmail = document.createElement('input');
        this.inputEmail.classList.add('contacts__email');
        this.inputEmail.placeholder = 'Email';

        this.inputAddress = document.createElement('input');
        this.inputAddress.classList.add('contacts__address');
        this.inputAddress.placeholder = 'Address';

        this.inputPhone = document.createElement('input');
        this.inputPhone.classList.add('contacts__phone');
        this.inputPhone.placeholder = 'Phone';

        this.formButton = document.createElement('button');
        this.formButton.classList.add('contacts__button');
        this.formButton.innerHTML = 'Add contact'

        this.appUl = document.createElement('ul');
        this.appUl.classList.add('contacts__list', 'list');

        this.#app.append(this.appForm,this.formButton, this.appUl);
        this.appForm.append(this.inputName, this.inputEmail, this.inputAddress, this.inputPhone);
        appElem.append(this.#app);

        this.formButton.addEventListener('click', this.onAdd = () => {
            
            let contactData = {};

            if(this.inputName.value.length == 0){ return alert('Введите имя');
            }else{
                contactData.name = this.inputName.value;
            }
               
            if(this.inputEmail.value.length > 0){
                contactData.email = this.inputEmail.value;
            }
    
            if(this.inputAddress.value.length > 0){
                contactData.address = this.inputAddress.value;
            }
            if(this.inputPhone.value.length > 0){
                contactData.phone = this.inputPhone.value;
            }

            this.inputName.value = '';
            this.inputEmail.value = '';
            this.inputAddress.value = '';
            this.inputPhone.value = '';   

            this.add(contactData);
            
            this.update();
    
        })
    };
}

let contactsApp = new ContactsApp();
contactsApp.create('app');
