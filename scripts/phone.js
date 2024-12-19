const loadAllPhones = async (status, searchText) => {
  document.getElementById('spinner').classList.add('hidden');
  // console.log(searchText);

  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : 'iphone'}`);
  const data = await res.json();

  if (status) {
    displayAllPhone(data.data);
  }
  else {
    displayAllPhone(data.data.slice(0, 6));
  }
};

const displayAllPhone = (phones) => {
  // document.getElementById('phones-container').innerHTML = ""; ('phones-container');
  const phoneContainer = document.getElementById('phones-container');

  phones.forEach(phone => {
    // console.log(phone);
    const { brand, image, slug } = phone;
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card m-2 bg-red-200 w-96 shadow-xl">
      <figure class="px-10 pt-10">
       <img
       src="${image}"
       alt="Shoes"
       class="rounded-xl" />
      </figure>
     <div class="card-body items-center text-center">
      <h2 class="card-title">${brand}</h2>
      <p>${slug}</p>
     <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary hover:bg-blue-500 hover:border-0 text-white">Show Details</button>
    </div>
  </div>
</div>
`;
    phoneContainer.appendChild(div);
  });
}


const hangleShowAll = () => {
  loadAllPhones(true)
}


const hangleSearch = () => {
  document.getElementById('spinner').classList.remove('hidden');

  const searchText = document.getElementById('search-box').value;


  setTimeout(() => {
    loadAllPhones(false, searchText)
  }, 2000);
};



const phoneDetails = async (slugs) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
  const data = await response.json();
  // console.log(data.data);

  const { brand, slug, image } = data.data;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="text-center modal">
          <div class="modal-box">
          <figure class="flex justify-center px-10 pt-10">
       <img
       src="${image}"
       alt="Shoes"
       class="rounded-xl" />
      </figure>
            <h3 class="mt-2 text-lg font-bold">${brand}</h3>
            <p class="py-4">${slug}</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn bg-red-500 text-white hover:bg-green-500">Close</button>
              </form>
            </div>
          </div>
        </dialog>
   `;

  my_modal_1.showModal()
}



// loadAllPhones(false, 'iphone');

// No Phone Found. Please try a new Search