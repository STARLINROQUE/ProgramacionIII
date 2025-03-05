document.addEventListener("DOMContentLoaded", loadMenu);

let menuData = [
    {
        "id": 1,
        "nombre": "NETFLIX",
        "enlace": "https://www.netflix.com/do-en/"
      },
      {
        "id": 2,
        "nombre": "HBO MAX",
        "enlace": "https://www.max.com/do/es"
      },
      {
        "id": 3,
        "nombre": "Prime Video",
        "enlace": "https://www.primevideo.com/offers/nonprimehomepage/ref=dvm_pds_amz_do_dc_s_b_mkw_2sOY4U4l-dc?msclkid=c0a572426f3d15b46db8158a2660a357&mrntrk=pcrid_83975202921894_slid__pgrid_1343603226275980_pgeo_142181_x__adext__ptid_kwd-83975205462503:loc-55"
      },
      {
        "id": 4,
        "nombre": "Pluto TV",
        "enlace": "https://pluto.tv/latam/live-tv/63eb9255c111bc0008fe6ec4?msockid=1096ab1200e662483f0cb8c60176637d"
      },
      {
        "id": 5,
        "nombre": "Disney+",
        "enlace": "https://www.disneyplus.com/en-do?gclid=95e533670533110d266754af4fb52cd6&gclsrc=3p.ds&cid=DSS-Search-Bing-71700000112307058&s_kwcid=AL!8468!10!79714802571517!disney%20plus&msclkid=95e533670533110d266754af4fb52cd6"
        , submenu:[{nombre:"star plus", enlace:"https://www.disneyplus.com/en-do/series/Star/106A3s2Armta?msockid=1096ab1200e662483f0cb8c60176637d"},]
        },
      
      {
        "id": 6,
        "nombre": "HULU",
        "enlace": "https://www.hulu.com/hub/movies"
      }
];

function loadMenu() {
    renderMenu();
}

function renderMenu() {
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = "";

    menuData.forEach(item => {
        let li = document.createElement("li");

        let link = document.createElement("a");
        link.href = item.enlace;
        link.innerText = item.nombre;

        // Agregar submenú si existe
        if (item.submenu) {
            let submenu = document.createElement("div");
            submenu.classList.add("submenu");

            item.submenu.forEach(sub => {
                let subLink = document.createElement("a");
                subLink.href = sub.enlace;
                subLink.innerText = sub.nombre;
                submenu.appendChild(subLink);
            });

            li.appendChild(submenu);
        }

        li.appendChild(link);
        menuList.appendChild(li);

        // 🔥 Efecto cuando pasa el mouse
        link.addEventListener("mouseover", () => {
            link.style.backgroundColor = "#ff6600";
            link.style.color = "black";
        });

        link.addEventListener("mouseout", () => {
            link.style.backgroundColor = "";
            link.style.color = "white";
        });
    });
}

