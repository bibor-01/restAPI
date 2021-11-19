$(function () {
  const konyvek = [];
  let eleresiut = "http://localhost:3000/konyvek";
  let mezoszerint = eleresiut + "?nev_like=Rejtő";
  let rendezes = eleresiut + "?_sort=nev&_order=desc";
  let szures = "fantasy";
  let szuresurl = eleresiut + `?q=${szures}`;
  let haromRekord = eleresiut + "?id=1&id=2&id=3";
  let forditottRendez = eleresiut + "?_sort=nev&_order=asc";
  //két érték között
  let kisebbnagyobb = eleresiut + "?ar_gte=1000&ar_lte=1500";
  //léptetés oldalanként
  let leptetes = eleresiut + "?_page=26_limit=2";
  let adat = {
    nev: "Lackfi János2",
    cim: "Apám kakasa2",
    ar: 1300,
    kategoria: "vers2",
  };
  let modositAdat = {
    "id": 2,
    "nev": "Lackfi JánoaASD",
    "cim": "Apám kakasaASD",
    "ar": 1300,
    "kategoria": "vers"
  };
  /* myAjax(szures,konyvek,kiir); */
  function myAjax(eleresiut, tomb, myCallback) {
    tomb.splice(0,tomb.length);
    $.ajax({
      url: eleresiut,
      type: "GET",
      success: function (result) {
        console.log("result");
        result.forEach((element) => {
          
          tomb.push(element);
        });
        myCallback(tomb);
      },
    });
    console.log(tomb);
  }
  //myAjax(eleresiut, konyvek, kiir);
  $(".ujAdat").on("click",() =>{
    myAjaxPost(eleresiut,adat);
  });
  myAjaxPost(eleresiut, adat);
  function myAjaxPost(eleresiut, adat) {
    $.ajax({
      url: eleresiut,
      type: "POST",
      data: adat,
      success: function (result) {
        myAjax(eleresiut, konyvek, kiir);
      },
    });
  }
  $(".torles").on("click",() =>{
    myAjaxDelete(eleresiut,6);
  });
  function myAjaxDelete(eleresiut, id) {
    $.ajax({
      url: eleresiut+"/"+id,
      type: "DELETE",
      success: function (result) {       
        myAjax(eleresiut, konyvek, kiir);
      },
    });
  }
  $(".modosit").on("click",() =>{
    myAjaxPut(eleresiut,modositAdat);
  });
  function myAjaxPut(eleresiut, adat) {
    $.ajax({
      url: eleresiut+"/"+adat.id,
      type: "PUT",
      data: adat,
      success: function (result) {       
        myAjax(eleresiut, konyvek, kiir);
      },
    });
  }




  function kiir(tomb) {
    let sablon = "";
    tomb.forEach(({ nev, cim, kategoria, ar }) => {
      sablon += `
            <div>
            <h3>${nev}</h3>

            <h4 class"cim">
            ${cim}
            </h4>
            <p>${kategoria}</p>
            
            <span>${ar}</span>
            </div>
            `;
    });
    $(".adatok").html(sablon);
  }
});
