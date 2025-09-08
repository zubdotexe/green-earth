const categories = document.getElementById("categories");

const progress = (flag) => {};

const loadBtnCat = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((catArr) => {
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
        });
};

loadBtnCat();

const activateBtnCat = (btnCat) => {
    categories.querySelectorAll("div").forEach((catDiv) => {
        console.log(catDiv.querySelector("button"));
        catDiv.querySelector("button").classList.remove("btnActiveCat");
    });

    btnCat.classList.add("btnActiveCat");
};

categories.addEventListener("click", (e) => {
    const btnCat = e.target.closest("button");
    if (btnCat) {
        activateBtnCat(btnCat);
    }
});
