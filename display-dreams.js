const container = document.getElementById("main-content")
if (!container) throw new Error("No container!")

dreamData.forEach((dream) => {
    container.innerHTML += `
        <section class="entry">
            <h2>${dream.title}</h2>
            <p class="dreamer">夢見人: ${dream.dreamer}</p>
            <p>
                ${dream.content.replace(/\n/g, "<br>")}
            </p>
            <time datetime="${dream.date}">${dream.date}</time>
        </section>
    `
})

document.addEventListener("keydown", (e) => {
    if (e.code == "F12" || e.code == "KeyI") {
        e.preventDefault()
    }
})
