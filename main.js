//inisialisasi variable yang dibutuhkan
let todo = []
let rr = "key"
let arr = []

//ambil komponen berdasarkan ID
const getItem = document.getElementById('item')
const getItem2 = document.getElementById('item-kedua')
const getItemPencarian = document.getElementById('hasil-pencarian')

//buat variable untuk custom event
const RENDER_EVENT = 'render-todo';
const RENDER_PENCARIAN = 'render-PENCARIAN';

//generate ID
let generateID = ()=> {
     return Date.now();
}

//buat Objek data buku
let dataBuku = (judul,penulis,tahun, isComplete=false)=>{
    return {
        id: generateID(),
        judul,
        penulis,
        tahun,
        isComplete
    }

}

// Fungsi Buat Todo
let makeTodo = ()=>{

    const judul  = document.getElementById('judul-buku').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;
    const ceklis = document.getElementById('jenis-bacaan').checked

    todo.unshift(dataBuku(judul,penulis,tahun,ceklis));

    //simpan data todo dalam local storage
    localStorage.setItem('rr', JSON.stringify(todo));
    document.dispatchEvent(new Event(RENDER_EVENT));
   
}


//temukan index
let findTodoIndex = (todoId)=>{
    return todo.findIndex((e)=>{
        return e.id===todoId
    })
    
}

// pencarian 
let pencarianBuku = ()=> {
    const judulnya  = document.getElementById('cari-buku').value;
    //temukan nilai inputan dengan data dari objek dalam local storagfe
    return todo.find((e)=> {
      return e.judul === judulnya
      
    })

}

let getPencarian = () => {
    
    const ambilButton = document.getElementById('btn-cari')
    return ambilButton.addEventListener('click', ()=>{
    getItemPencarian.innerHTML=" ";

    const ambilIndeks = pencarianBuku()
    const {id, judul, penulis, tahun, isComplete} = ambilIndeks;
    const containerItem = document.createElement('div')
    containerItem.classList.add('container-item')

    const makeKumpulanBuku = document.createElement('div')
    makeKumpulanBuku.classList.add('judul-buku')

    const dataJudul = document.createElement('h4')
    dataJudul.innerText = judul;
    const dataPenulis = document.createElement('p')
    dataPenulis.innerText ='Penulis : '+penulis;
    const dataTahun = document.createElement('p')
    dataTahun.innerText ='Tahun : '+tahun;
    
    //buat data buku
    makeKumpulanBuku.append(dataJudul,dataPenulis,dataTahun);


    const selesai = document.createElement('button')
    isComplete===true?selesai.innerText='Belum Selesai Baca':selesai.innerText='Selesai Baca'
    selesai.classList.add('selesai')
    
    const hapus = document.createElement('button')
    hapus.innerText='Hapus Buku'
    hapus.classList.add('hapus')

    //buat aksi dari data buku
    const makeAksi = document.createElement('div')
    makeAksi.classList.add('aksi')
    makeAksi.append(selesai,hapus)
    
    //tampilkan data buku
    containerItem.append(makeKumpulanBuku,makeAksi)
    getItemPencarian.append(containerItem);

    //aksi hapus data buku
    hapus.addEventListener('click', function () {
      let getLocalStorage = JSON.parse(localStorage.getItem('rr'))
      const todoTarget = findTodoIndex(id);
      if (getLocalStorage[todoTarget].id==id) {
          window.confirm('Yakin Hapus ?')?getLocalStorage.splice(todoTarget,1):getLocalStorage.splice();
          getItemPencarian.innerHTML="";
    }
      
      localStorage.setItem('rr', JSON.stringify(getLocalStorage));
      document.dispatchEvent(new Event(RENDER_EVENT));
      render()

  });
      
    selesai.addEventListener('click', ()=>{
      //ambil data dari localstorage
      let userData = JSON.parse(localStorage.getItem('rr'));
      const todoTarget = findTodoIndex(id);

      if(userData[todoTarget].id==id) {
        if (userData[todoTarget].isComplete==false) {
            selesai.innerText='Belum Selesai Baca'
            getItem2.append(containerItem)
            userData[todoTarget].isComplete=true;
            
            localStorage.setItem('rr', JSON.stringify(userData));
            JSON.parse(localStorage.getItem('rr'));
            getItemPencarian.innerHTML="";
      }
      
        else {
            selesai.innerText='Selesai Baca'
            getItem.append(containerItem)
            userData[todoTarget].isComplete=false;

            localStorage.setItem('rr', JSON.stringify(userData));
            getItemPencarian.innerHTML="";
      }
      //refresh page
      render()  
    }
      else{
        console.log('ID tidak ditemukan')
      }
     } )
}
   )
};
  
   
   




//hapus item dalam array todo
let deleteTodo = (todoId)=>{
    const todoTarget = findTodoIndex(todoId);
    if (todoTarget === -1) return;
    todo.splice(todoTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
}


//input todo ke rak buku
let makeList = (todoObject)=>{

    const {id, judul, penulis, tahun, isComplete} = todoObject;


    const containerItem = document.createElement('div')
    containerItem.classList.add('container-item')

    const makeKumpulanBuku = document.createElement('div')
    makeKumpulanBuku.classList.add('judul-buku')

    const dataJudul = document.createElement('h4')
    dataJudul.innerText = judul;
    const dataPenulis = document.createElement('p')
    dataPenulis.innerText ='Penulis : '+penulis;
    const dataTahun = document.createElement('p')
    dataTahun.innerText ='Tahun : '+tahun;

    makeKumpulanBuku.append(dataJudul,dataPenulis,dataTahun);

    const selesai = document.createElement('button')
    isComplete===true?selesai.innerText='Belum Selesai Baca':selesai.innerText='Selesai Baca'
    selesai.classList.add('selesai')
    
    const hapus = document.createElement('button')
    hapus.innerText='Hapus Buku'
    hapus.classList.add('hapus')

    const makeAksi = document.createElement('div')
    makeAksi.classList.add('aksi')
    makeAksi.append(selesai,hapus)

    containerItem.append(makeKumpulanBuku,makeAksi)

    todoObject.isComplete===true?getItem2.insertBefore(containerItem,getItem2.firstElementChild):getItem.insertBefore(containerItem,getItem.firstElementChild);
    
    hapus.addEventListener('click', function () {
      let getLocalStorage = JSON.parse(localStorage.getItem('rr'))
      const todoTarget = findTodoIndex(id);
      console.log(getLocalStorage[todoTarget].id==id)
      if (getLocalStorage[todoTarget].id==id) {
        
         window.confirm('Yakin Hapus ?')?getLocalStorage.splice(todoTarget,1):getLocalStorage.splice();
      }
     

     localStorage.setItem('rr', JSON.stringify(getLocalStorage));
      render()
    });
      

    
    
    selesai.addEventListener('click', ()=>{
      let userData = JSON.parse(localStorage.getItem('rr'));
      const todoTarget = findTodoIndex(id);
      

      if (userData[todoTarget].isComplete==false){
        selesai.innerText='Belum Selesai Baca'
        getItem2.insertBefore(containerItem,getItem2.firstElementChild)
        userData[todoTarget].isComplete=true;
        localStorage.setItem('rr', JSON.stringify(userData));
        JSON.parse(localStorage.getItem('rr'));
      }
      else {
        selesai.innerText='Selesai Baca'
        getItem.insertBefore(containerItem,getItem.firstElementChild)
        userData[todoTarget].isComplete=false;
        localStorage.setItem('rr', JSON.stringify(userData));
        JSON.parse(localStorage.getItem('rr'));
      }
    } )


    
}

//fungsi muat ulang list buku
const render = ()=>{
      let userData = JSON.parse(localStorage.getItem('rr'));
        if (!userData) {
          userData=[]
          console.log("Local Storage Kosong")
        }
        else {
          getItem.innerHTML='';
          getItem2.innerHTML='';
          userData.forEach((e)=>{
          makeList(e)
          todo = userData
  })
}
}


document.addEventListener(RENDER_EVENT, render() );
document.addEventListener(RENDER_PENCARIAN, getPencarian() );
document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('masukkan-buku');
  submitForm.addEventListener('submit', function (event) {
    makeTodo();
  });
});
