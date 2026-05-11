
function getSetting() {
    let settings = localStorage.getItem("pfm_settings")
    if (settings) {
        return JSON.parse(settings);
    }
    else {
        const defaultSetting = {
            currency: "Ar",
            theme: "light"
        };
        localStorage.setItem("pfm_settings", JSON.stringify(defaultSetting));
        return defaultSetting;
    }
}

function saveSetting (settings) {
    localStorage.setItem("pfm_settings", JSON.stringify(settings));
}

function getCurrency() {
    return getSetting().currency || "Ar";
}
function formatMoney(amount) {
    const currency = getCurrency();
    return amount.toLocaleString("fr-FR") + " " + currency;
}

document.addEventListener("DOMContentLoaded", () => {
    const settings = getSetting();

    const deviseSelect = document.getElementById("devise")
    const dateSelect = document.getElementById("date")

    if(deviseSelect) {
        deviseSelect.value = settings.currency || "Ar";
    }
    if(dateSelect) {
        dateSelect.value = settings.dateFormat || "jj/mm/aaaa";
    }

    const saveBtn = document.getElementById("btn-save-device")
    if(saveBtn) {
        saveBtn.addEventListener("click", () => {
            const newSetting = {
                currency: deviseSelect ? deviseSelect.value: "Ar",
                dateFormat: dateSelect ? dateSelect.value: "jj/mm/aaaa",
                theme: settings.theme || "light"
            };

            saveSetting(newSetting);
            alert("Successfuly! ");
        })
    }
})