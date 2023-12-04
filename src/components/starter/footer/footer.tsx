import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "~/routes/layout";

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class="container">
        <a href="https://www.builder.io/" target="_blank">
          <span>{serverTime.value.date}</span>
        </a>
      </div>
    </footer>
  );
});
