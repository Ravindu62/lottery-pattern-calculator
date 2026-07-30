const inputs = Array.from(document.querySelectorAll(".field input"));

inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

function checkPattern() {
    const values = inputs.map(input => input.value);
    const emptyIndex = values.findIndex(value => value === "");

    if (emptyIndex !== -1) {
        alert("Please enter all four numbers.");
        inputs[emptyIndex].focus();
        return;
    }

    const n1 = Number(values[0]);
    const n2 = Number(values[1]);
    const n3 = Number(values[2]);
    const n4 = Number(values[3]);

    const diff1 = Math.abs(n1 - n2);
    const diff2 = Math.abs(n2 - n3);
    const diff3 = Math.abs(n3 - n4);
    const total = diff1 + diff2 + diff3;

    document.getElementById("d1").textContent = diff1;
    document.getElementById("d2").textContent = diff2;
    document.getElementById("d3").textContent = diff3;
    document.getElementById("total").textContent = total;

    const result = document.getElementById("result");
    result.className = "result-box";

    if (total === n4) {
        result.classList.add("success");
        result.innerHTML = "🎉 Pattern found";
    } else {
        result.classList.add("error");
        result.innerHTML = "❌ No pattern";
    }
}

function clearInputs() {
    inputs.forEach(input => input.value = "");

    document.getElementById("d1").textContent = "-";
    document.getElementById("d2").textContent = "-";
    document.getElementById("d3").textContent = "-";
    document.getElementById("total").textContent = "-";

    const result = document.getElementById("result");
    result.className = "result-box";
    result.innerHTML = "Enter numbers to begin";

    inputs[0].focus();
}