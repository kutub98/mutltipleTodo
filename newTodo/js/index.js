
// proceed function 
const proceedNow = document.getElementById("proceedNow");
let count = 1;
proceedNow.addEventListener("click", function () {
  // row values 
  const totalRow = parseInt(document.getElementById("areaNumber").value);
  if (confirm("Are you sure want to create  " + totalRow)) {
    const table = document.getElementById("table");


    for (i = 0; i < totalRow; i++) {
      const createTr = document.createElement("tr");
      createTr.innerHTML = `
            <td class="index" id="indexNumber">${count++} </td>
            <td> <input type="text" placeholder="areaName" name="areaName" id="areaName" class="areaName"/></td>
            <td>
            <td><img src="" class="imageToShow" alt="" /></td>
            <td> <input style="display:hidden" type="file" placeholder="areaImage" name="files" accept="image/jpeg, image/png, image/jpg" id="files" class="files" />

            <button class="dltBtn">Delete</button>
            <button class="edit">Edit</button>
            <button class="save">Save</button>
            `;
      table.appendChild(createTr);
    }

    // save local storage
    const indexNumber = document.getElementById("indexNumber").innerText;
    const areaName = document.getElementById("areaName").value;
    const imageValue = document.getElementById("files");
    const previousItem = localStorage.getItem("Table");

    // allData(indexNumber, areaName, imageValue)

    //delete items
    const deleteBtn = document.getElementsByClassName("dltBtn");

    for (let button of deleteBtn) {
      button.addEventListener("click", function (event) {
        console.log(event.target.parentNode.parentNode.remove());
        count--;

        // update index number
        const TotalIndex = document.getElementsByClassName("index");
        for (let i = 0; i < TotalIndex.length; i++) {
          TotalIndex[i].innerHTML = i + 1;
        }
      });
    }
  }
});

// send to mongodb
const saveAll = document.getElementById("SaveALL");
saveAll.addEventListener("click", () => {
  const indexNumbers = document.querySelectorAll("#indexNumber");
  const areaNames = document.querySelectorAll("#areaName");
  const imageValues = document.querySelectorAll("#files");
  const values = {};
  console.log(values);

  // total image and area 
  imageValues.forEach((img, index) => {
    const formData = new FormData();
    formData.append("image", img.files[0]);

    // image api from imgbb 
    const url = "https://api.imgbb.com/1/upload?key=9f421b965d953a6b04039f9b09ad45b7";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const imgUrl = data.data.display_url;
        console.log(imgUrl);
        values[index] = {
          indexNumber: indexNumbers[index].innerText,
          areaName: areaNames[index].value,
          imageValues: imgUrl,
        };
      });

  });
  // Send the POST request after the values object has been fully populated
  const serverUrl = "https://pakapepe-admin-server.vercel.app/todoItems";
  fetch(serverUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({values})
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
});


// saveAll.addEventListener("click", () => {
//   const indexNumbers = document.querySelectorAll("#indexNumber");
//   const areaNames = document.querySelectorAll("#areaName");
//   const imageValues = document.querySelectorAll("#files");
//   const values = {};
//   console.log(values);
//   imageValues.forEach((img, index) => {
//     const formData = new FormData();
//     formData.append("image", img.files[0]);
//     const url = "https://api.imgbb.com/1/upload?key=9f421b965d953a6b04039f9b09ad45b7";
//     fetch(url, {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         const imgUrl = data.data.display_url;
//         console.log(imgUrl);
//         values[index] = {
//           indexNumber: indexNumbers[index].innerText,
//           areaName: areaNames[index].value,
//           imageValues: imgUrl,
//         };
//       });
//   });
//   const data = [
//     values[i] ={
//        areaNames: areaNames[i],
//        indexNumbers: indexNumbers[i],
//        imageValues: imageValues[i]
//     }
//   ]

// const serverUrl = "https://pakapepe-admin-server.vercel.app/todoItems";
// fetch(serverUrl, {
//   method: "POST",
//   headers: {
//     "content-type": "application/json",
//   },
// body: JSON.stringify({values})
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.log(error));

   
//   }
  
// )


