import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <header>
      <div class="container">
        <ul>
          <li>
            <a href="/" target="_self">
              Home
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
