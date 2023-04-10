document.querySelector("#btnSearch").addEventListener("click",function()
{
   let Input = document.querySelector("#txtSearch").value;
   GetCountry(Input);
});





function GetCountry(country)
{

const Htp = new XMLHttpRequest();
const Htp2 = new XMLHttpRequest();

Htp.open("GET","https://restcountries.com/v3.1/name/" + country);
Htp.send();


Htp.addEventListener("load" , function()
{
    const data = JSON.parse(this.responseText);
    console.log(data);
    console.log(data[0]);
    RenderCountry(data[0]);

 // Komşular

    const Komsu = data[0].borders.toString();
    Htp2.open("GET","https://restcountries.com/v3.1/alpha?codes="+ Komsu);
    Htp2.send();
    

   

    Htp2.addEventListener("load",function()
    {
        const data = JSON.parse(this.responseText);
        RenderNeighbors(data);
    });
});
}


function RenderCountry(data)
{
   let html = 
   `
   <div class="card-header">
                Arama Sonucu
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <img src="${data.flags.png}" alt="" class="img-fluid">
                    </div>
                    <div class="col-8">
                        <h3 class="card-title">${data.name.common}</h3>
                        <hr>
                        <div class="row">
                            <div class="col-4">Nufüs: </div>
                            <div class="col-8">${(data.population / 1000000).toFixed(1)} milyon</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Resmi Dil: </div>
                            <div class="col-8">${Object.values(data.languages)}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Başkent: </div>
                            <div class="col-8">${data.capital[0]}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Para Birimi: </div>
                            <div class="col-8">${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</div>
                        </div>
                    </div>
                </div>
            </div> 
   `;

 document.querySelector("#country-details").innerHTML= html;
    
   
};


function RenderNeighbors(data) 
{
    console.log(data);
    let html = "";
    for (let country of data) 
    {
        html += `
                <div class="col-2 mt-2">
                    <div class="card">
                        <img src="${country.flags.png}"             class="card-img-top">
                            <div class="card-body">
                            <h6 class="card-title">${country.name.common}</h6>
                        </div>
                    </div>
                </div>
            `;

    }
    document.querySelector("#neighbors").innerHTML = html;

};

