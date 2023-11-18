// import the emailjs module

let num = 1;
let shutterIdentity = {};

let total = 0;
let totalrrp = 0;

function specialToggle() {
    document.getElementById("total").innerHTML = "Total: $" + total;
    for (let i = 1; i < num; i++) {document.getElementById("shutter" + i).children[0].innerHTML = shutterIdentity[i][3] + ": $" + shutterIdentity[i][4];}

}
function rrpToggle() {
    document.getElementById("total").innerHTML = "Total: $" + totalrrp;
    for (let i = 1; i < num; i++) {document.getElementById("shutter" + i).children[0].innerHTML = shutterIdentity[i][3] + ": $" + shutterIdentity[i][5];}
}

function clearSpec(snum) {
    if (confirm("Are you sure you want to clear this price?")) {
        document.getElementById("shutter" + snum).remove();
        delete shutterIdentity[snum];
        // rewrite the shutterIdentity array
        let temp = {};
        let count = 1;
        for (let i = 1; i < num; i++) {
            if (shutterIdentity[i] != undefined) {
                temp[count] = shutterIdentity[i];
                count++;
            }
        }
        shutterIdentity = temp;
        // delete all the divs in prices and rewrite them
        document.getElementById("prices").innerHTML = "";

        for (let i = 1; i < (num-1); i++) {
            let divelement = document.createElement("div"); divelement.id = "shutter" + i; divelement.style.display = "flex"; divelement.style.alignItems = "center";
            let name = shutterIdentity[i][3];
            let p = document.createElement("p"); p.innerHTML = name + ": $" + shutterIdentity[i][4];

            let clear = document.createElement("button"); clear.innerHTML = "Clear"; clear.id = "clear" + i;
            clear.onclick = function() {clearSpec(this.id.slice(5))};
            clear.style.width = "100px"; clear.style.height = "30px"; clear.style.marginLeft = "10px";
            clear.style.fontSize = "15px"; clear.style.borderRadius = "5px"; clear.style.backgroundColor = "red";
            clear.style.color = "white"; clear.style.border = "none"; clear.style.outline = "none";

            divelement.appendChild(p);
            divelement.appendChild(clear);
            document.getElementById("prices").appendChild(divelement);
        }
        num--;


        total = 0;
        totalrrp = 0;
        for (let i = 1; i < num; i++) {total += shutterIdentity[i][4]; totalrrp += shutterIdentity[i][5];}
        total = Math.round(total * 100) / 100;
        totalrrp = Math.round(totalrrp * 100) / 100;
        console.log(total, totalrrp)
        document.getElementById("total").innerHTML = "Total: $" + total;
    }
}

function calculate() {
    let trick = document.getElementById("h").value;
    let etsd = document.getElementById("w").value;
    const type = document.getElementById("t").value;
    const sname = document.getElementById("sname").value;

    const wfit = document.getElementById("wfit").value;
    const hfit = document.getElementById("hfit").value;

    let actualhfit = "";
    let actualwfit = "";

    if (hfit == 0) {actualhfit = "+box"}
    else if (hfit == 1) {actualhfit = "-box"}

    if (wfit == 0) {actualwfit = "++"}
    else if (wfit == 1) {actualwfit = "--"}
    else if (wfit == 2) {actualwfit = "+-"}

    let initialHeight = trick;
    let initialWidth = etsd;

    if (type==1) {trick = +trick + 205; etsd = +etsd + 120} // Domestic
    else if (type==2) {trick = +trick + 250; etsd = +etsd + 140} // 55mm
    else if (type==3) {trick = +trick + 300; etsd = +etsd + 220} // 77mm
    else if (type==4) {trick = +trick + 250; etsd = +etsd + 140} // EasyView
    else if (type==5) {trick = +trick + 250; etsd = +etsd + 140} // 36mm

    // math.ceiling those numbers!!
    if (trick % 100 != 0) {trick = +trick + (100 - (trick % 100))}
    if (etsd % 100 != 0) {etsd = +etsd + (100 - (etsd % 100))}

    // calculate the price
    fetch("https://raw.githubusercontent.com/Badagoo/pricecalculatorweb/main/prices/Domestic.json")
        .then(response => response.json())
        .then(data => {
            try{
                total = 0
                totalrrp = 0
                let special = 0;
                let price = data[trick][0][etsd]
                if (type != 1) {special = (price * 1.1 * 1.3 + 571) * 1.1; special = Math.round(special * 100) / 100}
                else if (type == 1) {special = price * 1.2 + 427.5; special = Math.round(special * 100) / 100}
                rrp = special * 1.25; rrp = Math.round(rrp * 100) / 100;

                let divelement = document.createElement("div"); divelement.id = "shutter" + num;
                divelement.style.display = "flex"; divelement.style.alignItems = "center";
                let p = document.createElement("p"); p.innerHTML = sname + ": $" + special;

                let clear = document.createElement("button"); clear.innerHTML = "Clear"; clear.id = "clear" + num;
                clear.onclick = function() {clearSpec(this.id.slice(5))};
                clear.style.width = "100px"; clear.style.height = "30px"; clear.style.marginLeft = "10px";
                clear.style.fontSize = "15px"; clear.style.borderRadius = "5px"; clear.style.backgroundColor = "red";
                clear.style.color = "white"; clear.style.border = "none"; clear.style.outline = "none";

                divelement.appendChild(p);
                divelement.appendChild(clear);
                document.getElementById("prices").appendChild(divelement);


                shutterIdentity[num] = [trick, etsd, type, sname, special, rrp, initialHeight, initialWidth, actualhfit, actualwfit];

                for (let i = 1; i < num; i++) {total += shutterIdentity[i][4]; totalrrp += shutterIdentity[i][5];}
                total += special; totalrrp += rrp; num++;
                total = Math.round(total * 100) / 100;
                totalrrp = Math.round(totalrrp * 100) / 100;
                document.getElementById("total").innerHTML = "Total: $" + total;
            }
            catch(err) {alert("Invalid height and width!"); return;}
        });
    if (num==1) {
        if (document.getElementById("clear") == null) {
            let clear = document.createElement("button");
            clear.id = "clear";
            clear.innerHTML = "Clear All";
            clear.onclick = function() {clearPrices()};
            document.getElementById("prices").appendChild(clear);
        }
        if (document.getElementById("rrpButton") == null) {

            let specialButton = document.createElement("button");
            specialButton.id = "specialButton";
            specialButton.innerHTML = "Special";
            specialButton.onclick = function() {specialToggle()};
            document.getElementById("priceType").appendChild(specialButton);

            let rrpButton = document.createElement("button");
            rrpButton.id = "rrpButton";
            rrpButton.innerHTML = "RRP";
            rrpButton.onclick = function() {rrpToggle()};
            document.getElementById("priceType").appendChild(rrpButton);
        }
    }
    document.getElementById("h").value = "";
    document.getElementById("w").value = "";
    document.getElementById("sname").value = "";

}

function clearPrices() {
    if (confirm("Are you sure you want to clear the prices?")) {
        document.getElementById("prices").innerHTML = "";
        num = 1;
        document.getElementById("total").innerHTML = "";
        document.getElementById("specialButton").remove();
        document.getElementById("rrpButton").remove();
    }
}

function testing() {
    let message = "";
    for (i = 1; i < num; i++) {
        message += shutterIdentity[i][3] + ": " + shutterIdentity[i][6] + " height (fit: " + shutterIdentity[i][8] + ") | " + shutterIdentity[i][7] + " width (fit: " + shutterIdentity[i][9] + ")\n"
    }
    message += "\nTotal: $" + total + " (special)"
    console.log(message);
}

function sendEmail() {
    let message = "";
    for (i = 1; i < num; i++) {
        message += shutterIdentity[i][3] + ": " + shutterIdentity[i][6] + " height (fit: " + shutterIdentity[i][8] + ") | " + shutterIdentity[i][7] + " width (fit: " + shutterIdentity[i][9] + ")\n"
    }
    message += "\nTotal: $" + total + " (special)"
    emailjs.send("service_d98mljk","template_n8zlzx6",{
        clName: document.getElementById("clName").value,
        clAddress: document.getElementById("clAddress").value,
        clPhone: document.getElementById("clPhone").value,
        clEmail: document.getElementById("clEmail").value,
        message: message,
        clNotes: document.getElementById("clNotes").value,
        });
}