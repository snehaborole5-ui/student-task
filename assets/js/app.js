const cl = console.log;
const stdContainer = document.getElementById('stdContainer')
const stdForm = document.getElementById('stdForm')
const fnameControl = document.getElementById('fname')
const lnameControl = document.getElementById('lname')
const emailControl = document.getElementById('email')
const contactControl = document.getElementById('contact')


// DB

let stdArr = [
    {
        fname: 'Jhon',
        lname: 'Doe',
        email: 'jd@gmail.com',
        contact: '1234567890',
        stdId: '6edf782c-2b0d-4fc8-b013-5468a45891fb'
    },
    {
        fname: 'May',
        lname: 'Doe',
        email: 'may@gmail.com',
        contact: '7895642310',
        stdId: '6789789789c-2b0d-4fc8-b013-5468a45891fb'
    },
    {
        fname: 'June',
        lname: 'Doe',
        email: 'june@gmail.com',
        contact: '9876542310',
        stdId: 'ee688e59-7c9e-40dd-9b92-2b69db8f9db7'
    
    }
]

function createTrs(arr){
    let result = '';
arr.forEach((std,i) =>{
    // cl(std)
    result += `
            <tr id="${std.stdId}">
                            <td>${i + 1}</td>
                            <td>${std.fname} ${std.lname}</td>
                            <td>${std.email}</td>
                            <td>${std.contact}</td>
                            <td>
                                <i role="button" class="fa-solid fa-pen-to-square fa-2x text-success"></i>
                                </td>
                                <td>
                                <i onClick="onStdRemove(this)" 
                                role="button" class="fa-solid fa-trash fa-2x text-danger"></i>
                            </td>
                        </tr>`
    
})

stdContainer.innerHTML = result;
}
createTrs(stdArr)

function onStdRemove(ele){
    let REMOVE_ID = ele.closest('tr').id 
    let getConfirm = confirm(`Are you sure,you want to remove th student with ID ${REMOVE_ID} ?`)
        cl(getConfirm)
        if(getConfirm){
                 let getIndex = stdArr.findIndex(std => {
        return std.stdId === REMOVE_ID
    })
     let REMOVED_STD = stdArr.splice(getIndex,1)
    ele.closest('tr').remove()
    let allTrs = [...document.querySelectorAll('#stdContainer tr')]
    allTrs.forEach((tr,i) =>{
        tr.firstElementChild.innerText = i + 1

    })
    Swal.fire({
        title:`The student ${REMOVED_STD[0].fname} ${REMOVED_STD[0].lname} removed successfully!!!`,
        icon:'success',
        timer:3000
    })
}
        }


function onStdSubmit(eve){
eve.preventDefault()
let NEW_STD = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    stdId: Date.now().toString()
}
cl(NEW_STD)

stdArr.push(NEW_STD)

stdForm.reset()

// we will create a new tr and append it in tbody
let tr = document.createElement('tr')

tr.innerHTML = `
                <td>1</td>
                <td>${NEW_STD.fname} ${NEW_STD.lname}</td>
                  <td>${NEW_STD.email}</td>
                <td>${NEW_STD.contact}</td>
               <td>
                    <i role="button" class="fa-solid fa-pen-to-square fa-2x text-success"></i>
                </td>
                <td>
                    <i onClick="onStdRemove(this)" 
                    role="button" class="fa-solid fa-trash fa-2x text-danger"></i>
                </td>

`
stdContainer.append(tr)

Swal.fire({
    title:`The new student ${NEW_STD.fname} ${NEW_STD.lname} added successfully!!!`,
    icon:'success',
    timer: 3000
})
}




stdForm.addEventListener('submit',onStdSubmit)


