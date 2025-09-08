const categories = document.getElementById("categories");

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

const cardsContainer = document.getElementById("cards-container");

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

document.querySelector("#cards-container").addEventListener("click", (e) => {
    const btnCart = e.target.closest(".btn-cart");
    if (btnCart) {
        console.log("clicked", e.target);
    }
});
