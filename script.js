const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sPlaca = document.querySelector('#m-placa')
const sModelo = document.querySelector('#m-modelo')
const sMarca = document.querySelector('#m-marca')
const sDisponibilidade = document.querySelector('#m-disponibilidade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sPlaca.value = itens[index].placa
    sModelo.value = itens[index].modelo
    sMarca.value = itens[index].marca
    sDisponibilidad.value = itens[index].disponibilidade
    id = index
  } else {
    
    sPlaca.value = ''
    sModelo.value = ''
    sMarca.value = ''
    sDisponibilidad.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.placa}</td>
    <td>${item.modelo}</td>
    <td> ${item.marca}</td>
    <td> ${item.disponibilidade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sPlaca.value == '' || sModelo.value == '' || sMarca.value == '' || sDisponibilidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].placa = sPlaca.value
    itens[id].modelo = sModelo.value
    itens[id].marca = sMarca.value
    itens[id].disponibilidade = sDisponibilidade.value
  } else {
    itens.push({'placa': sPlaca.value, 'modelo': sModelo.value, 'marca': sMarca.value, 'disponibilidade': sDisponibilidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
