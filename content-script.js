function runEdunexScript() {
  if (window.location.href.includes("edunex.itb.ac.id/courses/")) {
    if (!document.querySelector(".edunex-btn-container")) {
      const btnContainer = document.createElement("div");

      btnContainer.classList.add("edunex-btn-container");

      btnContainer.innerHTML = `
      <button class="edunex-btn edunex-read-all-btn">Mark all as read</button>
      <button class="edunex-btn edunex-download-all-btn">Download all</button>
      <button class="edunex-btn edunex-open-all-btn">Open all</button>
      <button class="edunex-btn edunex-close-all-btn">Close all</button>
    `;

      document.body.append(btnContainer);

      const readAllBtn = document.querySelector(".edunex-read-all-btn");
      const downloadAllBtn = document.querySelector(".edunex-download-all-btn");
      const openAllBtn = document.querySelector(".edunex-open-all-btn");
      const closeAllBtn = document.querySelector(".edunex-close-all-btn");

      readAllBtn.addEventListener("click", () => {
        const switches = [...document.querySelectorAll("input.input-switch")];

        console.log(switches);

        switches.forEach((btn) => {
          if (btn.value === "false") {
            btn.click();
          }
        });
      });

      downloadAllBtn.addEventListener("click", () => {
        const buttons = [...document.querySelectorAll(".btn-download")];

        buttons.forEach((btn) => {
          btn.click();
        });

        const slideReaders = [...document.querySelectorAll(".slide-reader")];

        if (slideReaders) {
          slideReaders.forEach((slide) => {
            const iframe = slide.querySelector("iframe");
            window.open(urldecode(iframe.src.slice(51)));
          });
        }
      });

      openAllBtn.addEventListener("click", () => {
        const buttons = [
          ...document.querySelectorAll(".vs-collapse-item.preview-collapse"),
        ];

        buttons.forEach((btn) => {
          if (!btn.classList.contains("open-item")) {
            btn.classList.add("open-item");

            const collapseItem = btn.querySelector(
              ".vs-collapse-item--content"
            );

            const content = collapseItem.querySelector(".con-content--item");

            collapseItem.style = `max-height: ${
              content.getBoundingClientRect().height
            }px;`;
          }
        });
      });

      closeAllBtn.addEventListener("click", () => {
        const buttons = [
          ...document.querySelectorAll(".vs-collapse-item.preview-collapse"),
        ];

        buttons.forEach((btn) => {
          if (btn.classList.contains("open-item")) {
            btn.classList.remove("open-item");

            const collapseItem = btn.querySelector(
              ".vs-collapse-item--content"
            );

            collapseItem.style = `max-height: 0px;`;
          }
        });
      });
    }
  } else {
    if (document.querySelector(".edunex-btn-container")) {
      document.querySelector(".edunex-btn-container").remove();
    }
  }
}

function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, " "));
}

setInterval(runEdunexScript, 500);
