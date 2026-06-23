/**
 * filter-dreams.js
 * 作者・年でのフィルタリング機能
 * display-dreams.js より後に読み込むこと
 */

;(function () {
    // --- フィルターUIの生成 ---
    function buildFilterUI() {
        const dreamers = [...new Set(dreamDataList.map((d) => d.dreamer))].sort()
        const years = [...new Set(dreamDataList.map((d) => d.date.slice(0, 4)))].sort().reverse()

        const section = document.createElement("section")
        section.id = "filter-bar"
        section.innerHTML = `
            <div class="filter-inner">
                <label class="filter-label">
                    <span>夢見人</span>
                    <select id="filter-dreamer">
                        <option value="">すべて</option>
                        ${dreamers.map((d) => `<option value="${d}">${d}</option>`).join("")}
                    </select>
                </label>
                <label class="filter-label">
                    <span>年</span>
                    <select id="filter-year">
                        <option value="">すべて</option>
                        ${years.map((y) => `<option value="${y}">${y}年</option>`).join("")}
                    </select>
                </label>
                <button id="filter-reset">リセット</button>
                <span id="filter-count"></span>
            </div>
        `

        // main-content の直前に挿入
        const main = document.getElementById("main-content")
        main.parentNode.insertBefore(section, main)
    }

    // --- フィルタリング実行 ---
    function applyFilter() {
        const dreamer = document.getElementById("filter-dreamer").value
        const year = document.getElementById("filter-year").value

        const entries = document.querySelectorAll("#main-content .entry")
        let visible = 0

        entries.forEach((el) => {
            const matchDreamer = !dreamer || el.dataset.dreamer === dreamer
            const matchYear = !year || el.dataset.year === year
            const show = matchDreamer && matchYear
            el.style.display = show ? "" : "none"
            if (show) visible++
        })

        document.getElementById("filter-count").textContent = `${visible} 件表示中`
    }

    // --- 初期化 ---
    function init() {
        buildFilterUI()
        applyFilter() // 初期カウント表示

        document.getElementById("filter-dreamer").addEventListener("change", applyFilter)
        document.getElementById("filter-year").addEventListener("change", applyFilter)
        document.getElementById("filter-reset").addEventListener("click", () => {
            document.getElementById("filter-dreamer").value = ""
            document.getElementById("filter-year").value = ""
            applyFilter()
        })
    }

    // DOM 構築済みなら即実行、そうでなければ DOMContentLoaded 待ち
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init)
    } else {
        init()
    }
})()
