function calculate() {
    let height = document.getElementById("h").value;
    let width = document.getElementById("w").value;
    const type = document.getElementById("t").value;

    // additional height and width for the frame
    if (type==1) {height = +height + 205; width = +width + 120} // Domestic
    else if (type==2) {height = +height + 250; width = +width + 140} // 55mm
    else if (type==3) {height = +height + 300; width = +width + 220} // 77mm
    else if (type==4) {height = +height + 250; width = +width + 140} // EasyView
    else if (type==5) {height = +height + 250; width = +width + 140} // 36mm

    // math.ceiling those numbers!!
    if (height % 100 != 0) {height = +height + (100 - (height % 100))}
    if (width % 100 != 0) {width = +width + (100 - (width % 100))}

    // calculate the price
    if (type==1) {
        fetch("/prices/Domestic.json")
            .then(response => response.json())
            .then(data => {
                let price = data[height][0][width];
                let finalPrice = price * 1.2 + 427.5;
                finalPrice = Math.round(finalPrice * 100) / 100;
                document.getElementById("price").innerHTML = finalPrice;
            });
    }
    else if (type==2) {
        fetch("/prices/55mm.json")
            .then(response => response.json())
            .then(data => {
                let price = data[height][0][width];
                let finalPrice = (price * 1.1 * 1.3 + 571) * 1.1;
                finalPrice = Math.round(finalPrice * 100) / 100;
                document.getElementById("price").innerHTML = finalPrice;
            });
    }
    else if (type==3) {
        fetch("/prices/77mm.json")
            .then(response => response.json())
            .then(data => {
                let price = data[height][0][width];
                let finalPrice = (price * 1.1 * 1.3 + 571) * 1.1;
                finalPrice = Math.round(finalPrice * 100) / 100;
                document.getElementById("price").innerHTML = finalPrice;
            });
    }
    else if (type==4) {
        fetch("/prices/EasyView.json")
            .then(response => response.json())
            .then(data => {
                let price = data[height][0][width];
                let finalPrice = (price * 1.1 * 1.3 + 571) * 1.1;
                finalPrice = Math.round(finalPrice * 100) / 100;
                document.getElementById("price").innerHTML = finalPrice;
            });
    }
    else if (type==5) {
        fetch("/prices/36mm.json")
            .then(response => response.json())
            .then(data => {
                let price = data[height][0][width];
                let finalPrice = (price * 1.1 * 1.3 + 571) * 1.1;
                finalPrice = Math.round(finalPrice * 100) / 100;
                document.getElementById("price").innerHTML = finalPrice;
            });
    }
    console.log(height, width, type);
}