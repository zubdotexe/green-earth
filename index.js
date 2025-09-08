const categories = document.getElementById("categories");

const manageSpinner = (flag) => {
    if (flag) {
        document
            .querySelector(".spinner-container")
            .classList.replace("hidden", "flex");
    } else {
        document
            .querySelector(".spinner-container")
            .classList.replace("flex", "hidden");
    }
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

    manageSpinner(false);
};

const loadBtnCat = () => {
    manageSpinner(true);
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((catArr) => displayBtnCat(catArr));
};

loadBtnCat();

const displayTreesData = (treesArr) => {
    // console.log('', treesArr);

    const tempContainer = document.createElement("div");

    treesArr.forEach((treeObj) => {
        console.log('obj', treeObj);
        const tempDiv = document.createElement("div");
        console.log('', treeObj.image);
        
        tempDiv.innerHTML = `
            <!-- card -->
            <div class="bg-white p-4 rounded-lg h-full flex flex-col justify-between">
                <div class="h-40 overflow-hidden rounded-lg">
                    <img class="object-cover" src="${treeObj.image}" alt="img" />
                </div>
                <div class="my-4">
                    <h3 class="font-semibold">${treeObj.name}</h3>
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
                    class="btn btn-active btn-success rounded-full bg-[#15803D] hover:bg-[#166534] text-white w-full"
                >
                    Add to Cart
                </button>
            </div>
        `;

        tempContainer.append(tempDiv);
    });

    document.getElementById("cards-container").innerHTML = tempContainer.innerHTML;
}

const loadTreesData = (id) => {
    const allPlantsUrl = "https://openapi.programming-hero.com/api/plants";
    const singleCatUrl = `https://openapi.programming-hero.com/api/category/${id}`;
    let url;

    if(parseInt(id) === 0) {
       url = allPlantsUrl; 
    }
    else {
        url = singleCatUrl
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayTreesData(data.plants));
}

const activateBtnCat = (btnCat) => {
    categories.querySelectorAll("div").forEach((catDiv) => {
        // console.log(catDiv.querySelector("button"));
        catDiv.querySelector("button").classList.remove("btnActiveCat");
    });

    btnCat.classList.add("btnActiveCat");
    loadTreesData(btnCat.id);
};

categories.addEventListener("click", (e) => {
    const btnCat = e.target.closest("button");
    if (btnCat) {
        activateBtnCat(btnCat);
    }
});
