(() => {
  const mobileMenu = window.matchMedia("(max-width: 860px)");

  document.querySelectorAll(".nav-wrap").forEach((wrapper) => {
    const toggle = wrapper.querySelector(".nav-toggle");
    const navigation = wrapper.querySelector(".nav");

    if (!toggle || !navigation) {
      return;
    }

    const setOpen = (open, returnFocus = false) => {
      toggle.setAttribute("aria-expanded", String(open));
      wrapper.classList.toggle("nav-open", open);

      if (returnFocus) {
        toggle.focus();
      }
    };

    wrapper.classList.add("nav-enabled");

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && wrapper.classList.contains("nav-open")) {
        setOpen(false, true);
      }
    });

    document.addEventListener("click", (event) => {
      if (
        mobileMenu.matches &&
        wrapper.classList.contains("nav-open") &&
        !wrapper.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    const closeAtDesktopWidth = (event) => {
      if (!event.matches) {
        setOpen(false);
      }
    };

    if (mobileMenu.addEventListener) {
      mobileMenu.addEventListener("change", closeAtDesktopWidth);
    } else {
      mobileMenu.addListener(closeAtDesktopWidth);
    }
  });
})();
