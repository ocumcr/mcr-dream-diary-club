const container = document.getElementById("main-content")
if (!container) throw new Error("No container!")

container.innerHTML = dreamDataList
    .map(
        (dream) =>
            `
                <section class="entry" data-dreamer="${dream.dreamer}" data-year="${dream.date.slice(0, 4)}">
                    <h3>${dream.title}</h3>
                    <p class="dreamer">夢見人: ${dream.dreamer}</p>
                    <p>
                        ${dream.content.replace(/\n/g, "<br>")}
                    </p>
                    <time datetime="${dream.date}">${dream.date}</time>
                </section>
            `,
    )
    .join("")

document.addEventListener("keydown", (e) => {
    if (e.code == "F12" || e.code == "KeyI") {
        e.preventDefault()
    }
})
