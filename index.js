const categories = document.getElementById("categories");
const cardsContainer = document.getElementById("cards-container");

const manageSpinner = (flag, selector) => {
    console.log("", document.querySelector(`${selector}`));
    if (flag) {
        document
            .querySelector(`${selector}`)
            .classList.replace("hidden", "flex");
    } else {
        document
            .querySelector(`${selector}`)
            .classList.replace("flex", "hidden");
    }
};

const activateBtnCat = (btnCat) => {
    categories.querySelectorAll("div").forEach((catDiv) => {
        // console.log(catDiv.querySelector("button"));
        catDiv.querySelector("button").classList.remove("btnActiveCat");
    });

    btnCat.classList.add("btnActiveCat");
    console.log("", btnCat);

    loadTreesData(btnCat.id);
};

const displayBtnCat = (catArr) => {
    let btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
    <div>
        <button id="0" class="w-full cursor-pointer hover:bg-[#15803D] hover:text-white p-2 text-left rounded-sm" href="">All Plants</button>
    </div>
`;
    catArr["categories"].forEach((catObj) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = `
        <button id="${catObj["id"]}" class="w-full cursor-pointer hover:bg-[#15803D] text-[#1F2937] hover:text-white p-2 text-left rounded-sm" href="">${catObj["category_name"]}</button>
    `;

        btnContainer.append(tempDiv);
    });

    categories.innerHTML = btnContainer.innerHTML;

    manageSpinner(false, ".cb-spinner");
    activateBtnCat(categories.querySelector("button"));
};

const loadBtnCat = () => {
    manageSpinner(true, ".cb-spinner");
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((catArr) => displayBtnCat(catArr));
};

loadBtnCat();

const displayTreesData = (treesArr) => {
    const tempContainer = document.createElement("div");

    treesArr.forEach((treeObj) => {
        // console.log('obj', treeObj);
        const tempDiv = document.createElement("div");
        // console.log('', treeObj.image);

        tempDiv.innerHTML = `
            <!-- card -->
            <div id="tree-${treeObj.id}" class="bg-white p-4 rounded-lg">
                <div class="h-40 overflow-hidden rounded-lg">
                    <img class="object-cover" src="${treeObj.image}" alt="img" />
                </div>
                <div class="my-4 space-y-2">
                    <h3 class="font-semibold cursor-pointer">${treeObj.name}</h3>
                    <p class="text-[12px]">
                        ${treeObj.description}
                    </p>
                    <div
                        class="flex flex-wrap justify-between items-center mt-2"
                    >
                        <button
                            class="btn btn-soft cursor-default rounded-full bg-[#DCFCE7] text-[#15803D]"
                        >
                            ${treeObj.category}
                        </button>
                        <p class="font-bold">৳<span>${treeObj.price}</span></p>
                    </div>
                </div>
                <button
                    class="btn-cart btn btn-active btn-success rounded-full bg-[#15803D] hover:bg-[#166534] text-white w-full"
                >
                    Add to Cart
                </button>
            </div>
        `;

        tempContainer.append(tempDiv);
    });

    cardsContainer.innerHTML = tempContainer.innerHTML;
    // manageSpinner(false, ".cc-spinner");
};

const loadTreesData = (id) => {
    cardsContainer.innerHTML = `
        <div class="cc-spinner flex col-span-3 justify-center">
            <span
                class="loading loading-spinner text-success"
            ></span>
        </div>
    `;

    const allPlantsUrl = "https://openapi.programming-hero.com/api/plants";
    const singleCatUrl = `https://openapi.programming-hero.com/api/category/${id}`;
    let url;

    if (parseInt(id) === 0) {
        url = allPlantsUrl;
    } else {
        url = singleCatUrl;
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayTreesData(data.plants));
};

categories.addEventListener("click", (e) => {
    const btnCat = e.target.closest("button");
    if (btnCat) {
        activateBtnCat(btnCat);
    }
});

const displayPlantDetails = (plantDetails) => {
    document.querySelector(".modal-box").innerHTML = `
        <div class="mb-6 h-44 overflow-hidden rounded-lg">
            <img class="object-cover" src="${plantDetails.image}" alt="img" />
        </div>
        <h3 class="text-lg font-bold">${plantDetails.name}</h3>
        <p class="py-4 text-justify"><span class="font-semibold">Description</span>: ${plantDetails.description}</p>
        <div class="flex flex-wrap justify-between">
            <p><span class="font-semibold">Category</span>: ${plantDetails.category}</p>
            <p><span class="font-semibold">Price</span>: ৳<span>${plantDetails.price}</span></p>
        </div>
        <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-success bg-[#15803D] text-white">Done</button>
        </form>
        </div>
    `;
};

const loadPlantDetails = (id) => {
    const plantDetailModal = document.getElementById("my_modal_5");
    plantDetailModal.showModal();

    document.querySelector(".modal-box").innerHTML = `
        <div class="bg-white rounded-lg flex justify-center items-center">
                        <span
                            class="loading loading-spinner text-success"
                        ></span>
                    </div>
    `;
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPlantDetails(data.plants));
};

const processId = (card) => {
    return card.id.split("-").pop();
};

cardsContainer.addEventListener("click", (e) => {
    const treeName = e.target.closest("h3");
    if (treeName) {
        // console.log('tree name clicked', e.target);
        const card = e.target.closest("div[id]");
        loadPlantDetails(processId(card));
    }
});

const processPrice = (price) => {
    return price.split("৳").pop();
};

let products = [];

const calculatePrice = () => {
    let totalPrice = 0;
    console.log("inside calcPrice", products);

    products.forEach((product) => {
        totalPrice += product.price * product.quantity;
    });

    // console.log('', totalPrice);
    document.querySelector("#total-price").innerText = totalPrice;
};

const addProduct = (card) => {
    let flag;
    const treeName = card.querySelector("h3").innerText;
    const treePrice = processPrice(card.querySelectorAll("p")[1].innerText);
    const treeId = processId(card);

    alert(`${treeName} has been added to the cart.`);

    products.forEach((product) => {
        if (product.id === treeId) {
            console.log("matched");
            product.quantity = parseInt(product.quantity) + 1;
            console.log("qty", product.quantity);

            document
                .querySelector(`#prod-${treeId}`)
                .querySelector(".tree-qty").innerText = product.quantity;
            console.log("", card);

            flag = true;
        }
    });

    console.log("products 1", products);

    if (flag) {
        return;
    }

    const obj = {
        id: treeId,
        quantity: 1,
        price: treePrice,
    };

    products.push(obj);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = `
        <div
            id="prod-${treeId}" class="bg-[#F0FDF4] hover:bg-[#e9faee] rounded-lg py-2 px-3 flex justify-between items-center"
        >
            <div class="space-y-1">
                <h3 class="font-semibold">${treeName}</h3>
                <p class="text-[#8C8C8C]">
                    ৳<span>${treePrice}</span> x <span class="tree-qty">1</span>
                </p>
            </div>
            <p
                onclick="removeProduct(${treeId})"
                class="text-[#8C8C8C] text-xl cursor-pointer"
            >
                x
            </p>
        </div>
    `;

    document.querySelector("#prod-container").append(tempDiv);
};

const removeProduct = (id) => {
    products = products.filter((product) => parseInt(product.id) !== id);
    document.querySelector(`#prod-${id}`).remove();
    calculatePrice();
};

const displayProducts = (card) => {
    // const treeName = card.querySelector("h3").innerText;
    // const treePrice = processPrice(card.querySelectorAll("p")[1].innerText);
    // const treeId = processId(card);

    // const tempDiv = document.createElement("div");
    // tempDiv.innerHTML = `
    //     <div
    //         class="bg-[#F0FDF4] hover:bg-[#e9faee] rounded-lg py-2 px-3 flex justify-between items-center"
    //     >
    //         <div class="space-y-1">
    //             <h3 class="font-semibold">${treeName}</h3>
    //             <p class="text-[#8C8C8C]">
    //                 ৳<span>${treePrice}</span> x <span id="tree-qty">1</span>
    //             </p>
    //         </div>
    //         <p
    //             onclick="removeProduct(${treeId})"
    //             class="text-[#8C8C8C] text-xl cursor-pointer"
    //         >
    //             x
    //         </p>
    //     </div>
    // `;

    // document.querySelector("#prod-container").append(tempDiv);
    addProduct(card);
    calculatePrice();
};

cardsContainer.addEventListener("click", (e) => {
    const btnCart = e.target.closest(".btn-cart");
    if (btnCart) {
        const card = e.target.closest("div[id]");
        displayProducts(card);
    }
});
